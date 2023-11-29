/**
 * Journal Entry Component
 * Used for entries of an day with edit option.
 */

// Dependencies
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Delete, Edit, Check } from 'lucide-react';
import { useUserStore } from '../../../store/user';
import { FirebaseDb } from '../../../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MOODS from '../../../data/moods';

type JournalEntryProps = React.ComponentProps<'div'> & {
	journal: Journal;
};

const JournalEntry: React.FC<JournalEntryProps> = ({ journal }) => {
	const inputRef = useRef<HTMLTextAreaElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState(
		journal.type === 'journal' ? journal.journal : ''
	);
	const [allowEdit, setAllowEdit] = useState(false);
	const { user } = useUserStore();

	const mood = useMemo(() => {
		if (journal.type === 'mood') {
			const data = MOODS.find((m) => m.id === journal.mood);
			return data;
		}
		return null;
	}, [journal]);

	const isInputChanged = useMemo(() => {
		if (journal.type === 'journal') {
			return input.trim() !== journal.journal;
		}
		return false;
	}, [input, journal]);

	const handleToogleEdit = () => {
		setAllowEdit(!allowEdit);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleResetInput = () => {
		setInput(journal.type === 'journal' ? journal.journal : '');
		setAllowEdit(false);
	};

	const handleDeleteJournalEntry = async () => {
		setLoading(true);
		try {
			const docRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'journals',
				journal.id
			);
			await toast.promise(deleteDoc(docRef), {
				loading: `Deleting ${journal.type} entry...`,
				success: `${journal.type} entry deleted successfully`,
				error: `Unable to delete ${journal.type} entry. Try again later.`,
			});
		} catch (error) {
			toast.error(
				'Unable to delete entry at the moment. Try again later.'
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveJournalInput = async () => {
		setLoading(true);
		try {
			const docRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'journals',
				journal.id
			);
			await toast.promise(updateDoc(docRef, { journal: input.trim() }), {
				loading: `Deleting ${journal.type} entry...`,
				success: `${journal.type} entry deleted successfully`,
				error: `Unable to delete ${journal.type} entry. Try again later.`,
			});
			setAllowEdit(false);
		} catch (error) {
			toast.error(
				'Unable to save journal entry at the moment. Try again later.'
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (allowEdit) {
			const inputEle = inputRef.current;
			if (inputEle) inputEle.focus();
		}
	}, [allowEdit]);

	return (
		<div className='flex flex-col lg:flex-row gap-2 overflow-hidden h-auto'>
			{journal.type === 'journal' ? (
				<section className='w-full px-2'>
					<h4 className='font-heading text-lg font-semibold capitalize'>
						Journal entry
					</h4>
					<hr className='w-full' />
					{allowEdit ? (
						<textarea
							className='text-lg px-2 resize-y min-h-[2rem] max-h-20 min-w-full overflow-y-auto border border-textPrimary'
							value={input}
							disabled={!allowEdit}
							ref={inputRef}
							onChange={handleInputChange}
						/>
					) : (
						<div>{journal.journal}</div>
					)}
					{isInputChanged ? (
						<button
							onClick={handleResetInput}
							className='text-xs text-red-500/80 font-semibold underline underline-offset-2 hover:text-red-500 transition-all ml-4'
						>
							Reset
						</button>
					) : null}
				</section>
			) : (
				<section className='w-full px-2'>
					<h4 className='font-heading text-lg font-semibold capitalize'>
						Mood entry
					</h4>
					<hr className='w-full' />
					{mood ? (
						<p className='text-lg'>
							<span className='text-2xl'>{mood.emoji}</span> -
							feeling {mood.mood}
						</p>
					) : null}
				</section>
			)}
			<section className='flex flex-col gap-2 transition-all duration-300 relative translate-x-full h-0 group-hover:translate-x-0 group-focus-within:translate-x-0 group-focus:translate-x-0 group-focus-visible:translate-x-0 group-hover:h-auto group-focus-within:h-auto group-focus:h-auto group-focus-visible:h-auto'>
				<button
					onClick={handleDeleteJournalEntry}
					disabled={loading}
					className={`${
						loading ? 'grayscale' : ''
					} flex items-center gap-2 px-2 py-1 rounded-xl border border-red-500 w-full justify-center text-xs hover:bg-red-500 hover:text-white transition-all font-semibold text-red-500`}
				>
					<Delete size={16} /> <span>delete</span>
				</button>
				{journal.type === 'journal' ? (
					<button
						onClick={handleToogleEdit}
						disabled={loading}
						className={`${
							loading
								? 'grayscale'
								: allowEdit
								? 'bg-textPrimary text-white'
								: ''
						} flex items-center gap-2 px-2 py-1 rounded-xl border border-textPrimary w-full justify-center text-xs hover:bg-textPrimary hover:text-white transition-all font-semibold`}
					>
						<Edit size={16} />{' '}
						<span>{allowEdit ? 'cancel' : 'edit'}</span>
					</button>
				) : null}
				{journal.type === 'journal' && isInputChanged ? (
					<button
						onClick={handleSaveJournalInput}
						disabled={loading}
						className={`${
							loading ? 'grayscale' : ''
						} flex items-center gap-2 px-2 py-1 rounded-xl border border-green-500 w-full justify-center text-xs hover:bg-green-500 text-green-500 hover:text-white transition-all font-semibold`}
					>
						<Check size={16} /> <span>save</span>
					</button>
				) : null}
			</section>
		</div>
	);
};

export default JournalEntry;
