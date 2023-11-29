/**
 * Score History Filter Component
 */

// Dependencies
import React from 'react';
import DateFilter from './DateFilter';
import DateOrder from './DateOrder';
import ScoreRange from './ScoreRange';
import ScoreOrder from './ScoreOrder';

type ScoreFilterProrps = React.ComponentProps<'section'> & {
	filter: ScoreHistoryFilter;
	setFilter: React.Dispatch<React.SetStateAction<ScoreHistoryFilter>>;
};

const ScoreFilter: React.FC<ScoreFilterProrps> = ({ filter, setFilter }) => {
	return (
		<section className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 z-30 sticky top-[4.5rem] bg-primary py-4'>
			<DateFilter filter={filter} setFilter={setFilter} />
			<DateOrder filter={filter} setFilter={setFilter} />
			<ScoreRange filter={filter} setFilter={setFilter} />
			<ScoreOrder filter={filter} setFilter={setFilter} />
		</section>
	);
};

export default ScoreFilter;
