/**
 * Not Found Page
 */

// Dependencies
import Lottie from 'lottie-react';
import YogaMentalHealthAnimationData from '../assets/lottie/yogamental-health.json';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';

function NotFound() {
	return (
		<PublicLayout>
			<section className='flex flex-col items-center jusitfy-center gap-8 text-center'>
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
					The page you are looking for doesn't exist or has been moved
				</h2>
				<Link
					to='/'
					className='px-8 py-4 w-fit border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
				>
					Go Home
				</Link>
			</section>
			<ScrollToTop />
		</PublicLayout>
	);
}

export default NotFound;
