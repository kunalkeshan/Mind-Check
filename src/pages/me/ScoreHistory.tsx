/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Score History Page
 */

// Dependencies
import { useId, useState } from 'react';
import { FirebaseDb } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../store/user';
import HistoryCard from '../../components/profile/score/HistoryCard';
import ScoreFilter from '../../components/profile/score/ScoreFilter';
import { filterByScoreRange, getQueryForDateRange } from '../../utils/filter';
import EmptyList from '../../components/reusable/EmptyList';

// const PER_PAGE_LIMIT = 10;

function ScoreHistory() {
	const { user } = useUserStore();
	const emptyListId = useId();
	const [filter, setFilter] = useState<ScoreHistoryFilter>({
		date: {
			order: 'none',
			range: 'Last 1 week',
		},
		score: {
			range: {
				start: 0,
				end: 100,
			},
			order: 'none',
		},
		page: 1,
	});
	const { data, isLoading, error } = useQuery(
		['scoreHistoryPage', filter],
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'scores'
			);
			let q = query(ref);

			// Date Order & Range
			if (filter.date.order !== 'none')
				q = query(q, orderBy('time', filter.date.order));
			q = getQueryForDateRange(q, filter.date.range);

			const data = await getDocs(q);
			let scores: Score[] = [];
			data.forEach((doc) => {
				const docData = doc.data();
				docData.time = new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeStyle: 'short',
				}).format(docData.time.toDate());
				delete docData.score;
				scores.push({
					id: doc.id,
					...docData,
				} as Score);
			});

			// Sort by Score Order
			if (filter.score.order !== 'none') {
				scores.sort((a, b) => {
					if (filter.score.order === 'desc')
						return a.calculatedScore - b.calculatedScore;
					else return b.calculatedScore - a.calculatedScore;
				});
			}

			// Filter By Score Range
			if (filter.score.range.end !== 100) {
				scores = filterByScoreRange(
					scores,
					filter.score.range.start,
					filter.score.range.end
				);
			}
			return scores;
		}
	);

	return (
		<div className='w-full flex flex-col items-center'>
			<ScoreFilter filter={filter} setFilter={setFilter} />
			<section className='w-full flex flex-col items-center gap-4 mt-4'>
				{isLoading ? (
					'Loading...'
				) : error ? (
					'Unable to get score history...'
				) : data && data?.length > 0 ? (
					data?.map((score, index) => (
						<HistoryCard {...score} key={index} index={index} />
					))
				) : (
					<EmptyList
						key={emptyListId}
						data={{
							title: 'No score history found!',
							description:
								'Oops! It seems like there are no scores matching the selected filters. Try adjusting your filters or take a new test to view your score history!',
						}}
					/>
				)}
			</section>
		</div>
	);
}

export default ScoreHistory;
