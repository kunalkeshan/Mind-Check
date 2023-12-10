import { FirebaseDb } from '../../../firebase';
import {
	collection,
	getDocs,
	query,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../../store/user';
import { motion } from 'framer-motion';
import EmptyList from '../../reusable/EmptyList';
import {
	exportDataToCsv,
	exportDataToJson,
	validateExportThreshold,
	incrementExportThreshold,
	createDefaultExportStatusValue,
	exportDataToXml,
} from '../../../utils/export';
import toast from 'react-hot-toast';
import { useId } from 'react';

const ExportData = () => {
	const { user } = useUserStore();
	const emptyListId = useId();
	const { data, isLoading, error, refetch } = useQuery(
		'allScoresExportData',
		async () => {
			// Scores Data
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

			const journalsRef = query(
				collection(
					FirebaseDb,
					'users',
					user?.uid as string,
					'journals'
				),
				orderBy('time', 'asc')
			);
			const journalsData = await getDocs(journalsRef);
			const journals = journalsData.docs.map((doc) => {
				const docData = doc.data();
				docData.time = docData.time.toDate();
				return {
					id: doc.id,
					...docData,
				} as Journal;
			});

			// Exports Data
			const currentDate = new Date()
				.toDateString()
				.toLowerCase()
				.replace(/\s+/g, '-');
			const exportsRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'exports',
				currentDate
			);
			const exports = await getDoc(exportsRef);
			const exportStatus = (exports.data() ??
				createDefaultExportStatusValue()) as ExportStatus;
			return { scores, exportStatus, journals };
		}
	);

	const handleExportAsCsv = async () => {
		const category = 'csv';
		try {
			if (!data) return;
			await validateExportThreshold({ user, category });
			await exportDataToCsv({
				data: data.scores,
				user,
				journals: data.journals,
			});
			await incrementExportThreshold({ user, category });
			await refetch({ queryKey: 'allScoresExportData' });
			return Promise.resolve();
		} catch (error) {
			if (typeof error === 'string') {
				if (error === 'export/threshold-crossed') {
					return Promise.reject(
						`You've crossed your export limit for ${category} exports!`
					);
				} else if (error === 'export/threshold-check-error') {
					return Promise.reject(
						`Something went wrong! Please try again later.`
					);
				}
			} else {
				return Promise.reject(
					`Something went wrong! Please try again later.`
				);
			}
		}
	};

	const handleExportAsJson = async () => {
		const category = 'json';
		try {
			if (!data) return;
			await validateExportThreshold({ user, category });
			await exportDataToJson({
				data: data.scores,
				user,
				journals: data.journals,
			});
			await incrementExportThreshold({ user, category });
			await refetch({ queryKey: 'allScoresExportData' });
		} catch (error) {
			if (typeof error === 'string') {
				if (error === 'export/threshold-crossed') {
					return Promise.reject(
						`You've crossed your export limit for ${category} exports!`
					);
				} else if (error === 'export/threshold-check-error') {
					return Promise.reject(
						`Something went wrong! Please try again later.`
					);
				}
			} else {
				return Promise.reject(
					`Something went wrong! Please try again later.`
				);
			}
		}
	};

	const handleExportAsXml = async () => {
		const category = 'xml';
		try {
			if (!data) return;
			await validateExportThreshold({ user, category });
			await exportDataToXml({
				data: data.scores,
				user,
				journals: data.journals,
			});
			await incrementExportThreshold({ user, category });
			await refetch({ queryKey: 'allScoresExportData' });
		} catch (error) {
			if (typeof error === 'string') {
				if (error === 'export/threshold-crossed') {
					return Promise.reject(
						`You've crossed your export limit for ${category} exports!`
					);
				} else if (error === 'export/threshold-check-error') {
					return Promise.reject(
						`Something went wrong! Please try again later.`
					);
				}
			} else {
				return Promise.reject(
					`Something went wrong! Please try again later.`
				);
			}
		}
	};

	const isExportPossible = data
		? data.journals.length > 0 || data.scores.length > 0
		: false;

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
				'Unable to export at the moment...'
			) : isExportPossible ? (
				<section className='mt-4'>
					<div className='flex items-center gap-4 w-fit'>
						<button
							onClick={() =>
								toast.promise(handleExportAsCsv(), {
									loading:
										'Collecting data and converting to csv format',
									success: 'csv data successfully exported',
									error: (value) => value,
								})
							}
							className='px-4 py-2 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
						>
							CSV
						</button>
						<button
							onClick={() =>
								toast.promise(handleExportAsJson(), {
									loading:
										'Collecting data and converting to json format',
									success: 'json data successfully exported',
									error: (value) => value,
								})
							}
							className='px-4 py-2 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
						>
							JSON
						</button>
						<button
							onClick={() =>
								toast.promise(handleExportAsXml(), {
									loading:
										'Collecting data and converting to xml format',
									success: 'xml data successfully exported',
									error: (value) => value,
								})
							}
							className='px-4 py-2 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
						>
							XML
						</button>
					</div>
					<div className='w-full mt-4 text-justify text-sm md:text-base'>
						<h4>
							<b>Note on Data Export Limits:</b>
						</h4>
						<p>
							Please be aware that your data can only be exported
							three times a day for each category. Once
							downloaded, you are solely responsible for the
							handling of your data. Any breach or misconduct with
							the data is not the responsibility of our platform.
							By initiating a download, you explicitly accept
							these conditions.
						</p>
						<h4 className='mt-2'>
							<i>Current Download Limits:</i>
						</h4>
						<ul className='list-disc ml-4'>
							<li>
								<b>For CSV:</b>{' '}
								{3 - (data?.exportStatus.csv ?? 0)} out of 3
								download limits left.
							</li>
							<li>
								<b>For JSON:</b>{' '}
								{3 - (data?.exportStatus.json ?? 0)} out of 3
								download limits left.
							</li>
							<li>
								<b>For XML:</b>{' '}
								{3 - (data?.exportStatus.xml ?? 0)} out of 3
								download limits left.
							</li>
						</ul>
					</div>
				</section>
			) : (
				<EmptyList
					key={emptyListId}
					data={{
						title: 'No journal or test entries made!',
						description:
							'Take a test or make an jouranl entry to get data export option.',
					}}
				/>
			)}
		</motion.div>
	);
};

export default ExportData;
