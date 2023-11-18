import { FirebaseDb } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../store/user';
import { motion } from 'framer-motion';
import { exportDataToCsv, exportDataToJson } from '../../utils/export';

const ExportData = () => {
	const { user } = useUserStore();
	const { data, isLoading, error } = useQuery(
		'allScoresExportData',
		async () => {
			const ref = collection(
				FirebaseDb,
				'users',
				user?.uid as string,
				'scores'
			);
			const q = query(ref, orderBy('time', 'asc'));
			const data = await getDocs(q);
			const scores: Score[] = [];
			data.forEach((doc) => {
				const docData = doc.data();
				docData.time = docData.time.toDate();
				scores.push({
					id: doc.id,
					...docData,
				} as Score);
			});
			return scores;
		}
	);

	const handleExportAsCsv = async () => {
		if (!data) return;
		await exportDataToCsv({ data, user });
	};

	const handleExportAsJson = async () => {
		if (!data) return;
		await exportDataToJson({ data, user });
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='mt-4'
		>
			<h3 className='font-heading text-xl font-bold'>Export Data</h3>
			<hr className='w-full' />
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Unable to load chart...'
			) : (
				<section className='mt-4'>
					<div className='flex items-center gap-4 w-fit'>
						<button
							onClick={handleExportAsCsv}
							className='px-4 py-2 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
						>
							CSV
						</button>
						<button
							onClick={handleExportAsJson}
							className='px-4 py-2 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
						>
							JSON
						</button>
					</div>
				</section>
			)}
		</motion.div>
	);
};

export default ExportData;
