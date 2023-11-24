import MoodSelection from '../../components/profile/journal/MoodSelection';
import JournalInput from '../../components/profile/journal/JournalInput';

const Journal = () => {
	return (
		<div className='w-full relative grid grid-cols-1 md:grid-cols-3 mt-8 text-left gap-8'>
			<section className='md:sticky md:top-20 h-fit'>
				<MoodSelection />
				<JournalInput />
			</section>
			<section className='md:col-span-2'></section>
		</div>
	);
};

export default Journal;
