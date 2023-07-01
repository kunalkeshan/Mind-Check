import React, { useMemo } from 'react';
import { Timestamp } from 'firebase/firestore';
import FEEDBACKS from '../../data/feedback';

interface Score {
	id: string;
	calculatedScore: number;
	time: Timestamp;
}

const HistoryCard: React.FC<Score> = ({ calculatedScore, time }) => {
	const feedbackOnScore = useMemo(() => {
		const data = FEEDBACKS.find((feedback) => {
			if (
				calculatedScore >= feedback.range.min &&
				calculatedScore <= feedback.range.max
			) {
				return true;
			}
		});
		return data?.feedback;
	}, [calculatedScore]);
	return (
		<div className='w-full bg-tertiary border border-secondary rounded-xl px-8 py-4 flex flex-col md:flex-row md:justify-between gap-4 items-center transition-all hover:border-secondaryDark hover:-translate-y-1 hover:shadow-md select-none'>
			<div
				className={`${
					calculatedScore >= 0 && calculatedScore <= 33
						? 'border-green-500 text-green-500'
						: calculatedScore >= 34 && calculatedScore <= 66
						? 'border-orange-500 text-orange-500'
						: 'border-red-500 text-red-500'
				} w-12 md:w-20 h-12 md:h-20 border-2 md:border-4 text-base md:text-xl flex items-center justify-center font-bold font-heading rounded-full`}
			>
				{calculatedScore}{' '}
				<span className='text-xs md:text-sm'>/100</span>
			</div>
			<p className='w-full md:max-w-[60%] text-justify text-sm md:text-base'>
				{feedbackOnScore}
			</p>
			<p className='text-sm md:text-base'>
				Test Taken: {time as unknown as string}
			</p>
		</div>
	);
};

export default HistoryCard;
