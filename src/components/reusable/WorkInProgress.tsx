/**
 * Work in Progress Component
 */

// Dependencies
import Lottie from 'lottie-react';
import MentalHealthAwarnessAnimationData from '../../assets/lottie/mental-health-awareness.json';

const WorkInProgress = () => {
	return (
		<section className='flex flex-col items-center'>
			<div className='max-w-sm'>
				<Lottie
					animationData={MentalHealthAwarnessAnimationData}
					loop={true}
					className='w-full h-auto object-contain'
				/>
			</div>
			<p className='font-heading text-2xl font-bold'>Work in Progress</p>
		</section>
	);
};

export default WorkInProgress;
