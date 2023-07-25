/**
 * Not Found Page
 */

// Dependencies
import Lottie from 'lottie-react';
import YogaMentalHealthAnimationData from '../assets/lottie/yogamental-health.json';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';
import { useQuery } from 'react-query';
import { fetchAllResources } from '../utils/resources';
import ResourceCard from '../components/resources/ResourceCard';

function NotFound() {
	const { data, isError, isLoading } = useQuery(['fetchAllResources'], () =>
		fetchAllResources({ sort: { by: 'date', order: 'desc' }, limit: 6 })
	);
	return (
		<PublicLayout>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 relative'>
				<section className='flex flex-col items-center jusitfy-center gap-8 text-center h-fit md:sticky md:top-20'>
					<div className='max-w-lg'>
						<Lottie
							animationData={YogaMentalHealthAnimationData}
							loop={true}
							className='w-full h-auto object-contain'
						/>
					</div>
					<h1 className='font-heading text-3xl md:text-5xl font-bold'>
						Page Not Found
					</h1>
					<h2 className='text-lg md:text-2xl font-medium max-w-2xl'>
						The page you are looking for doesn't exist or has been
						moved
					</h2>
					<Link
						to='/'
						className='px-8 py-4 w-fit border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
					>
						Go Home
					</Link>
				</section>
				<section className='text-center md:text-left'>
					<h2 className='font-heading text-3xl md:text-5xl font-bold'>
						Meanwhile, here's some cool resources for you!
					</h2>
					{isLoading ? (
						<p>Loading Resources...</p>
					) : isError ? (
						<p>
							Unable to fetch resources at the moment. Try again
							later.
						</p>
					) : (
						<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4'>
							{data?.map((resource, index) => (
								<ResourceCard
									index={index}
									resource={resource}
									key={resource.url}
								/>
							))}
						</div>
					)}
				</section>
			</div>
			<ScrollToTop />
		</PublicLayout>
	);
}

export default NotFound;
