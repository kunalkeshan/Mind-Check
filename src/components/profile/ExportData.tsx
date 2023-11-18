import { FirebaseDb } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useUserStore } from '../../store/user';
import { motion } from 'framer-motion';
import QUESTIONS from '../../data/questions';

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

	const handleExportAsJson = async () => {
		if (!data) return;
		const normalizedData = data
			.filter((score) => typeof score.score !== 'undefined')
			.map((score) => {
				const scores: Record<
					string,
					{ category: string; score: number }
				> = {};
				Object.keys(score.score).forEach((key) => {
					Object.keys(
						score.score[key as keyof Score['score']]
					).forEach((questionId) => {
						const question = QUESTIONS[
							key as keyof Score['score']
						].find(
							(QUESTION) => QUESTION.id === parseInt(questionId)
						)?.question;
						const answer =
							score.score[key as keyof Score['score']][
								questionId as unknown as keyof ScoreValue
							];
						if (!question) return;
						scores[question] = {
							category: key,
							score: answer,
						};
					});
				});
				return {
					calculatedScore: score.calculatedScore,
					testTaken: score.time,
					scores,
				};
			});
		const exportJsonData = {
			exportedAt: new Date(),
			user: {
				name: user?.displayName,
				email: user?.email,
			},
			scores: normalizedData,
		};
		const exportJsonDataName = `${user?.displayName
			?.toLowerCase()
			.replace(/\s+/g, '-')}-score-data-${Date.now()}`;
		const dataStr =
			'data:text/json;charset=utf-8,' +
			encodeURIComponent(JSON.stringify(exportJsonData));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute(
			'download',
			exportJsonDataName + '.json'
		);
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
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
						<button className='px-4 py-2 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'>
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
