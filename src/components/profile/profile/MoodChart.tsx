import { useState, useEffect } from 'react';
import { FirebaseDb } from '../../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../../store/user';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import MOODS from '../../../data/moods';

const MoodChart = () => {
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
		const moodCounts: Record<string, number> = {};

		journals.forEach((entry) => {
			if (entry.type !== 'mood') return;
			if (entry.mood !== undefined) {
				const moodName = `${
					MOODS.find((m) => m.id === entry.mood)?.mood
				} - ${MOODS.find((m) => m.id === entry.mood)?.emoji}`;

				if (moodCounts[moodName]) {
					moodCounts[moodName]++;
				} else {
					moodCounts[moodName] = 1;
				}
			}
		});
		const moodArray = Object.entries(moodCounts).map(([name, value]) => ({
			name,
			value,
		}));
		return moodArray;
	});
	console.log(data);

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
			className='mt-4'
		>
			<h3 className='font-heading text-xl font-bold'>Mood Chart</h3>
			<hr className='w-full' />
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
						dataKey='value'
						nameKey='name'
						outerRadius={50}
						fill='#8884d8'
						legendType='diamond'
						label={true}
					/>
					<Tooltip />
					<Legend />
				</PieChart>
			)}
		</motion.div>
	);
};

export default MoodChart;
