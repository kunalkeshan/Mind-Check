import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function PublicLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}

export default PublicLayout;
