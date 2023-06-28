/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * Score Page
 */

// Dependencies
import { useMemo, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FEEDBACKS from '../data/feedback';
import ScrollToTop from '../components/reusable/ScrollToTop';
import { useUserStore } from '../store/user';

function Score() {
	const { user } = useUserStore();
	const navigate = useNavigate();

	const score = useMemo(() => {
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
		return data?.feedback;
	}, [score]);

	useLayoutEffect(() => {
		if (!score) navigate('/test');
	}, [navigate, score]);

	const handleTakeAnotherTest = () => {
		sessionStorage.removeItem('MindCheckUserScore.v2');
	};

	return (
		<>
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
							/>
						</div>
						<p className='font-heading text-3xl font-bold'>
							Mind Check
						</p>
					</Link>
				</div>
			</nav>
			<main className='w-full max-w-7xl mx-auto py-12 px-8 flex flex-col mt-12'>
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
						<Link to='/me' className='hover:underline'>
							View profile and past scores.
						</Link>
					) : (
						<button title='Login using google.'>
							Login to save score.
						</button>
					)}
				</section>
			</main>
			<ScrollToTop />
		</>
	);
}

export default Score;
