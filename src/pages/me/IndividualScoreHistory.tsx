/* eslint-disable no-mixed-spaces-and-tabs */
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FirebaseDb } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useUserStore } from '../../store/user';
import { useMemo } from 'react';
import FEEDBACKS, { FEEDBACKS_LENGTH } from '../../data/feedback';
import QUESTIONS from '../../data/questions';
import { fetchRecommendedResources } from '../../utils/resources';
import { Resource } from '../../data/resources';
import ResourceCard from '../../components/resources/ResourceCard';
import { motion } from 'framer-motion';

function IndividualScoreHistoryPage() {
	const { historyId } = useParams();
	const { user } = useUserStore();
	const { data, isLoading, isError } = useQuery<Score>(
		['fetchIndividualScore', historyId],
		async () => {
			const scoreRef = doc(
				FirebaseDb,
				'users',
				user?.uid as string,
				'scores',
				historyId as string
			);
			const res = await getDoc(scoreRef);
			if (!res.exists) throw new Error('Unable to fetch with given id');
			const docData = res.data();
			const time = new Intl.DateTimeFormat('en-US', {
				dateStyle: 'full',
				timeStyle: 'full',
			}).format(docData?.time.toDate());
			return { id: res.id, ...docData, time } as Score;
		}
	);

	const feedbackOnScore = useMemo(() => {
		const fb = FEEDBACKS.find((feedback) => {
			if (
				data &&
				data.calculatedScore >= feedback.range.min &&
				data.calculatedScore <= feedback.range.max
			) {
				return true;
			}
		});
		return fb?.feedback[Math.floor(Math.random() * FEEDBACKS_LENGTH)];
	}, [data]);

	const recommendedResources = useMemo(() => {
		let reads: Resource[] = [];
		if (data && data.score) {
			reads = fetchRecommendedResources(data.score);
			reads = [...new Set(reads)];
		}
		return reads;
	}, [data]);

	return (
		<div className='w-full flex flex-col items-center gap-4 mt-4'>
			{isLoading
				? 'Loading...'
				: isError
				? 'Unable to get score history...'
				: data && (
						<>
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, type: 'spring' }}
								viewport={{ once: true }}
								key={'IndividualScorePage-TotalScoreSection'}
								className='flex flex-col items-center text-justify gap-6 max-w-2xl mx-auto mt-6'
							>
								<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
									Your Score History
								</h1>
								<span>Test Taken on: {data.time}</span>
								<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
									Discover your mental well-being with a
									personalized score and helpful feedback.
								</h2>
								<div
									className={`${
										data.calculatedScore >= 0 &&
										data.calculatedScore <= 33
											? 'border-green-500 text-green-500'
											: data.calculatedScore >= 34 &&
											  data.calculatedScore <= 66
											? 'border-orange-500 text-orange-500'
											: 'border-red-500 text-red-500'
									} w-40 h-40 border-8 text-4xl flex items-center justify-center font-bold font-heading rounded-full`}
								>
									{data.calculatedScore}{' '}
									<span className='text-sm'>/100</span>
								</div>
								<p className='text-xl font-semibold'>
									{feedbackOnScore}
								</p>
								<p>
									<b>Note:</b> If you experience persistent
									scores above 10 or have any suicidal
									feelings, it's important to seek
									professional treatment and consult with a
									mental health professional immediately.
								</p>
								<p>
									Remember, the app is designed to provide
									guidance and support, but it's not a
									substitute for professional help.
								</p>
							</motion.section>
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, type: 'spring' }}
								viewport={{ once: true }}
								key={
									'IndividualScorePage-IndividualScoreSection'
								}
								className='flex flex-col items-center text-justify gap-6 max-w-6xl mx-auto mt-6'
							>
								<h2 className='font-heading text-2xl md:text-4xl font-bold text-center'>
									Individual Question Answer
								</h2>
								<h3 className='text-base md:text-xl font-medium text-center max-w-2xl mx-auto mt-4'>
									Your answer for each question part of this
									test.
								</h3>
								<div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-8'>
									{Object.keys(data.score).map((key, idx) => (
										<div
											key={`${key}-${idx}`}
											className='w-full mt-4 text-base md:text-lg'
										>
											<h4 className='text-lg md:text-2xl font-semibold'>
												{key}
											</h4>
											<ul className='mt-1'>
												{Object.keys(
													data.score[
														key as keyof Score['score']
													]
												).map((questionId, idx) => (
													<li
														key={`${questionId}-${idx}`}
														className='mt-1 border-b gap-2 md:gap-8 flex md:items-center justify-between flex-col md:flex-row'
													>
														<span>
															Q.{' '}
															{
																QUESTIONS[
																	key as keyof Score['score']
																].find(
																	(
																		QUESTION
																	) =>
																		QUESTION.id ===
																		parseInt(
																			questionId
																		)
																)?.question
															}
														</span>
														<span>
															Your answer:{' '}
															{
																data.score[
																	key as keyof Score['score']
																][
																	questionId as unknown as keyof ScoreValue
																]
															}
														</span>
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</motion.section>
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, type: 'spring' }}
								viewport={{ once: true }}
								key={
									'IndividualScorePage-RecommendedReadsSection'
								}
								className='flex flex-col items-center text-justify gap-6 max-w-6xl mx-auto mt-6'
							>
								<h2 className='font-heading text-2xl md:text-4xl font-bold text-center'>
									Recommended Reads
								</h2>
								<h3 className='text-base md:text-xl font-medium text-center max-w-2xl mx-auto mt-4'>
									Based on your test score and results, try
									reading this for a better perspective.
								</h3>
								{recommendedResources.length === 0 ? (
									<div className='text-base md:text-lg flex flex-col items-center text-center'>
										<p>
											Your scores are below the threshold!
											Keep up the positive outlook and
											continue taking care of your mental
											well-being.
										</p>
										<Link
											to={'/resources'}
											className='text-textSecondary underline underline-offset-4 font-heading text-xl'
										>
											Interested in resources? Check this
											out.
										</Link>
									</div>
								) : (
									<div className='w-full flex flex-col items-center justify-center gap-4'>
										<div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
											{recommendedResources.map(
												(resource, index) => (
													<ResourceCard
														index={index}
														resource={resource}
														key={resource.title}
													/>
												)
											)}
										</div>
										<Link
											to={'/resources'}
											className='text-textSecondary underline underline-offset-4 font-heading text-xl'
										>
											Interested in resources? Check this
											out.
										</Link>
									</div>
								)}
							</motion.section>
						</>
				  )}
		</div>
	);
}

export default IndividualScoreHistoryPage;
