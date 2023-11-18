import QUESTIONS from '../data/questions';
import { User } from 'firebase/auth';

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
