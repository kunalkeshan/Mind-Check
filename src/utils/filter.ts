/**
 * Filter Utilities
 */

import { Query, query, where } from 'firebase/firestore';
import { DATE_FILTER } from '../data/filter';

export const getQueryForDateRange = (
	q: Query,
	range: ScoreHistoryFilter['date']['range']
): Query => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const startDate = new Date(today);

	switch (range) {
		case 'Today':
			q = query(q, where('time', '>=', startDate));
			break;
		case 'Last 1 week':
		case 'Last 2 weeks':
			for (let i = 0; i < DATE_FILTER[range]; i++) {
				startDate.setDate(startDate.getDate() - 1);
			}
			q = query(q, where('time', '>=', startDate));
			break;
		case 'Last 30 days':
		case 'Last 90 days':
			startDate.setDate(startDate.getDate() - DATE_FILTER[range]);
			q = query(q, where('time', '>=', startDate));
			break;
		case 'All Time':
		default:
			break;
	}

	return q;
};

export function filterByScoreRange(data: Score[], start: number, end: number) {
	return data.filter(
		(item) => item.calculatedScore >= start && item.calculatedScore <= end
	);
}
