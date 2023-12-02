import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchAllResources } from '../../utils/resources';
import { Link } from 'react-router-dom';
import ResourceCard from '../../components/resources/ResourceCard';
import { Resource } from '../../data/resources';

function AllResources() {
	const { data, isError, isLoading } = useQuery(['fetchAllResources'], () =>
		fetchAllResources({ sort: { by: 'date', order: 'desc' } })
	);

	const [tags, setTags] = useState({
		'Thoughts & Feelings': true,
		'Activities & Personal Relationships': true,
		'Physical Symptoms': true,
		'Suicidal Urges': true,
		General: true,
	});

	const [sortedData, setSortedData] = useState<Resource[]>([]);

	useEffect(() => {
		let updatedData: Resource[] = [];
		if (data && data?.length > 0) {
			const selectedTags = Object.keys(tags).filter(
				(tag) => tags[tag as keyof typeof tags]
			);
			updatedData = data.filter((resource) => {
				return resource.tags.filter((tag) => selectedTags.includes(tag))
					.length;
			});
			setSortedData(updatedData);
		}
	}, [data, tags]);

	const handleUpdateActiveTags = (tag: keyof typeof tags) => () => {
		setTags((prev) => {
			return { ...prev, [tag]: !prev[tag] };
		});
	};

	return (
		<div className='w-full'>
			<p className='font-heading font-semibold text-xl tracking-wide text-textSecondary'>
				/
				<Link
					to='/resources'
					className='hover:underline underline-offset-4 decoration-textSecondary'
				>
					resources
				</Link>
			</p>
			<hr className='mt-2 mb-8' />
			{isLoading ? (
				<p>Loading Resources...</p>
			) : isError ? (
				<p>Unable to fetch resources at the moment. Try again later.</p>
			) : (
				<>
					<section className='my-4'>
						<ul className='flex items-center gap-2 flex-wrap'>
							{Object.keys(tags).map((tag) => (
								<li
									title={tag}
									key={tag}
									onClick={handleUpdateActiveTags(
										tag as keyof typeof tags
									)}
									className={`${
										tags[tag as keyof typeof tags]
											? 'bg-textSecondary text-white'
											: ''
									} text-textPrimary text-ellipsis cursor-pointer hover:scale-95 overflow-hidden whitespace-nowrap px-2 py-1 w-fit rounded-full border border-textSecondary font-heading duration-300 transition-all font-bold text-sm`}
								>
									{tag}
								</li>
							))}
						</ul>
					</section>
					<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
						{sortedData?.map((resource, index) => (
							<ResourceCard
								index={index}
								resource={resource}
								key={resource.url}
							/>
						))}
					</section>
				</>
			)}
		</div>
	);
}

export default AllResources;
