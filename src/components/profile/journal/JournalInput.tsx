/**
 * Journal Input Component
 */

// Dependencies
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../../store/user';
import { nanoid } from 'nanoid';
import { FirebaseDb } from '../../../firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const JournalInput = () => {
	const [input, setInput] = useState('');
	const [saving, setSaving] = useState(false);
	const { user } = useUserStore();

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleResetInput = () => {
		setInput('');
	};

	const handleSaveJournalInput = async () => {
		setSaving(true);
		try {
			const docRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'journals',
				nanoid()
			);
			await setDoc(docRef, {
				type: 'journal',
				journal: input.trim(),
				time: Timestamp.now(),
			});
			toast.success('Journal saved successfully.');
			setInput('');
		} catch (error) {
			toast.error('Unable to save journal now. Try again later.');
		} finally {
			setSaving(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='mt-8 w-full bg-tertiary rounded-xl p-4 flex flex-col items-center justify-center gap-2'
		>
			<h2 className='font-heading text-xl font-bold'>
				If you'd like, share more about your day or how you're feeling.
				What's on your mind?
			</h2>
			<hr className='w-full' />
			<textarea
				disabled={saving}
				className={`${
					saving ? 'grayscale' : ''
				} bg-transparent border border-textPrimary rounded-xl w-full px-2 py-1 text-left resize-y overflow-y-auto min-h-[4rem] max-h-40`}
				placeholder='You can type your thoughts or leave it blank.'
				value={input}
				onChange={handleInput}
			></textarea>
			{input && input.length > 0 ? (
				<>
					<button
						disabled={saving}
						onClick={handleSaveJournalInput}
						className={`${
							saving
								? 'grayscale bg-textPrimary text-white'
								: 'hover:bg-textPrimary hover:text-white'
						} w-full px-2 py-1 rounded-xl border border-textPrimary text-sm font-semibold transition-all mt-4`}
					>
						{saving ? 'Saving...' : 'Save'}
					</button>
					{/* When Not being saved, show reset option */}
					{!saving ? (
						<button
							onClick={handleResetInput}
							className='text-xs text-red-500/80 font-semibold underline underline-offset-2 hover:text-red-500 transition-all'
						>
							Reset
						</button>
					) : null}
				</>
			) : null}
		</motion.div>
	);
};

export default JournalInput;
