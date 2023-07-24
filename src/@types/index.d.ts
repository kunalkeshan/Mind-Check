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
