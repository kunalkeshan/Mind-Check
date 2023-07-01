// Dependencies
import PublicLayout from '../../components/layout/PublicLayout';
import UserProfileHeader from '../../components/profile/Header';
import ScrollToTop from '../../components/reusable/ScrollToTop';
import { Outlet } from 'react-router-dom';

function Main() {
	return (
		<PublicLayout>
			<UserProfileHeader />
			<Outlet />
			<ScrollToTop />
		</PublicLayout>
	);
}

export default Main;
