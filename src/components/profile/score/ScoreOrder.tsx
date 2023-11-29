/**
 * Score History - Score Order Filter Component
 */

// Dependencies
import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronsUpDown } from 'lucide-react';
import { CheckIcon } from 'lucide-react';

type ScoreOrderProps = React.ComponentProps<'div'> & {
	filter: ScoreHistoryFilter;
	setFilter: React.Dispatch<React.SetStateAction<ScoreHistoryFilter>>;
};

const ScoreOrder: React.FC<ScoreOrderProps> = ({ filter, setFilter }) => {
	const scoreOrderOptions: Record<
		ScoreHistoryFilter['score']['order'],
		string
	> = {
		asc: 'Ascending',
		desc: 'Descending',
		['none']: 'None',
	};

	const handleScoreOrderhange = (
		value: ScoreHistoryFilter['score']['order']
	) => {
		setFilter((prev) => {
			return {
				...prev,
				score: {
					...prev.score,
					order: value as ScoreHistoryFilter['score']['order'],
				},
			};
		});
	};

	return (
		<div className='relative'>
			<p className='text-xs md:text-sm'>filter by score order:</p>
			<Listbox
				value={filter.score.order}
				defaultValue={filter.score.order}
				onChange={handleScoreOrderhange}
			>
				<Listbox.Button className='w-full z-10  relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
					<span className='block truncate'>
						{scoreOrderOptions[filter.score.order]}
					</span>
					<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
						<ChevronsUpDown
							className='h-5 w-5 text-gray-400'
							aria-hidden='true'
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Listbox.Options className='absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
						{Object.keys(scoreOrderOptions).map((order) => (
							<Listbox.Option
								key={`score-history-score-${order}`}
								value={order}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active
											? 'bg-amber-100 text-amber-900'
											: 'text-gray-900'
									}`
								}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected
													? 'font-medium'
													: 'font-normal'
											}`}
										>
											{
												scoreOrderOptions[
													order as ScoreHistoryFilter['score']['order']
												]
											}
										</span>
										{selected ? (
											<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
												<CheckIcon
													className='h-5 w-5'
													aria-hidden='true'
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</Listbox>
		</div>
	);
};

export default ScoreOrder;
