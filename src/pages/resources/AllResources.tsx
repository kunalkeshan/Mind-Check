import { useQuery } from 'react-query';
import { fetchAllResources } from '../../utils/resources';

function AllResources() {
	const { data, error, isLoading } = useQuery(
		['fetchAllResources'],
		fetchAllResources
	);
	console.log(data, error, isLoading);
	return <div className='w-full'>AllResources</div>;
}

export default AllResources;
