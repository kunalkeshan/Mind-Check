/**
 * Score History Page
 */

// Dependencies
import PublicLayout from '../components/layout/PublicLayout';
import UserProfileHeader from '../components/profile/Header';
import ScrollToTop from '../components/reusable/ScrollToTop';
import WorkInProgress from '../components/reusable/WorkInProgress';

function ScoreHistory() {
	return (
		<PublicLayout>
			<UserProfileHeader />
			<WorkInProgress />
			<ScrollToTop />
		</PublicLayout>
	);
}

export default ScoreHistory;
