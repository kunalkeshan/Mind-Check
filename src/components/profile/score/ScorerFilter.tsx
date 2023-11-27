import React from 'react';
import DateFilter from './DateFilter';
import DateOrder from './DateOrder';
import ScoreOrder from './ScoreOrder';

type ScoreFilterProrps = React.ComponentProps<'section'> & {
	filter: ScoreHistoryFilter;
	setFilter: React.Dispatch<React.SetStateAction<ScoreHistoryFilter>>;
};

const ScoreFilter: React.FC<ScoreFilterProrps> = ({ filter, setFilter }) => {
	return (
		<section className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 z-20'>
			<DateFilter filter={filter} setFilter={setFilter} />
			<DateOrder filter={filter} setFilter={setFilter} />
			<div></div>
			<ScoreOrder filter={filter} setFilter={setFilter} />
		</section>
	);
};

export default ScoreFilter;
