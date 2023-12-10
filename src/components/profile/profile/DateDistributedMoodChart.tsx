/**
 * Mood - Date Distributed Chart Component
 */

// Dependencies
import { useState, useEffect, useId } from 'react';
import { FirebaseDb } from '../../../firebase';
import {
	collection,
	getDocs,
	query,
	orderBy,
	where,
	limitToLast,
} from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../../store/user';
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Cell,
	LabelList,
} from 'recharts';
import EmptyList from '../../reusable/EmptyList';
import MOODS from '../../../data/moods';

const MAX_NUM_MOOD_ENTRIES = 50;

const DateDistributedMoodChart = () => {
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const { user } = useUserStore();
	const emptyListId = useId();
	const { data, isLoading, error } = useQuery(
		'dateDistributedMoodData',
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'journals'
			);
			const q = query(
				ref,
				where('type', '==', 'mood'),
				orderBy('time', 'asc'),
				limitToLast(MAX_NUM_MOOD_ENTRIES)
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
			const journalEntries = journals.map((entry) => {
				if (entry.type === 'mood') {
					return {
						...entry,
						mood: MOODS.find((m) => m.id === entry.mood)?.mood,
						scale: MOODS.find((m) => m.id === entry.mood)?.scale,
						emoji: MOODS.find((m) => m.id === entry.mood)?.emoji,
					};
				}
			});
			return journalEntries;
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
		<div>
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Unable to load chart...'
			) : data && data.length > 0 ? (
				<>
					<BarChart
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
						<Bar dataKey='scale' fill='#8884d8'>
							{data?.map((_, index) => (
								<Cell key={`cell-${index}`} fill={'#8884d8'} />
							))}
							<LabelList
								dataKey='emoji'
								position='top'
								className='text-xs md:text-sm'
							/>
						</Bar>
						<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
						<XAxis dataKey='time' fontSize={'0.75rem'}></XAxis>
						<YAxis dataKey={'scale'} />
						<Tooltip
							cursor={{ fill: '#ffffff50' }}
							content={
								<CustomTooltip
									active={undefined}
									payload={undefined}
									label={undefined}
								/>
							}
						/>
						<Legend />
					</BarChart>
					<p className='text-xs w-full text-center'>
						Note: Only latest {MAX_NUM_MOOD_ENTRIES} mood entries
						are shown. To view more, go to your journal history.
					</p>
				</>
			) : (
				<EmptyList
					key={emptyListId}
					data={{
						title: 'No journal entries made!',
						description:
							'Make an mood entry to view your date distributed chart.',
					}}
				/>
			)}
		</div>
	);
};

export default DateDistributedMoodChart;

function CustomTooltip({
	active,
	payload,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	active: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	label: any;
}) {
	if (active && payload && payload.length) {
		return (
			<div className=''>
				<p className='text-sm max-w-[16ch]'>{`${payload[0].payload.mood}`}</p>
			</div>
		);
	}
	return null;
}
