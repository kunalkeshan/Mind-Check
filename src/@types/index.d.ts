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

interface DateFilter {
	Today: 0;
	'Last 1 week': 7;
	'Last 2 weeks': 14;
	'Last 30 days': 30;
	'Last 90 days': 90;
	'All Time': 'all';
}

interface BaseHistoryFilter {
	date: {
		range: keyof DateFilter;
		order: 'asc' | 'desc' | 'none';
	};
	page: number;
}

interface ScoreHistoryFilter extends BaseHistoryFilter {
	score: {
		range: {
			start: number;
			end: number;
		};
		order: 'asc' | 'desc' | 'none';
	};
}

interface JournalHistoryFilter extends BaseHistoryFilter {
	type: 'mood' | 'journal' | 'all';
}
