/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Journal History Card Component
 */

// Dependencies
import React from 'react';
import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';
import MOODS from '../../../data/moods';

type JournalHistoryCardProps = React.ComponentProps<'div'> & {
	data: Journal;
	index: number;
};

const JournalHistoryCard: React.FC<JournalHistoryCardProps> = ({
	index,
	data,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			whileInView={{ opacity: 1, scale: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				delay: 0.05 * (index + 1),
				type: 'keyframes',
				duration: 0.2,
			}}
		>
			<div className='w-full h-full bg-tertiary border border-secondary rounded-xl px-8 py-4 flex flex-col md:flex-row md:justify-between gap-8 items-center transition-all hover:border-secondaryDark hover:-translate-y-1 hover:shadow-md select-none'>
				<div className='flex flex-col items-center justify-center gap-2'>
					<div
						className={`w-12 md:w-20 h-12 md:h-20 border-2 md:border-4 text-base md:text-3xl flex items-center justify-center font-bold font-heading rounded-full`}
					>
						{data.type === 'mood' ? (
							MOODS.find((mood) => mood.id === data.mood)?.emoji
						) : (
							<Pen />
						)}
					</div>
					<span className='text-xs md:text-sm font-heading font-bold'>
						{data.type.toUpperCase()}
					</span>
				</div>
				<p className='w-full text-center text-sm md:text-base'>
					{data.type === 'mood'
						? `feeling ${
								MOODS.find((mood) => mood.id === data.mood)
									?.mood
						  }`
						: data.journal}
				</p>
				<p className='text-sm md:text-base max-w-[16ch]'>
					<b>Entry Taken:</b> <br /> {data.time}
				</p>
			</div>
		</motion.div>
	);
};

export default JournalHistoryCard;
