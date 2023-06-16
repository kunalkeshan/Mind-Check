/**
 * Public Layout Component
 */

// Dependencies
import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function PublicLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			<main className='w-full max-w-7xl mx-auto py-24 px-8 text-textPrimary'>
				{children}
			</main>
			<Footer />
		</>
	);
}

export default PublicLayout;
