import Features from '../components/home/Features';
import Intro from '../components/home/Intro';
import Working from '../components/home/Working';
import PublicLayout from '../components/layout/PublicLayout';

function Home() {
	return (
		<PublicLayout>
			<Intro />
			<Working />
			<Features />
		</PublicLayout>
	);
}

export default Home;
