/**
 * Mood - Overall Chart Component
 */

// Dependencies
import { useState, useEffect } from 'react';
import { FirebaseDb } from '../../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../../store/user';
import { PieChart, Pie, Tooltip, Legend, LabelList } from 'recharts';
import MOODS from '../../../data/moods';

const OverallMoodChart = () => {
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const { user } = useUserStore();
	const { data, isLoading, error } = useQuery('moodData', async () => {
		const ref = collection(
			FirebaseDb,
			'users',
			user?.uid as string,
			'journals'
		);
		const q = query(
			ref,
			where('type', '==', 'mood'),
			orderBy('time', 'asc')
		);
		const data = await getDocs(q);
		const journals: Journal[] = [];
		data.forEach((doc) => {
			const docData = doc.data();
			docData.time = new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			}).format(docData.time.toDate());
			delete docData.score;
			journals.push({
				id: doc.id,
				...docData,
			} as Journal);
		});
		const moodCounts: Record<string, { count: number; emoji: string }> = {};

		journals.forEach((entry) => {
			if (entry.type !== 'mood') return;
			if (entry.mood !== undefined) {
				const moodName = `${
					MOODS.find((m) => m.id === entry.mood)?.mood
				} - ${MOODS.find((m) => m.id === entry.mood)?.emoji}`;

				if (moodCounts[moodName]) {
					moodCounts[moodName]['count']++;
				} else {
					moodCounts[moodName] = {
						count: 1,
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						emoji: MOODS.find((m) => m.id === entry.mood)!.emoji,
					};
				}
			}
		});
		console.log(moodCounts);
		const moodArray = Object.entries(moodCounts).map(([key, value]) => ({
			name: key,
			...value,
		}));
		return moodArray;
	});

	console.log(data, error);

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
		<div>
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Unable to load chart...'
			) : (
				<PieChart
					width={
						dimensions.width < 500
							? 300
							: dimensions.width > 1200
							? 700
							: 480
					}
					height={300}
					data={data}
					className='w-full'
				>
					<Pie
						data={data}
						dataKey='count'
						nameKey='name'
						outerRadius={50}
						fill='#8884d8'
						legendType='diamond'
						label={true}
					>
						<LabelList
							dataKey='emoji'
							position='insideTop'
							className='text-xs md:text-sm'
						/>
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			)}
		</div>
	);
};

export default OverallMoodChart;
