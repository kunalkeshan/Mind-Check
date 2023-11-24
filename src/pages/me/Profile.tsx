/**
 * Profile Page
 */

// Dependencies
import ProfileCard from '../../components/profile/profile/ProfileCard';
import TotalHistoryChart from '../../components/profile/profile/TotalHistoryChart';
import AverageScore from '../../components/profile/profile/AverageScore';
import ExportData from '../../components/profile/profile/ExportData';

function Profile() {
	return (
		<div className='w-full relative grid grid-cols-1 md:grid-cols-3 mt-8 text-left gap-8'>
			<section className='md:sticky md:top-20 h-fit'>
				<ProfileCard />
			</section>
			<section className='md:col-span-2'>
				<TotalHistoryChart />
				<AverageScore />
				<ExportData />
			</section>
		</div>
	);
}

export default Profile;
