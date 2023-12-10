/* eslint-disable no-mixed-spaces-and-tabs */
import QUESTIONS from '../data/questions';
import MOODS from '../data/moods';
import { User } from 'firebase/auth';
import { FirebaseDb } from '../firebase';
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import X2JS from 'x2js';

const x2js = new X2JS();

export const EXPORT_LIMIT = 3;

type ExportProps = {
	data: Score[];
	journals: Journal[];
	user: User | null;
};

type ExportReturnValue = {
	csv: 'export/csv-export-success' | 'export/csv-export-error';
	json: 'export/json-export-success' | 'export/json-export-error';
	xml: 'export/xml-export-success' | 'export/xml-export-error';
};

export const exportDataToCsv = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['csv']> => {
	return new Promise((resolve, reject) => {
		try {
			const normalizedData = data
				.filter((score) => typeof score.score !== 'undefined')
				.map((score, index) => {
					const scores: Record<string, number> = {};
					Object.keys(score.score).forEach((key) => {
						Object.keys(
							score.score[key as keyof Score['score']]
						).forEach((questionId) => {
							const question = QUESTIONS[
								key as keyof Score['score']
							].find(
								(QUESTION) =>
									QUESTION.id === parseInt(questionId)
							)?.question;
							const answer =
								score.score[key as keyof Score['score']][
									questionId as unknown as keyof ScoreValue
								];
							if (!question) return;
							scores[question] = answer;
						});
					});
					return Object.freeze({
						'S.No.': index + 1,
						'Test Taken': score.time,
						...scores,
						'Calculated Score': score.calculatedScore,
					});
				});
			const array = [Object.keys(normalizedData[0])].concat(
				normalizedData as unknown as string[][]
			);
			const csvString = array
				.map((row) => {
					return Object.values(row)
						.map((value) => {
							return typeof value === 'string'
								? JSON.stringify(value)
								: value;
						})
						.toString();
				})
				.join('\n');
			const normalizedJournals = journals
				.filter((journal) => typeof journal !== 'undefined')
				.map((journal, index) => {
					return Object.freeze({
						'S.No.': index + 1,
						'Test Taken': journal.time,
						Type: journal.type,
						...(journal.type === 'journal'
							? {
									Entry: journal.journal,
							  }
							: {
									Entry: MOODS.find(
										(m) => m.id === journal.mood
									)?.mood,
							  }),
					});
				});
			const journalArray = [Object.keys(normalizedJournals[0])].concat(
				normalizedJournals as unknown as string[]
			);
			const journalCsvString = journalArray
				.map((row) => {
					return Object.values(row)
						.map((value) => {
							return typeof value === 'string'
								? JSON.stringify(value)
								: value;
						})
						.toString();
				})
				.join('\n');
			const currentTime = Date.now();
			const exportCsvDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-score-data-${currentTime}`;
			const exportJournalCsvDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-journal-data-${currentTime}`;
			const dataStr =
				'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
			const journalDataStr =
				'data:text/csv;charset=utf-8,' +
				encodeURIComponent(journalCsvString);
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportCsvDataName + '.csv'
			);
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.setAttribute('href', journalDataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportJournalCsvDataName + '.csv'
			);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/csv-export-success');
		} catch (error) {
			reject('export/csv-export-error');
		}
	});
};

export const exportDataToJson = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['json']> => {
	return new Promise((resolve, reject) => {
		try {
			const normalizedData = data
				.filter((score) => typeof score.score !== 'undefined')
				.map((score) => {
					const scores: Record<
						string,
						{ category: string; score: number }
					> = {};
					Object.keys(score.score).forEach((key) => {
						Object.keys(
							score.score[key as keyof Score['score']]
						).forEach((questionId) => {
							const question = QUESTIONS[
								key as keyof Score['score']
							].find(
								(QUESTION) =>
									QUESTION.id === parseInt(questionId)
							)?.question;
							const answer =
								score.score[key as keyof Score['score']][
									questionId as unknown as keyof ScoreValue
								];
							if (!question) return;
							scores[question] = {
								category: key,
								score: answer,
							};
						});
					});
					return {
						calculatedScore: score.calculatedScore,
						testTaken: score.time,
						scores,
					};
				});
			const normalizedJournals = journals
				.filter((journal) => typeof journal !== 'undefined')
				.map((journal) => {
					if (journal.type === 'journal') return journal;
					const mood = MOODS.find((m) => m.id === journal.mood);
					return { ...journal, mood };
				});
			const exportJsonData = {
				exportedAt: new Date(),
				user: {
					name: user?.displayName,
					email: user?.email,
				},
				scores: normalizedData,
				journals: normalizedJournals,
			};
			const exportJsonDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-score-data-${Date.now()}`;
			const dataStr =
				'data:text/json;charset=utf-8,' +
				encodeURIComponent(JSON.stringify(exportJsonData));
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportJsonDataName + '.json'
			);
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/json-export-success');
		} catch (error) {
			reject('export/json-export-error');
		}
	});
};

export const exportDataToXml = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['xml']> => {
	return new Promise((resolve, reject) => {
		try {
			const normalizedData = data
				.filter((score) => typeof score.score !== 'undefined')
				.map((score) => {
					const scores: Record<
						string,
						{ category: string; score: number }
					> = {};
					Object.keys(score.score).forEach((key) => {
						Object.keys(
							score.score[key as keyof Score['score']]
						).forEach((questionId) => {
							const question = QUESTIONS[
								key as keyof Score['score']
							]
								.find(
									(QUESTION) =>
										QUESTION.id === parseInt(questionId)
								)
								?.question.replace(/[^a-zA-Z0-9 ]/g, ' ')
								.replace(/\s+/g, '_');
							const answer =
								score.score[key as keyof Score['score']][
									questionId as unknown as keyof ScoreValue
								];
							if (!question) return;
							scores[question] = {
								category: key
									.replace(/[^a-zA-Z0-9 ]/g, ' ')
									.replace(/\s+/g, '_'),
								score: answer,
							};
						});
					});
					return {
						calculatedScore: score.calculatedScore,
						testTaken: score.time,
						scores,
					};
				});
			const normalizedJournals = journals
				.filter((journal) => typeof journal !== 'undefined')
				.map((journal) => {
					if (journal.type === 'journal')
						return { ...journal, entry: journal.journal };
					const mood = MOODS.find((m) => m.id === journal.mood);
					return {
						...journal,
						mood: mood?.mood
							.replace(/[^a-zA-Z0-9 ]/g, ' ')
							.replace(/\s+/g, '_'),
					};
				});
			const exportJsonData = {
				exportedAt: new Date(),
				user: {
					name: user?.displayName,
					email: user?.email,
				},
				scores: normalizedData,
				journals: normalizedJournals,
			};
			const exportXmlDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-score-data-${Date.now()}`;
			const xmlAsString = x2js.js2xml({ data: exportJsonData });
			const dataStr = 'data:text/json;charset=utf-8,' + xmlAsString;
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportXmlDataName + '.xml'
			);
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/xml-export-success');
		} catch (error) {
			reject('export/xml-export-error');
		}
	});
};

type ExportCategoryUpdateProps = {
	user: User | null;
	category: keyof ExportStatus;
};

type ExportCategoryReturnValue = {
	threshold:
		| 'export/allowed'
		| 'export/threshold-crossed'
		| 'export/threshold-check-error';
	increment: 'export/increment-success' | 'export/increment-error';
};

export const validateExportThreshold = ({
	user,
	category,
}: ExportCategoryUpdateProps): Promise<
	ExportCategoryReturnValue['threshold']
> => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		try {
			const currentDate = new Date()
				.toDateString()
				.toLowerCase()
				.replace(/\s+/g, '-');
			const exportsRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'exports',
				currentDate
			);
			const exports = await getDoc(exportsRef);
			if (!exports.exists()) {
				// Does not exist
				await setDoc(exportsRef, createDefaultExportStatusValue());
				resolve('export/allowed');
				return;
			}
			const exportStatus = exports.data() as ExportStatus;
			if (exportStatus[category] && exportStatus[category] >= 3) {
				reject('export/threshold-crossed');
				return;
			}
			resolve('export/allowed');
		} catch (error) {
			reject('export/threshold-check-error');
		}
	});
};

export const incrementExportThreshold = ({
	user,
	category,
}: ExportCategoryUpdateProps): Promise<
	ExportCategoryReturnValue['increment']
> => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		try {
			const currentDate = new Date()
				.toDateString()
				.toLowerCase()
				.replace(/\s+/g, '-');
			const exportsRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'exports',
				currentDate
			);
			await updateDoc(exportsRef, { [category]: increment(1) });
			resolve('export/increment-success');
		} catch (error) {
			reject('export/increment-error');
		}
	});
};

export function createDefaultExportStatusValue(): ExportStatus {
	return {
		csv: 0,
		json: 0,
		xml: 0,
	};
}
