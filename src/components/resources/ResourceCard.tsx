import React from 'react';
import { Resource } from '../../data/resources';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
	resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
	return (
		<Link
			to={`/resources/${resource.url}`}
			className='border-2 border-secondary overflow-hidden group transition-all hover:border-secondaryDark rounded-3xl px-8 py-4 h-full select-none hover:-translate-y-2 hover:-translate-x-2'
		>
			<h3 className='font-heading text-lg md:text-2xl font-semibold'>
				{resource.title}
			</h3>
			<p className='text-xs'>
				Published: {new Date(resource.published).toLocaleDateString()}
			</p>
			<div className='w-[160px] h-[160px] p-4 flex items-center justify-center mx-auto relative my-4'>
				<img
					src={resource.image}
					alt={resource.title}
					className='w-full h-auto object-contain z-10 group-hover:scale-95 transition-all duration-700'
				/>
				<div className='bg-secondary rounded-full w-[160px] h-[160px] group-hover:w-[500%] group-hover:h-[500%] bg-opacity-40 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 transition-all duration-300' />
			</div>
			<p className='text-sm'>
				{resource.description.slice(0, 120)}... Read more →
			</p>
			<ul className='mt-4'>
				{resource.tags.map((tag) => (
					<li
						key={`${resource.url}-${tag}`}
						className='text-textPrimary px-2 py-1 rounded-full border border-textSecondary font-heading group-hover:bg-textSecondary bg-opacity-20 group-hover:text-white duration-300 transition-all font-bold text-sm w-fit'
					>
						{tag}
					</li>
				))}
			</ul>
		</Link>
	);
};

export default ResourceCard;
