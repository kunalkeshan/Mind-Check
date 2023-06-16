/**
 * Login Page
 */

// Dependencies
import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';
import WorkInProgress from '../components/reusable/WorkInProgress';

function Login() {
	return (
		<PublicLayout>
			<WorkInProgress />
			<ScrollToTop />
		</PublicLayout>
	);
}

export default Login;
