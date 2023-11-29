/**
 * Empty List Component
 * Used to show when lists are empty
 */

// Dependencies
import React from 'react';

type EmptyListProps = React.ComponentProps<'div'> & {
	data: {
		title: string;
		description: string;
	};
};

const EmptyList: React.FC<EmptyListProps> = ({ data }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl mx-auto gap-8 md:gap-4 mt-8'>
			<div className='w-full'>
				<img
					src='/images/thinking.svg'
					className='w-full h-auto object-contain max-w-[60%] mx-auto'
				/>
			</div>
			<div className='flex items-center justify-center flex-col text-center'>
				<p className='text-xl md:text-3xl font-heading font-bold'>
					{data.title}
				</p>
				<p className='text-lg md:text-2xl font-medium'>
					{data.description}
				</p>
			</div>
		</div>
	);
};

export default EmptyList;
