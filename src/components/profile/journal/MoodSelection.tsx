/**
 * Mood Selection Component
 */

// Dependencies
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { useUserStore } from '../../../store/user';
import { nanoid } from 'nanoid';
import { FirebaseDb } from '../../../firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import MOODS, { Mood } from '../../../data/moods';

const MoodSelection = () => {
	const [selectedMood, setSelectedMood] = useState<Mood['id'] | null>(null);
	const [saving, setSaving] = useState(false);
	const { user } = useUserStore();

	const handleSelectMood = (id: Mood['id']) => {
		setSelectedMood(id);
	};

	const handleResetMood = () => {
		setSelectedMood(null);
	};

	const handleSaveMood = async () => {
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
				type: 'mood',
				mood: selectedMood,
				time: Timestamp.now(),
			});
			toast.success('Mood saved successfully.');
			setSelectedMood(null);
		} catch (error) {
			toast.error('Unable to save mood now. Try again later.');
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
			className='w-full bg-tertiary rounded-xl p-4 flex flex-col items-center justify-center gap-2'
		>
			<h2 className='font-heading text-xl font-bold'>
				Please select your current mood by choosing the emoji that best
				represents how you feel right now.
			</h2>
			<hr className='w-full' />
			<div className='w-full grid grid-cols-5 gap-2 place-items-center'>
				{MOODS.map((mood) => (
					<button
						data-tooltip-id='emoji-mood-meaning'
						data-tooltip-content={mood.mood}
						key={`mood-${mood.scale}`}
						onClick={() => handleSelectMood(mood.id)}
						className={`${
							selectedMood !== null
								? mood.id === selectedMood
									? 'scale-150 rotate-12'
									: 'grayscale'
								: ''
						} text-2xl transition-all hover:scale-150 hover:rotate-12 hover:grayscale-0 w-fit`}
					>
						{mood.emoji}
					</button>
				))}
			</div>
			{selectedMood !== null ? (
				<>
					<button
						disabled={saving}
						onClick={handleSaveMood}
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
							onClick={handleResetMood}
							className='text-xs text-red-500/80 font-semibold underline underline-offset-2 hover:text-red-500 transition-all'
						>
							Reset
						</button>
					) : null}
				</>
			) : null}
			<Tooltip id='emoji-mood-meaning' place='top' />
		</motion.div>
	);
};

export default MoodSelection;
