import React, { useMemo } from 'react';
import MOODS from '../../../data/moods';

type JournalEntryProps = React.ComponentProps<'div'> & {
	journal: Journal;
};

const JournalEntry: React.FC<JournalEntryProps> = ({ journal }) => {
	const mood = useMemo(() => {
		if (journal.type === 'mood') {
			const data = MOODS.find((m) => m.id === journal.mood);
			return data;
		}
		return null;
	}, [journal]);

	return (
		<div>
			{journal.type === 'journal' ? (
				<>
					<h4 className='font-heading text-lg font-semibold capitalize'>
						Journal entry
					</h4>
					<hr className='w-full' />
					<p className='text-lg'>{journal.journal}</p>
				</>
			) : (
				<>
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
				</>
			)}
		</div>
	);
};

export default JournalEntry;
