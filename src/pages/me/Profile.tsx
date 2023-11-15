/**
 * Profile Page
 */

// Dependencies
import AverageScore from '../../components/profile/AverageScore';
import ProfileCard from '../../components/profile/ProfileCard';
import TotalHistoryChart from '../../components/profile/TotalHistoryChart';

function Profile() {
	return (
		<div className='w-full relative grid grid-cols-1 md:grid-cols-3 mt-8 text-left gap-8'>
			<section className='md:sticky top-16'>
				<ProfileCard />
			</section>
			<section className='md:col-span-2'>
				<TotalHistoryChart />
				<AverageScore />
			</section>
		</div>
	);
}

export default Profile;
