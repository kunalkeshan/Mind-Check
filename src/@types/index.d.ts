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

interface ExportStatus {
	csv: number;
	json: number;
	xml: number;
}
