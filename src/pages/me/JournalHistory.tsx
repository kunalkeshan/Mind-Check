/**
 * Journal History Page
 */

// Dependencies
import { useId, useState } from 'react';
import { FirebaseDb } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../store/user';
import { getQueryForDateRange } from '../../utils/filter';
import JournalFilter from '../../components/profile/journal/JournalFilter';
import EmptyList from '../../components/reusable/EmptyList';
import JournalHistoryCard from '../../components/profile/journal/JournalHistoryCard';

const JournalHistory = () => {
	const { user } = useUserStore();
	const emptyListId = useId();
	const [filter, setFilter] = useState<JournalHistoryFilter>({
		date: {
			order: 'none',
			range: 'Last 1 week',
		},
		type: 'all',
		page: 1,
	});
	const { data, isLoading, error } = useQuery(
		['journalHistoryPage', filter],
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'journals'
			);
			let q = query(ref);

			// Date Order & Range
			if (filter.date.order !== 'none')
				q = query(q, orderBy('time', filter.date.order));
			q = getQueryForDateRange(q, filter.date.range);

			// Filter by Search Query

			const data = await getDocs(q);
			let journals: Journal[] = [];
			data.forEach((doc) => {
				const docData = doc.data();
				docData.time = new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeStyle: 'short',
				}).format(docData.time.toDate());
				delete docData.score;
				journals.push({
					id: doc.id,
					...docData,
				} as Journal);
			});

			// Filter by Journal Type
			if (filter.type !== 'all') {
				journals = journals.filter(
					(journal) => journal.type === filter.type
				);
			}

			return journals;
		}
	);
	return (
		<div className='w-full flex flex-col items-center'>
			<JournalFilter filter={filter} setFilter={setFilter} />
			<section className='w-full flex flex-col items-center gap-4 mt-4'>
				{isLoading ? (
					'Loading...'
				) : error ? (
					'Unable to get journal history...'
				) : data && data?.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{data?.map((journal, index) => (
							<JournalHistoryCard
								data={journal}
								key={index}
								index={index}
							/>
						))}
					</div>
				) : (
					<EmptyList
						key={emptyListId}
						data={{
							title: 'No journal entries found!',
							description:
								'Your journal is currently empty. Feel free to express your thoughts, feelings, or experiences by adding new entries. Journaling can be a great way to reflect and track your mental well-being journey!',
						}}
					/>
				)}
			</section>
		</div>
	);
};

export default JournalHistory;
