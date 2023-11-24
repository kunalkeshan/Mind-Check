import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JournalEntry from './JournalEntry';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { BookOpen, Brain } from 'lucide-react';
import { useUserStore } from '../../../store/user';
import { FirebaseDb } from '../../../firebase';
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
} from 'firebase/firestore';
import 'react-vertical-timeline-component/style.min.css';

const JournalTimeline = () => {
	const [journals, setJournals] = useState<Journal[]>([]);
	const [error, setError] = useState(false);
	const { user } = useUserStore();

	useEffect(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const collectionRef = collection(
			FirebaseDb,
			'users',
			user?.uid as string,
			'journals'
		);
		const q = query(
			collectionRef,
			where('time', '>=', today),
			orderBy('time', 'desc')
		);
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
					time: new Intl.DateTimeFormat('en-US', {
						timeStyle: 'full',
					}).format(doc.data().time.toDate()),
				}));
				setJournals(data as unknown as Journal[]);
			},
			() => {
				setError(true);
			}
		);
		return () => unsubscribe();
	}, [user]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='w-full'
		>
			<h3 className='font-heading text-xl font-bold'>
				Today's Journal Entries
			</h3>
			<hr className='w-full' />
			{error ? (
				'Unable to load journals...'
			) : journals.length > 0 ? (
				<VerticalTimeline className='!py-4' layout='1-column-left'>
					{journals.map((journal) => (
						<VerticalTimelineElement
							className='group'
							key={`journal-entry-timeline-${journal.id}`}
							date={journal.time}
							iconStyle={{ backgroundColor: '#ffffff' }}
							style={{ margin: '1em 0' }}
							icon={
								journal.type === 'journal' ? (
									<BookOpen />
								) : (
									<Brain />
								)
							}
						>
							<JournalEntry
								key={`journal-entry-${journal.id}`}
								journal={journal}
							/>
						</VerticalTimelineElement>
					))}
				</VerticalTimeline>
			) : null}
		</motion.div>
	);
};

export default JournalTimeline;
