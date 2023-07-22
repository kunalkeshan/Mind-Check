/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Score History Page
 */

// Dependencies
import { FirebaseDb } from '../../firebase';
import {
	Timestamp,
	collection,
	getDocs,
	query,
	orderBy,
} from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../store/user';
import HistoryCard from '../../components/profile/HistoryCard';

interface Score {
	id: string;
	calculatedScore: number;
	time: Timestamp;
}

function ScoreHistory() {
	const { user } = useUserStore();
	const { data, isLoading, error } = useQuery(
		'scoreHistoryPage',
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'scores'
			);
			const q = query(ref, orderBy('time', 'desc'));
			const data = await getDocs(q);
			const scores: Score[] = [];
			data.forEach((doc) => {
				const docData = doc.data();
				docData.time = new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
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
			{isLoading
				? 'Loading...'
				: error
				? 'Unable to get score history...'
				: data &&
				  data?.length > 0 &&
				  data?.map((score, index) => (
						<HistoryCard {...score} key={index} index={index} />
				  ))}
		</div>
	);
}

export default ScoreHistory;
