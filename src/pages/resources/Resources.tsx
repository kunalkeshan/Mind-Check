import { Outlet, useLocation } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';

function Resources() {
	const location = useLocation();
	return (
		<PublicLayout>
			<p>{location.pathname}</p>
			<Outlet />
		</PublicLayout>
	);
}

export default Resources;
