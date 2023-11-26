/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Score History Page
 */

// Dependencies
import { useState } from 'react';
import { FirebaseDb } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../store/user';
import HistoryCard from '../../components/profile/score/HistoryCard';
import ScoreFilter from '../../components/profile/score/ScorerFilter';

const PER_PAGE_LIMIT = 10;

function ScoreHistory() {
	const { user } = useUserStore();
	const [filter, setFilter] = useState<ScoreHistoryFilter>({
		date: {
			order: 'asc',
			range: 'Last 1 week',
		},
		score: {
			range: {
				start: 0,
				end: 100,
			},
			order: 'asc',
		},
		limit: 50,
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
			const q = query(ref, orderBy('time', filter.date.order));
			const data = await getDocs(q);
			const scores: Score[] = [];
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
			return scores;
		}
	);

	return (
		<div className='w-full flex flex-col items-center gap-4 mt-4'>
			<ScoreFilter filter={filter} setFilter={setFilter} />
			<section className='w-full flex flex-col items-center gap-4'>
				{isLoading
					? 'Loading...'
					: error
					? 'Unable to get score history...'
					: data &&
					  data?.length > 0 &&
					  data?.map((score, index) => (
							<HistoryCard {...score} key={index} index={index} />
					  ))}
			</section>
		</div>
	);
}

export default ScoreHistory;
