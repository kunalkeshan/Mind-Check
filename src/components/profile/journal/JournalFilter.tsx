/**
 * Journal History Filter
 */

// Dependencies
import React from 'react';
import DateFilter from './DateFilter';
import DateOrder from './DateOrder';
import JournalTypeFilter from './JournalTypeFilter';

type JournalFilterProrps = React.ComponentProps<'section'> & {
	filter: JournalHistoryFilter;
	setFilter: React.Dispatch<React.SetStateAction<JournalHistoryFilter>>;
};

const JournalFilter: React.FC<JournalFilterProrps> = ({
	filter,
	setFilter,
}) => {
	return (
		<section className='w-full grid grid-cols-2 md:grid-cols-3 gap-4 z-30 sticky top-[4.5rem] bg-primary py-4'>
			<DateFilter filter={filter} setFilter={setFilter} />
			<DateOrder filter={filter} setFilter={setFilter} />
			<JournalTypeFilter filter={filter} setFilter={setFilter} />
		</section>
	);
};

export default JournalFilter;
