import {
	collection,
	getCountFromServer,
	query,
	where,
} from 'firebase/firestore';
import { useQuery } from 'react-query';
import { FirebaseDb, FirebaseAuth } from '../../../firebase';
import { useUserStore } from '../../../store/user';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProfileCard = () => {
	const { user } = useUserStore();
	const {
		data: countData,
		error: countError,
		isLoading: countIsLoading,
	} = useQuery('testsTakenByUser', async () => {
		const scoresRef = collection(
			FirebaseDb,
			'users',
			user?.uid as string,
			'scores'
		);
		const moodsRef = query(
			collection(FirebaseDb, 'users', user?.uid as string, 'journals'),
			where('type', '==', 'mood')
		);
		const journalsRef = query(
			collection(FirebaseDb, 'users', user?.uid as string, 'journals'),
			where('type', '==', 'journal')
		);
		const testCount = await getCountFromServer(scoresRef);
		const moodCount = await getCountFromServer(moodsRef);
		const journalCount = await getCountFromServer(journalsRef);
		return {
			testsTaken: testCount.data().count,
			moodEntries: moodCount.data().count,
			journalEntries: journalCount.data().count,
		};
	});
	const handleUserSignOut = async () => {
		toast.promise(signOut(FirebaseAuth), {
			loading: 'Signing out...',
			success: 'Sign out successful, see you later 👋',
			error: 'Unable to sign out at the moment',
		});
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='w-full bg-tertiary rounded-xl p-4 flex flex-col items-center justify-center gap-4'
		>
			<div className='rounded-full overflow-hidden w-1/5 border-4 border-secondary'>
				<img
					src={user?.photoURL ?? ''}
					alt={user?.displayName ?? ''}
					className='w-full h-auto object-contain rounded-full'
					loading='lazy'
				/>
			</div>
			<div className='font-heading text-center'>
				<p className='text-xl font-bold'>{user?.displayName}</p>
				<p>
					User since:{' '}
					{new Intl.DateTimeFormat('en-US', {
						dateStyle: 'long',
					}).format(
						new Date(user?.metadata?.creationTime as string)
					)}{' '}
				</p>
				<div className='w-full grid grid-cols-2 gap-x-4 mt-2 text-left'>
					<p>
						<b>Tests Taken</b>:{' '}
						{countIsLoading
							? 'Loading...'
							: countError
							? 'Unable to get count'
							: countData?.testsTaken}
					</p>
					<p>
						<b>Mood Entries</b>:{' '}
						{countIsLoading
							? 'Loading...'
							: countError
							? 'Unable to get count'
							: countData?.moodEntries}
					</p>
					<p>
						<b>Journal Entries</b>:{' '}
						{countIsLoading
							? 'Loading...'
							: countError
							? 'Unable to get count'
							: countData?.journalEntries}
					</p>
				</div>
			</div>
			<hr className='border w-full' />
			<button
				onClick={handleUserSignOut}
				className='text-gray-500 text-sm trasnition-all hover:underline hover:text-red-500 decoration-red-500'
			>
				Sign out
			</button>
		</motion.div>
	);
};

export default ProfileCard;
