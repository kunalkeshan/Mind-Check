/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Score Page
 */

// Dependencies
import { useMemo, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FEEDBACKS, { FEEDBACKS_LENGTH } from '../data/feedback';
import ScrollToTop from '../components/reusable/ScrollToTop';
import { FirebaseAuth, FirebaseDb } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-hot-toast';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useUserStore } from '../store/user';
import { motion } from 'framer-motion';
import { Resource } from '../data/resources';
import { fetchRecommendedResources } from '../utils/resources';
import ResourceCard from '../components/resources/ResourceCard';

interface ScoreData extends Score {
	data: Score['score'];
}

function Score() {
	const { user } = useUserStore();
	const navigate = useNavigate();
	const [loginLoading, setLoginLoading] = useState(false);
	const { setUser } = useUserStore();

	const score: ScoreData = useMemo(() => {
		if (
			(sessionStorage.getItem('MindCheckUserScore.v2') as string) !== null
		) {
			const data = JSON.parse(
				sessionStorage.getItem('MindCheckUserScore.v2') as string
			);
			return data;
		}
		return false;
	}, []);

	const feedbackOnScore = useMemo(() => {
		const data = FEEDBACKS.find((feedback) => {
			if (
				score.calculatedScore >= feedback.range.min &&
				score.calculatedScore <= feedback.range.max
			) {
				return true;
			}
		});
		return data?.feedback[Math.floor(Math.random() * FEEDBACKS_LENGTH)];
	}, [score]);

	const recommendedResources = useMemo(() => {
		let reads: Resource[] = [];
		if (score) {
			reads = fetchRecommendedResources(score.data);
		}
		return reads;
	}, [score]);

	useLayoutEffect(() => {
		if (!score) navigate('/test');
	}, [navigate, score]);

	const handleTakeAnotherTest = () => {
		sessionStorage.removeItem('MindCheckUserScore.v2');
	};

	const handleLoginAndSaveTestScore = async () => {
		const provider = new GoogleAuthProvider();
		try {
			setLoginLoading(true);
			const response = await signInWithPopup(FirebaseAuth, provider);
			const scoresRef = doc(
				FirebaseDb,
				'users',
				response.user.uid,
				'scores',
				nanoid()
			);
			setUser(response.user);
			setDoc(scoresRef, {
				calculatedScore: score.calculatedScore,
				score: score.data,
				time: Timestamp.now(),
			});
			toast.success('Scores saved, go to your profile to learn more.');
		} catch (error) {
			if (error instanceof FirebaseError) {
				switch (error.code) {
					case 'auth/popup-closed-by-user': {
						toast.error(
							'Do not close popup before selecting email.'
						);
						break;
					}
					default: {
						toast.error('Unable to login. Try again later.');
						break;
					}
				}
			}
		} finally {
			setLoginLoading(false);
		}
	};

	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key={'score-page'}
		>
			<nav className='fixed top-0 left-0 py-4 px-8 z-50 bg-primary w-full text-textPrimary'>
				<div className='max-w-7xl mx-auto flex items-center justify-between md:justify-normal w-full md:gap-8'>
					<Link
						to={'/'}
						className='flex w-fit items-center gap-1 hover:scale-[0.98] active:scale-[1.02] transition-all'
					>
						<div className='w-10 h-10'>
							<img
								src='/mind-check-logo.png'
								alt='🧠'
								className='w-full h-auto object-contain'
								loading='lazy'
							/>
						</div>
						<p className='font-heading text-3xl font-bold'>
							Mind Check
						</p>
					</Link>
				</div>
			</nav>
			<div className='w-full max-w-7xl mx-auto py-12 px-8 flex flex-col mt-12'>
				<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
					Your Mental Health Score
				</h1>
				<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
					Discover your mental well-being with a personalized score
					and helpful feedback.
				</h2>

				<section className='flex flex-col items-center text-center gap-6 max-w-2xl mx-auto mt-6'>
					<div
						className={`${
							score.calculatedScore >= 0 &&
							score.calculatedScore <= 33
								? 'border-green-500 text-green-500'
								: score.calculatedScore >= 34 &&
								  score.calculatedScore <= 66
								? 'border-orange-500 text-orange-500'
								: 'border-red-500 text-red-500'
						} w-40 h-40 border-8 text-4xl flex items-center justify-center font-bold font-heading rounded-full`}
					>
						{score.calculatedScore}{' '}
						<span className='text-sm'>/100</span>
					</div>
					<p className='text-xl font-semibold'>{feedbackOnScore}</p>
					<p>
						<b>Note:</b> If you experience persistent scores above
						10 or have any suicidal feelings, it's important to seek
						professional treatment and consult with a mental health
						professional immediately.
					</p>
					<p>
						Remember, the app is designed to provide guidance and
						support, but it's not a substitute for professional
						help.
					</p>
					<Link
						to='/test'
						className='px-8 py-4 mx-auto border-secondary border-2 mt-4 w-full rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
						onClick={handleTakeAnotherTest}
					>
						Take another test.
					</Link>
					{user ? (
						<Link
							to='/me'
							className='hover:underline text-textSecondary'
							onClick={handleTakeAnotherTest}
						>
							View profile and past scores.
						</Link>
					) : (
						<button
							title='Login using google.'
							disabled={loginLoading}
							className={`${
								loginLoading
									? 'text-gray-500 cursor-default'
									: ''
							} hover:underline text-textSecondary`}
							onClick={handleLoginAndSaveTestScore}
						>
							Login to save score.
						</button>
					)}
				</section>
				<section className='flex flex-col items-center text-justify gap-6 max-w-6xl mx-auto mt-6'>
					<h2 className='font-heading text-2xl md:text-4xl font-bold text-center'>
						Recommended Reads
					</h2>
					<h3 className='text-base md:text-xl font-medium text-center max-w-2xl mx-auto mt-4'>
						Based on your test score and results, try reading this
						for a better perspective.
					</h3>
					{recommendedResources.length === 0 ? (
						<div className='text-base md:text-lg flex flex-col items-center text-center'>
							<p>
								Your scores are below the threshold! Keep up the
								positive outlook and continue taking care of
								your mental well-being.
							</p>
							<Link
								to={'/resources'}
								className='text-textSecondary underline underline-offset-4 font-heading text-xl'
							>
								Interested in resources? Check this out.
							</Link>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
							{recommendedResources.map((resource, index) => (
								<ResourceCard
									index={index}
									resource={resource}
									key={resource.title}
								/>
							))}
						</div>
					)}
				</section>
			</div>
			<ScrollToTop />
		</motion.main>
	);
}

export default Score;
