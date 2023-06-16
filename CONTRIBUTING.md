# Contributing to Mind Check

Thank you for your interest in contributing to Mind Check! We appreciate your help in making this app even better. This document provides guidelines for contributing to the project. Please take a moment to read through the guidelines before getting started.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- pnpm (>= 6.x)
- Firebase account and project

### Installation

1. Clone the repository: `git clone https://github.com/kunalkeshan/Mind-Check.git`
2. Navigate to the project directory: `cd Mind-Check`
3. Install the dependencies: `pnpm install`
4. Start the development server: `pnpm dev`
   The app will be running at `http://localhost:5173`.

## Contributing Guidelines

### Code Style

- Use TypeScript for all code.
- Follow the React and TypeScript best practices.
- Format your code using Prettier.
- Lint your code using ESLint.

### Git Workflow

1. Fork the repository to your GitHub account.
2. Clone your forked repository.
3. Create a new branch for your feature/bug fix: `git checkout -b feature/new-feature`
4. Make your changes and commit them with a descriptive message: `git commit -m "Add new feature"`
5. Push your changes to your forked repository: `git push origin feature/new-feature`
6. Open a pull request against the main repository.

### Pull Requests

When opening a pull request, please ensure the following:

- Provide a clear title and description of the changes made.
- Reference any relevant issues or pull requests.
- Include screenshots or GIFs if applicable.
- Request reviews from the maintainers.

### Firebase Configuration

1. Sign in to your Firebase account and create a new project.
2. Set up the necessary Firebase services (e.g., Firestore, Authentication) for the project.
3. Copy the Firebase configuration values (apiKey, authDomain, projectId, etc.) from the Firebase console.
4. Create a `.env` file in the project root directory.
5. Add the Firebase configuration values to the `.env` file in the following format:

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
# etc - refer .env.sample for more information
```

### Reporting Issues

If you encounter any issues or have suggestions for improvement, please open an issue on the issue tracker: [https://github.com/kunalkeshan/Mind-Check.git/issues](https://github.com/kunalkeshan/Mind-Check.git/issues)
When reporting an issue, please include the following details:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Any error messages or stack traces

## Contact

If you have any questions or need further assistance, you can reach out to the project maintainers at [https://github.com/kunalkeshan](https://github.com/kunalkeshan)

## License

Mind Check is released under the [MPL-V2.0 License](LICENSE).
