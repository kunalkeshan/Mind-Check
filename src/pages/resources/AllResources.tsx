import { useQuery } from 'react-query';
import { fetchAllResources } from '../../utils/resources';
import { Link } from 'react-router-dom';
import ResourceCard from '../../components/resources/ResourceCard';

function AllResources() {
	const { data, isError, isLoading } = useQuery(
		['fetchAllResources'],
		fetchAllResources
	);

	console.log(data);

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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{data?.map((resource) => (
						<ResourceCard resource={resource} key={resource.url} />
					))}
				</div>
			)}
		</div>
	);
}

export default AllResources;
