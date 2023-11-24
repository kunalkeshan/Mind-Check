type ScoreValue = Record<number, number>;

interface Score {
	id: string;
	calculatedScore: number;
	time: string;
	score: {
		'Thoughts & Feelings': ScoreValue;
		'Activities & Personal Relationships': ScoreValue;
		'Physical Symptoms': ScoreValue;
		'Suicidal Urges': ScoreValue;
	};
}

interface MoodData {
	type: 'mood';
	mood: number;
}

interface JournalData {
	type: 'journal';
	journal: string;
}

type Journal = {
	id: string;
	time: string;
} & (MoodData | JournalData);

interface ExportStatus {
	csv: number;
	json: number;
	xml: number;
}
