/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo, useId } from 'react';
import { FirebaseDb } from '../../../firebase';
import {
	Timestamp,
	collection,
	getDocs,
	query,
	orderBy,
} from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../../store/user';
import { motion } from 'framer-motion';
import EmptyList from '../../reusable/EmptyList';
import FEEDBACKS, { FEEDBACKS_LENGTH } from '../../../data/feedback';

type IScore = Score & {
	time: Timestamp;
};

const AverageScore = () => {
	const { user } = useUserStore();
	const emptyListId = useId();
	const { data, isLoading, error } = useQuery(
		'averageScoreData',
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'scores'
			);
			const q = query(ref, orderBy('time', 'asc'));
			const data = await getDocs(q);
			const scores: IScore[] = [];
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
				} as IScore);
			});
			// Sum of all scores that the user has scored
			const totalScore = scores
				.map((score) => score.calculatedScore)
				.reduce((prev, curr) => prev + curr, 0);
			// The total number of tests taken * 100
			const totalTestsScore = scores.length * 100;
			// Average Score = (totalScore / totalTestsScore) * 100 -> In terms of 100%
			const averageScore = parseInt(
				((totalScore / totalTestsScore) * 100).toFixed(2)
			);
			return { scores, averageScore };
		}
	);

	const feedbackOnScore = useMemo(() => {
		const feedbackInfo = FEEDBACKS.find((feedback) => {
			if (
				(data?.averageScore || 0) >= feedback.range.min &&
				(data?.averageScore || 0) <= feedback.range.max
			) {
				return true;
			}
		});
		return feedbackInfo?.feedback[
			Math.floor(Math.random() * FEEDBACKS_LENGTH)
		];
	}, [data?.averageScore]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='mt-4'
		>
			<h3 className='font-heading text-xl font-bold'>Average Score</h3>
			<hr className='w-full' />
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Unable to load average score...'
			) : data && data.averageScore && !isNaN(data.averageScore) ? (
				<section className='w-full'>
					<div
						className={`${
							(data?.averageScore || 0) >= 0 &&
							(data?.averageScore || 0) <= 33
								? 'border-green-500 text-green-500'
								: (data?.averageScore || 0) >= 34 &&
								  (data?.averageScore || 0) <= 66
								? 'border-orange-500 text-orange-500'
								: 'border-red-500 text-red-500'
						} relative z-10 w-full h-16 mt-4 rounded-xl text-center flex items-center justify-center border-2 overflow-hidden`}
					>
						<p className='text-lg font-semibold z-10'>
							{data?.averageScore}
						</p>
						<div
							className={`${
								(data?.averageScore || 0) >= 0 &&
								(data?.averageScore || 0) <= 33
									? 'bg-green-500'
									: (data?.averageScore || 0) >= 34 &&
									  (data?.averageScore || 0) <= 66
									? 'bg-orange-500'
									: 'bg-red-500'
							} w-full h-full -z-10 absolute top-0`}
							style={{
								left: `-${100 - (data?.averageScore || 0)}%`,
							}}
						/>
					</div>
					<p className='w-full mt-4 text-justify text-sm md:text-base'>
						{feedbackOnScore}
					</p>
				</section>
			) : (
				<EmptyList
					key={emptyListId}
					data={{
						title: 'No tests taken!',
						description: 'Take a test to get your average score.',
					}}
				/>
			)}
		</motion.div>
	);
};

export default AverageScore;
