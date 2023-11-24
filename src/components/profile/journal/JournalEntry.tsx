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

	return journal.type === 'journal' ? (
		<div>
			<h4 className='font-heading text-lg font-semibold capitalize'>
				Journal entry
			</h4>
			<hr className='w-full' />
			<p>{journal.journal}</p>
		</div>
	) : (
		<div>
			<h4 className='font-heading text-lg font-semibold capitalize'>
				Mood entry
			</h4>
			<hr className='w-full' />
			{mood ? (
				<p>
					{mood.emoji} - feeling {mood.mood}
				</p>
			) : null}
		</div>
	);
};

export default JournalEntry;
