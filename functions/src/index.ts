/**
 * Firebase Cloud Functions for Mind Check
 *
 * This module contains scheduled functions for maintaining the database,
 * including cleanup of old export status documents.
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

/** Number of days after which export status documents should be deleted */
const EXPORT_STATUS_RETENTION_DAYS = 2;

/** Maximum number of concurrent delete operations */
const MAX_CONCURRENT_DELETES = 10;

/**
 * Parses a date string in format "day-mon-dd-yyyy" (e.g., "wed-dec-25-2024")
 * Returns the Date object or null if parsing fails
 */
function parseDateFromDocId(docId: string): Date | null {
  try {
    // Document IDs are in format like "wed-dec-25-2024"
    const parts = docId.split("-");
    if (parts.length < 4) {
      return null;
    }

    // Get the month, day, and year from the document ID
    // Format: day-month-day-year (e.g., wed-dec-25-2024)
    const monthStr = parts[1].toLowerCase();
    const day = parseInt(parts[2], 10);
    const year = parseInt(parts[3], 10);

    const monthMap: { [key: string]: number } = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };

    const month = monthMap[monthStr];
    if (month === undefined || isNaN(day) || isNaN(year)) {
      return null;
    }

    return new Date(year, month, day);
  } catch {
    return null;
  }
}

/**
 * Scheduled Cloud Function to delete old export status documents
 *
 * This function runs daily at midnight UTC and deletes export status
 * documents that are older than the configured retention period for all users.
 *
 * Export status documents are stored at: users/{userId}/exports/{date}
 * Where {date} is in format like "wed-dec-25-2024"
 */
export const deleteOldExportStatusDocuments = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    const now = new Date();
    const cutoffDate = new Date(
      now.getTime() - EXPORT_STATUS_RETENTION_DAYS * 24 * 60 * 60 * 1000
    );

    functions.logger.info("Starting cleanup of old export status documents", {
      currentTime: now.toISOString(),
      retentionDays: EXPORT_STATUS_RETENTION_DAYS,
      deleteOlderThan: cutoffDate.toISOString(),
    });

    try {
      // Get all users
      const usersSnapshot = await db.collection("users").get();
      let totalDeleted = 0;
      let totalErrors = 0;

      // Collect all documents to delete
      const docsToDelete: { ref: admin.firestore.DocumentReference; userId: string; docId: string; docDate: Date }[] = [];

      // Process each user to find old export documents
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const exportsRef = db.collection("users").doc(userId).collection("exports");
        const exportsSnapshot = await exportsRef.get();

        // Check each export status document
        for (const exportDoc of exportsSnapshot.docs) {
          const docDate = parseDateFromDocId(exportDoc.id);

          if (docDate && docDate < cutoffDate) {
            docsToDelete.push({
              ref: exportDoc.ref,
              userId,
              docId: exportDoc.id,
              docDate,
            });
          }
        }
      }

      // Delete documents in batches for better performance
      for (let i = 0; i < docsToDelete.length; i += MAX_CONCURRENT_DELETES) {
        const batch = docsToDelete.slice(i, i + MAX_CONCURRENT_DELETES);
        const results = await Promise.allSettled(
          batch.map(async (doc) => {
            await doc.ref.delete();
            return doc;
          })
        );

        // Process results
        for (const result of results) {
          if (result.status === "fulfilled") {
            totalDeleted++;
            functions.logger.info("Deleted export status document", {
              userId: result.value.userId,
              docId: result.value.docId,
              docDate: result.value.docDate.toISOString(),
            });
          } else {
            totalErrors++;
            functions.logger.error("Failed to delete export document", {
              error: result.reason,
            });
          }
        }
      }

      functions.logger.info("Completed cleanup of old export status documents", {
        totalDeleted,
        totalErrors,
      });

      return null;
    } catch (error) {
      functions.logger.error("Error during export status cleanup", { error });
      throw error;
    }
  });
