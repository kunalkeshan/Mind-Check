/**
 * Public Layout Component
 */

// Dependencies
import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

function PublicLayout({ children }: PropsWithChildren) {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key={'public-layout'}
		>
			<Navbar />
			<div className='w-full max-w-7xl mx-auto py-24 px-8 text-textPrimary'>
				{children}
			</div>
			<Footer />
		</motion.main>
	);
}

export default PublicLayout;
