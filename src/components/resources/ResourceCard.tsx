import React from 'react';
import { Resource } from '../../data/resources';
import { Link } from 'react-router-dom';
import { calculateReadingTime } from '../../utils/resources';
import { motion } from 'framer-motion';

interface ResourceCardProps {
	resource: Resource;
	index: number;
}

const MotinLink = motion(Link);

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index }) => {
	const totalReadingTime = calculateReadingTime(resource.body ?? '');

	return (
		<MotinLink
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{
				delay: 0.05 * (index + 1),
				type: 'keyframes',
				duration: 0.2,
			}}
			to={`/resources/${resource.url}`}
			className='border-2 border-secondary overflow-hidden group transition-all hover:border-secondaryDark rounded-3xl px-8 py-4 h-full select-none flex flex-col'
		>
			<h3 className='font-heading text-lg md:text-2xl font-semibold'>
				{resource.title}
			</h3>
			<p className='text-xs'>
				By <b>{resource.author.name}</b>, published on{' '}
				<b>{new Date(resource.published).toLocaleDateString()}</b>
			</p>
			<p className='text-xs'>{totalReadingTime} min read</p>
			<div className='w-[160px] h-[160px] p-4 flex items-center justify-center mx-auto relative my-4'>
				<img
					src={resource.image}
					alt={resource.title}
					className='w-full h-auto object-contain z-10 group-hover:scale-95 transition-all duration-700'
					loading='lazy'
				/>
				<div className='bg-secondary rounded-full w-[160px] h-[160px] group-hover:w-[500%] group-hover:h-[500%] bg-opacity-40 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 transition-all duration-300' />
			</div>
			<p className='text-sm mb-4'>
				{resource.description.slice(0, 120)}... Read more →
			</p>
			<ul className='mt-auto flex items-center gap-2'>
				{resource.tags.map((tag) => (
					<li
						title={tag}
						key={`${resource.url}-${tag}`}
						className='text-textPrimary max-w-[12] text-ellipsis overflow-hidden whitespace-nowrap px-2 py-1 w-fit rounded-full border border-textSecondary font-heading group-hover:bg-textSecondary bg-opacity-20 group-hover:text-white duration-300 transition-all font-bold text-sm'
					>
						{tag}
					</li>
				))}
			</ul>
		</MotinLink>
	);
};

export default ResourceCard;
