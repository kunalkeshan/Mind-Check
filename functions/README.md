# Firebase Cloud Functions for Mind Check

This directory contains Firebase Cloud Functions for the Mind Check application. These functions run server-side operations for database maintenance and scheduled tasks.

## Overview

The Cloud Functions in this project handle automated maintenance tasks that run on a schedule to keep the database clean and optimized.

### Available Functions

#### `deleteOldExportStatusDocuments`

A scheduled function that automatically removes old export status documents from Firestore.

- **Schedule**: Runs every 24 hours
- **Purpose**: Cleans up export status tracking documents older than 2 days
- **Database Path**: `users/{userId}/exports/{date}`
- **Document ID Format**: `day-mon-dd-yyyy` (e.g., `wed-dec-25-2024`, lowercase)

**Configuration Constants:**
- `EXPORT_STATUS_RETENTION_DAYS`: Number of days to retain export status documents (default: 2)
- `MAX_CONCURRENT_DELETES`: Maximum concurrent delete operations for performance optimization (default: 10)

## Prerequisites

- Node.js (>= 18.x)
- Firebase CLI installed globally
- Access to the Mind Check Firebase project

## Setup

### 1. Install Firebase CLI

```bash
pnpm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Install Dependencies

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
```

> **Note**: The `functions` directory uses `npm` for dependency management as it's a separate Node.js project from the main frontend application which uses `pnpm`.

## Development

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Watch Mode

Compile TypeScript on file changes:

```bash
npm run build:watch
```

### Lint

Run ESLint to check for code issues:

```bash
npm run lint
```

### Local Testing

Start the Firebase emulator for local testing:

```bash
npm run serve
```

Or use the Firebase shell:

```bash
npm run shell
```

## Deployment

### Deploy All Functions

From the project root directory:

```bash
firebase deploy --only functions
```

### Deploy Specific Function

```bash
firebase deploy --only functions:deleteOldExportStatusDocuments
```

### View Logs

```bash
npm run logs
# or
firebase functions:log
```

## Project Structure

```
functions/
├── src/
│   └── index.ts          # Main Cloud Functions entry point
├── lib/                  # Compiled JavaScript (generated)
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Adding New Functions

1. Add your function to `src/index.ts`
2. Export the function using the appropriate Firebase trigger:
   - `functions.pubsub.schedule()` for scheduled tasks
   - `functions.firestore.document()` for Firestore triggers
   - `functions.https.onRequest()` for HTTP endpoints
3. Build and test locally before deploying
4. Deploy using `firebase deploy --only functions`

## Monitoring

After deployment, you can monitor your functions in the Firebase Console:
- **Dashboard**: View invocation counts and execution times
- **Logs**: Check function execution logs and errors
- **Health**: Monitor function performance and errors

Visit: https://console.firebase.google.com/project/{your-project-id}/functions

> For the Mind Check project, replace `{your-project-id}` with `mind-check-app`.

## Troubleshooting

### Common Issues

1. **Function not deploying**: Ensure you're logged in with `firebase login` and have the correct project selected
2. **Permission errors**: Verify your Firebase account has the necessary permissions
3. **Build errors**: Run `npm run build` to check for TypeScript compilation issues
4. **Runtime errors**: Check logs with `firebase functions:log`

### Useful Commands

```bash
# Check current Firebase project
firebase projects:list

# Switch Firebase project
firebase use mind-check-app

# View function logs (last 50 entries)
firebase functions:log --limit 50

# View logs for specific function
firebase functions:log --only deleteOldExportStatusDocuments
```

## References

- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Schedule Functions](https://firebase.google.com/docs/functions/schedule-functions)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Functions Samples Repository](https://github.com/firebase/functions-samples)
