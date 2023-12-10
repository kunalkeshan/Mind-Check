import { useState, useEffect, useId } from 'react';
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
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import EmptyList from '../../reusable/EmptyList';

interface Score {
	id: string;
	calculatedScore: number;
	time: Timestamp;
}

const TotalHistoryChart = () => {
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const { user } = useUserStore();
	const emptyListId = useId();
	const { data, isLoading, error } = useQuery(
		'totalHistoryScoreData',
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'scores'
			);
			const q = query(ref, orderBy('time', 'asc'));
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

	useEffect(() => {
		const handleResize = () =>
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
		>
			<h3 className='font-heading text-xl font-bold'>
				Total Score History
			</h3>
			<hr className='w-full' />
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Unable to load chart...'
			) : data && data?.length > 0 ? (
				<LineChart
					width={
						// dimensions.width < 500
						// 	? 300
						// 	: dimensions.width > 1200
						// 	? 800
						// 	: 600
						dimensions.width < 780
							? dimensions.width - 100
							: dimensions.width - dimensions.width / 2
					}
					height={300}
					data={data}
					className='w-full'
				>
					<Line
						type='monotone'
						dataKey='calculatedScore'
						stroke='#8884d8'
					/>
					<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
					<XAxis dataKey='time' fontSize={'0.75rem'}></XAxis>
					<YAxis dataKey={'calculatedScore'} />
					<Tooltip />
					<Legend />
				</LineChart>
			) : (
				<EmptyList
					key={emptyListId}
					data={{
						title: 'No tests taken!',
						description: 'Take a test to get your chart history.',
					}}
				/>
			)}
		</motion.div>
	);
};

export default TotalHistoryChart;
