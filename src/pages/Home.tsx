/**
 * Landing Page
 */

// Dependencies
import Features from '../components/home/Features';
import Intro from '../components/home/Intro';
import Working from '../components/home/Working';
import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';

function Home() {
	return (
		<PublicLayout>
			<Intro />
			<Working />
			<Features />
			<ScrollToTop />
		</PublicLayout>
	);
}

export default Home;
