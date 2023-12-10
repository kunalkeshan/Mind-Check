/**
 * Delete Account Component
 */

// Dependencies
import React, { useState } from 'react';
import { FirebaseAuth, FirebaseDb } from '../../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { signOut, deleteUser, User } from 'firebase/auth';
import { useUserStore } from '../../../store/user';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CONFIRM_DELETE_PHRASE = 'delete my account';

const DeleteAccount = () => {
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useUserStore();

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleDeleteUserAccount = async () => {
		try {
			const userRef = doc(FirebaseDb, 'users', user?.uid as string);
			await toast.promise(deleteDoc(userRef), {
				loading: 'Deleting user data...',
				success: 'User data deleted successful',
				error: 'Unable to delete user data',
			});
			await toast.promise(deleteUser(user as User), {
				loading: 'Deleting user account...',
				success: 'User account deleted successful',
				error: 'Unable to delete user data',
			});
			await toast.promise(signOut(FirebaseAuth), {
				loading: 'Signing out...',
				success: 'Sign out successful, bye bye 👋',
				error: 'Unable to sign out at the moment',
			});
		} catch (error) {
			toast.error('Something went wrong. Try again reloading this page.');
		} finally {
			setLoading(false);
		}
	};

	const isDiabled = loading ? loading : input !== CONFIRM_DELETE_PHRASE;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='mt-4'
		>
			<h3 className='font-heading text-xl font-bold'>
				Delete Account -{' '}
				<span className='text-red-500'>⚠ (danger zone)</span>
			</h3>
			<hr className='w-full' />
			<section className='mt-4'>
				<p className='font-semibold'>
					Warning: This action is irreversible.
				</p>
				<p>
					Deleting your account will permanently remove all your data
					from Mind Check, including your test history, journal
					entries, and profile information. This action cannot be
					undone.
				</p>
				<p className='italic mt-2'>
					If you're sure you want to proceed with deleting your
					account, please follow these steps:
				</p>
				<ul className='list-disc ml-4'>
					<li>
						Type the following text:{' '}
						<b>"{CONFIRM_DELETE_PHRASE}"</b>.
					</li>
					<li>
						Click on the <b>"Delete Account"</b> button.
					</li>
				</ul>
				<div className='flex items-center gap-4 my-4'>
					<input
						value={input}
						onChange={handleInput}
						className='px-2 py-1 rounded-xl border border-textPrimary text-sm font-semibold transition-all'
						placeholder={CONFIRM_DELETE_PHRASE}
					/>
					<button
						disabled={isDiabled}
						className={`${
							isDiabled ? 'grayscale' : ''
						} rounded-xl px-2 py-1 bg-red-500 text-sm font-semibold transition-all`}
						onClick={handleDeleteUserAccount}
					>
						Delete Account
					</button>
				</div>
				<p>
					By confirming this action, you acknowledge that all your
					data associated with your account will be permanently
					deleted. If you have any concerns or would like to export
					your data before deleting your account, please{' '}
					<Link
						to={'https://x.com/_kunalkeshan_'}
						target='_blank'
						className='underline text-textSecondary underline-offset-2'
					>
						contact support
					</Link>
					.
				</p>
			</section>
		</motion.div>
	);
};

export default DeleteAccount;
