/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Mood - Average Mood Score Component
 */

// Dependencies
import { FirebaseDb } from '../../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../../store/user';
import MOODS from '../../../data/moods';

const AverageMoodScore = () => {
	const { user } = useUserStore();
	const { data, isLoading, error } = useQuery(
		'averageMoodScore',
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'journals'
			);
			const q = query(ref, where('type', '==', 'mood'));
			const data = await getDocs(q);
			const moodScales: number[] = [];
			data.forEach((doc) => {
				const docData = doc.data();
				moodScales.push(
					MOODS.find((mood) => mood.id === docData.mood)?.scale ?? 0
				);
			});
			const averageMoodScore =
				moodScales.reduce((prev, curr) => prev + curr, 0) /
				moodScales.length;

			// Determine the closest mood
			let closestMood = MOODS[0];
			let minDifference = Math.abs(averageMoodScore - MOODS[0].scale);

			MOODS.forEach((mood) => {
				const difference = Math.abs(averageMoodScore - mood.scale);
				if (difference < minDifference) {
					minDifference = difference;
					closestMood = mood;
				}
			});

			return { averageMoodScore, closestMood };
		}
	);

	return (
		<div>
			{isLoading ? null : error ? null : data &&
			  data.averageMoodScore &&
			  !isNaN(data.averageMoodScore) ? (
				<p className='mt-2 text-center text-sm'>
					Your average score is{' '}
					<u title={`${data?.averageMoodScore} to be exact!`}>
						{data?.averageMoodScore.toFixed(1)}
					</u>
					. It's close to {data?.closestMood.emoji} being{' '}
					<b>{data?.closestMood.mood}</b>.
				</p>
			) : null}
		</div>
	);
};

export default AverageMoodScore;
