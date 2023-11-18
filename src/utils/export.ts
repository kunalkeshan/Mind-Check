import QUESTIONS from '../data/questions';
import { User } from 'firebase/auth';
import { FirebaseDb } from '../firebase';
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';

export const EXPORT_LIMIT = 3;

type ExportProps = {
	data: Score[];
	user: User | null;
};

type ExportReturnValue = {
	csv: 'export/csv-export-success' | 'export/csv-export-error';
	json: 'export/json-export-success' | 'export/json-export-error';
};

export const exportDataToCsv = ({
	data,
	user,
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
						'Calculated Score': score.calculatedScore,
						'Test Taken': score.time,
						...scores,
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
			const exportCsvDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-score-data-${Date.now()}`;
			const dataStr =
				'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportCsvDataName + '.csv'
			);
			document.body.appendChild(downloadAnchorNode); // required for firefox
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
			const exportJsonData = {
				exportedAt: new Date(),
				user: {
					name: user?.displayName,
					email: user?.email,
				},
				scores: normalizedData,
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

type ExportCategoryUpdateProps = {
	user: User | null;
	category: 'csv' | 'json';
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
				await setDoc(exportsRef, { json: 0, csv: 0 });
				resolve('export/allowed');
				return;
			}
			const exportStatus = exports.data() as {
				csv: number;
				json: number;
			};
			if (exportStatus[category] >= 3) {
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
