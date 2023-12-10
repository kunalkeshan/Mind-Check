/**
 * Mood Chart Component
 */

// Dependencies
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import OverallMoodChart from './OverallMoodChart';
import DateDistributedMoodChart from './DateDistributedMoodChart';
import AverageMoodScore from './AverageMoodScore';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const MoodChart = () => {
	const categories = useMemo(() => {
		return {
			Overall: { Component: OverallMoodChart },
			'Date-Distributed': { Component: DateDistributedMoodChart },
		};
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='mt-4'
		>
			<h3 className='font-heading text-xl font-bold'>Mood Chart</h3>
			<hr className='w-full' />
			<Tab.Group>
				<Tab.List
					className={
						'flex space-x-1 rounded-xl bg-textSecondary/60 p-1'
					}
				>
					{Object.keys(categories).map((category, idx) => (
						<Tab
							key={idx}
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-sm font-semibold leading-5',
									'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-white text-blue-700 shadow'
										: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
				<AverageMoodScore />
				<Tab.Panels className='mt-8 flex items-center justify-center'>
					{Object.values(categories).map((category, idx) => (
						<Tab.Panel
							key={idx}
							className={classNames(
								'rounded-xl p-3',
								'focus:outline-none focus:ring-2'
							)}
						>
							{<category.Component />}
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</motion.div>
	);
};

export default MoodChart;
