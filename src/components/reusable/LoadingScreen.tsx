import Lottie from 'lottie-react';
import LoadingScreenAnimationData from '../../assets/lottie/loading.json';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key={'loading-screen'}
			className='w-full min-h-screen flex flex-col items-center justify-center'
		>
			<div className='max-w-sm'>
				<Lottie
					animationData={LoadingScreenAnimationData}
					loop={true}
					className='w-full h-auto object-contain'
				/>
			</div>
			<p className='font-heading text-2xl font-bold'>
				Loading your peace of mind...
			</p>
		</motion.main>
	);
};

export default LoadingScreen;
