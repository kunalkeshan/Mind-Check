/* eslint-disable no-mixed-spaces-and-tabs */
import QUESTIONS from '../data/questions';
import MOODS from '../data/moods';
import { User } from 'firebase/auth';
import { FirebaseDb } from '../firebase';
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import X2JS from 'x2js';
import yaml from 'js-yaml';

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
	txt: 'export/txt-export-success' | 'export/txt-export-error';
	md: 'export/md-export-success' | 'export/md-export-error';
	html: 'export/html-export-success' | 'export/html-export-error';
	yaml: 'export/yaml-export-success' | 'export/yaml-export-error';
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
				.replace(/\s+/g, '-')}-data-${Date.now()}`;
			const xmlAsString = x2js.js2xml({ data: exportJsonData });
			const dataStr = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlAsString);
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

export const exportDataToTxt = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['txt']> => {
	return new Promise((resolve, reject) => {
		try {
			let txtContent = `Mind Check - Data Export\n`;
			txtContent += `Exported At: ${new Date().toISOString()}\n`;
			txtContent += `User: ${user?.displayName} (${user?.email})\n`;
			txtContent += `${'='.repeat(50)}\n\n`;

			// Scores Section
			txtContent += `SCORES\n`;
			txtContent += `${'-'.repeat(50)}\n`;
			const normalizedData = data
				.filter((score) => typeof score.score !== 'undefined')
				.map((score, index) => {
					let scoreText = `\n${index + 1}. Test Taken: ${score.time}\n`;
					scoreText += `   Calculated Score: ${score.calculatedScore}\n`;
					scoreText += `   Responses:\n`;
					Object.keys(score.score).forEach((key) => {
						scoreText += `   - ${key}:\n`;
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
							scoreText += `     * ${question}: ${answer}\n`;
						});
					});
					return scoreText;
				});
			txtContent += normalizedData.join('');

			// Journals Section
			txtContent += `\n\nJOURNALS\n`;
			txtContent += `${'-'.repeat(50)}\n`;
			journals
				.filter((journal) => typeof journal !== 'undefined')
				.forEach((journal, index) => {
					txtContent += `\n${index + 1}. Entry Time: ${journal.time}\n`;
					txtContent += `   Type: ${journal.type}\n`;
					if (journal.type === 'journal') {
						txtContent += `   Entry: ${journal.journal}\n`;
					} else {
						const mood = MOODS.find((m) => m.id === journal.mood);
						txtContent += `   Mood: ${mood?.mood}\n`;
					}
				});

			const exportTxtDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-data-${Date.now()}`;
			const dataStr =
				'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent);
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportTxtDataName + '.txt'
			);
			document.body.appendChild(downloadAnchorNode);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/txt-export-success');
		} catch (error) {
			reject('export/txt-export-error');
		}
	});
};

export const exportDataToMd = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['md']> => {
	return new Promise((resolve, reject) => {
		try {
			let mdContent = `# Mind Check - Data Export\n\n`;
			mdContent += `**Exported At:** ${new Date().toISOString()}\n\n`;
			mdContent += `**User:** ${user?.displayName} (${user?.email})\n\n`;
			mdContent += `---\n\n`;

			// Scores Section
			mdContent += `## Scores\n\n`;
			const normalizedData = data
				.filter((score) => typeof score.score !== 'undefined')
				.map((score, index) => {
					let scoreText = `### ${index + 1}. Test Taken: ${score.time}\n\n`;
					scoreText += `**Calculated Score:** ${score.calculatedScore}\n\n`;
					scoreText += `#### Responses:\n\n`;
					Object.keys(score.score).forEach((key) => {
						scoreText += `**${key}:**\n\n`;
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
							scoreText += `- ${question}: **${answer}**\n`;
						});
						scoreText += `\n`;
					});
					return scoreText;
				});
			mdContent += normalizedData.join('\n---\n\n');

			// Journals Section
			mdContent += `\n## Journals\n\n`;
			journals
				.filter((journal) => typeof journal !== 'undefined')
				.forEach((journal, index) => {
					mdContent += `### ${index + 1}. Entry Time: ${journal.time}\n\n`;
					mdContent += `**Type:** ${journal.type}\n\n`;
					if (journal.type === 'journal') {
						mdContent += `**Entry:**\n\n> ${journal.journal}\n\n`;
					} else {
						const mood = MOODS.find((m) => m.id === journal.mood);
						mdContent += `**Mood:** ${mood?.mood}\n\n`;
					}
				});

			const exportMdDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-data-${Date.now()}`;
			const dataStr =
				'data:text/markdown;charset=utf-8,' + encodeURIComponent(mdContent);
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportMdDataName + '.md'
			);
			document.body.appendChild(downloadAnchorNode);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/md-export-success');
		} catch (error) {
			reject('export/md-export-error');
		}
	});
};

export const exportDataToHtml = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['html']> => {
	return new Promise((resolve, reject) => {
		try {
			let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mind Check - Data Export</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        .meta { color: #666; margin-bottom: 20px; }
        .score-card, .journal-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .category { margin: 10px 0; }
        .category-title { font-weight: bold; color: #555; }
        .question { margin-left: 20px; }
        hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>Mind Check - Data Export</h1>
    <div class="meta">
        <p><strong>Exported At:</strong> ${new Date().toISOString()}</p>
        <p><strong>User:</strong> ${user?.displayName} (${user?.email})</p>
    </div>
    <hr>
    <h2>Scores</h2>`;

			// Scores Section
			const normalizedData = data
				.filter((score) => typeof score.score !== 'undefined')
				.map((score, index) => {
					let scoreHtml = `
    <div class="score-card">
        <h3>${index + 1}. Test Taken: ${score.time}</h3>
        <p><strong>Calculated Score:</strong> ${score.calculatedScore}</p>
        <h4>Responses:</h4>`;
					Object.keys(score.score).forEach((key) => {
						scoreHtml += `
        <div class="category">
            <span class="category-title">${key}:</span>
            <ul>`;
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
							scoreHtml += `
                <li class="question">${question}: <strong>${answer}</strong></li>`;
						});
						scoreHtml += `
            </ul>
        </div>`;
					});
					scoreHtml += `
    </div>`;
					return scoreHtml;
				});
			htmlContent += normalizedData.join('');

			// Journals Section
			htmlContent += `
    <hr>
    <h2>Journals</h2>`;
			journals
				.filter((journal) => typeof journal !== 'undefined')
				.forEach((journal, index) => {
					htmlContent += `
    <div class="journal-card">
        <h3>${index + 1}. Entry Time: ${journal.time}</h3>
        <p><strong>Type:</strong> ${journal.type}</p>`;
					if (journal.type === 'journal') {
						htmlContent += `
        <p><strong>Entry:</strong></p>
        <blockquote>${journal.journal}</blockquote>`;
					} else {
						const mood = MOODS.find((m) => m.id === journal.mood);
						htmlContent += `
        <p><strong>Mood:</strong> ${mood?.mood}</p>`;
					}
					htmlContent += `
    </div>`;
				});

			htmlContent += `
</body>
</html>`;

			const exportHtmlDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-data-${Date.now()}`;
			const dataStr =
				'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportHtmlDataName + '.html'
			);
			document.body.appendChild(downloadAnchorNode);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/html-export-success');
		} catch (error) {
			reject('export/html-export-error');
		}
	});
};

export const exportDataToYaml = ({
	data,
	user,
	journals,
}: ExportProps): Promise<ExportReturnValue['yaml']> => {
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
			const exportYamlData = {
				exportedAt: new Date().toISOString(),
				user: {
					name: user?.displayName,
					email: user?.email,
				},
				scores: normalizedData,
				journals: normalizedJournals,
			};
			const exportYamlDataName = `${user?.displayName
				?.toLowerCase()
				.replace(/\s+/g, '-')}-data-${Date.now()}`;
			const yamlString = yaml.dump(exportYamlData);
			const dataStr =
				'data:text/yaml;charset=utf-8,' + encodeURIComponent(yamlString);
			const downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute('href', dataStr);
			downloadAnchorNode.setAttribute(
				'download',
				exportYamlDataName + '.yaml'
			);
			document.body.appendChild(downloadAnchorNode);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
			resolve('export/yaml-export-success');
		} catch (error) {
			reject('export/yaml-export-error');
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
		txt: 0,
		md: 0,
		html: 0,
		yaml: 0,
	};
}
