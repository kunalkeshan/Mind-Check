/**
 * Profile Page
 */

// Dependencies
import { useUserStore } from '../../store/user';
import { collection, getCountFromServer } from 'firebase/firestore';
import { FirebaseAuth, FirebaseDb } from '../../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

function Profile() {
	const { user } = useUserStore();
	const {
		data: testCountData,
		error: testCountError,
		isLoading: testCountIsLoading,
	} = useQuery('testsTakenByUser', async () => {
		const scoresRef = collection(
			FirebaseDb,
			'users',
			user?.uid as string,
			'scores'
		);
		const count = await getCountFromServer(scoresRef);
		return count.data().count;
	});

	const handleUserSignOut = async () => {
		toast.promise(signOut(FirebaseAuth), {
			loading: 'Signing out...',
			success: 'Sign out successful, see you later 👋',
			error: 'Unable to sign out at the moment',
		});
	};

	return (
		<div className='w-full relative grid grid-cols-3 mt-8 text-left'>
			<section className='sticky top-16'>
				<div className='w-full bg-tertiary rounded-xl p-4 flex flex-col items-center justify-center gap-4'>
					<div className='rounded-lg overflow-hidden w-1/5 border-4 border-secondary'>
						<img
							src={user?.photoURL ?? ''}
							alt={user?.displayName ?? ''}
							className='w-full h-auto object-contain'
						/>
					</div>
					<div className='font-heading'>
						<p className='text-xl font-bold'>{user?.displayName}</p>
						<p>
							User since:{' '}
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							}).format(
								new Date(user?.metadata?.creationTime as string)
							)}{' '}
						</p>
						<p>
							Tests Taken:{' '}
							{testCountIsLoading
								? 'Loading...'
								: testCountError
								? 'Unable to get count'
								: testCountData}
						</p>
					</div>
					<hr className='border w-full' />
					<button
						onClick={handleUserSignOut}
						className='text-gray-500 text-sm trasnition-all hover:underline hover:text-red-500 decoration-red-500'
					>
						Sign out
					</button>
				</div>
			</section>
			<section className='md:col-span-2'></section>
		</div>
	);
}

export default Profile;
