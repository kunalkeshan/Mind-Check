/**
 * Score History - Score Range Filter Component
 */

// Dependencies
import React, { useState, useEffect } from 'react';

type ScoreRangeProps = React.ComponentProps<'div'> & {
	filter: ScoreHistoryFilter;
	setFilter: React.Dispatch<React.SetStateAction<ScoreHistoryFilter>>;
};

const MAX_TIMEOUT_BEFORE_SET_VALUE = 1000;

const ScoreRange: React.FC<ScoreRangeProps> = ({ filter, setFilter }) => {
	const [value, setValue] = useState(filter.score.range.end);

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.valueAsNumber);
	};

	useEffect(() => {
		if (value !== filter.score.range.end) {
			const timeoutId = setTimeout(() => {
				setFilter((prev) => {
					return {
						...prev,
						score: {
							...prev.score,
							range: { ...prev.score.range, end: value },
						},
					};
				});
			}, MAX_TIMEOUT_BEFORE_SET_VALUE);
			return () => clearTimeout(timeoutId);
		}
	}, [filter.score.range.end, setFilter, value]);

	return (
		<div className=''>
			<p className='text-xs md:text-sm'>filter by score range:</p>
			<div className='w-full z-20 rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex flex-col items-center justify-center'>
				<input
					type='range'
					className='w-full'
					min={0}
					max={100}
					value={value}
					onChange={handleValueChange}
				/>
				<div className='w-full text-xs flex items-center justify-between'>
					<p>0</p>
					<p className='font-bold'>{value}</p>
					<p>100</p>
				</div>
			</div>
		</div>
	);
};

export default ScoreRange;
