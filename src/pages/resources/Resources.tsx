import { Outlet } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';

function Resources() {
	return (
		<PublicLayout>
			<Outlet />
		</PublicLayout>
	);
}

export default Resources;
