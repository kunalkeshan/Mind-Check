/**
 * Test Page - Test Section
 */

// Dependencies
import { useLayoutEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QUESTIONS from '../../data/questions';
import { useUserStore } from '../../store/user';
import { nanoid } from 'nanoid';
import { FirebaseDb } from '../../firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

function Test() {
	const { user } = useUserStore();
	const navigate = useNavigate();
	const score = useMemo(() => {
		if (
			(sessionStorage.getItem('MindCheckUserScore.v2') as string) !== null
		) {
			const data = JSON.parse(
				sessionStorage.getItem('MindCheckUserScore.v2') as string
			);
			return data.calculatedScore;
		}
		return false;
	}, []);

	const handleTestSumbmissionInFirebase = async (
		data: Score['score'],
		calculatedScore: number
	) => {
		try {
			if (user === null) {
				// Save scores anonymously
				const docRef = doc(FirebaseDb, 'anonScores', nanoid());
				setDoc(docRef, {
					score: data,
					time: Timestamp.now(),
					calculatedScore,
				});
			} else {
				// Save scores for current logged in user
				const docRef = doc(
					FirebaseDb,
					'users',
					user.uid,
					'scores',
					nanoid()
				);
				setDoc(docRef, {
					score: data,
					time: Timestamp.now(),
					calculatedScore,
				});
			}
		} catch (e) {
			// Empty
		}
	};

	const handleTestSubmission = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		let calculatedScore = 0;
		const normalizedData = {} as Score['score'];
		Object.keys(QUESTIONS).forEach((key) => {
			normalizedData[key as keyof Score['score']] = {};
			QUESTIONS[key as keyof typeof QUESTIONS].forEach((question) => {
				normalizedData[key as keyof Score['score']][question.id] =
					parseInt(
						data.get(question.question) as unknown as string,
						10
					);
				calculatedScore += parseInt(
					data.get(question.question) as unknown as string,
					10
				);
			});
		});
		handleTestSumbmissionInFirebase(normalizedData, calculatedScore);
		sessionStorage.setItem(
			'MindCheckUserScore.v2',
			JSON.stringify({ data: normalizedData, calculatedScore })
		);
		navigate('/score');
	};

	useLayoutEffect(() => {
		if (score) {
			navigate('/score');
		}
	}, [score, navigate]);

	return (
		<section className='w-full max-w-7xl mx-auto py-12 px-8 flex flex-col min-h-screen'>
			<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
				Mental Health Check
			</h1>
			<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
				Assess your well-being with a comprehensive 25-question test.
				Based on the Burns Depression Checklist from Feeling Good: the
				new mood therapy.
			</h2>
			<p className='text-sm mt-4'>
				Answer the questions from each section.{' '}
				<Link
					to='#help'
					className='md:hidden underline underline-offset-2 text-textSecondary text-opacity-80 hover:text-opacity-100'
				>
					Need help?
				</Link>
			</p>
			<div className='mt-4 flex flex-col md:flex-row gap-12'>
				<form
					className='w-full flex flex-col gap-2 col-span-2'
					onSubmit={handleTestSubmission}
				>
					{Object.keys(QUESTIONS).map((sectionName, index) => (
						<div key={`${sectionName}-${index}`} className='mt-2'>
							<h3 className='text-2xl font-heading sticky top-16 py-1 self-start bg-primary font-semibold'>
								{sectionName}
							</h3>
							<hr className='border-b' />
							{QUESTIONS[
								sectionName as keyof typeof QUESTIONS
							].map((question, index2) => (
								<div
									className='text-lg mt-1'
									key={`${question}-${index2}`}
								>
									<div className='flex gap-4 items-center justify-between'>
										<p>
											{index2 + 1}. {question.question}
										</p>
										<div className='flex gap-4 items-center'>
											<label
												key={index2}
												htmlFor={question.question
													.replace(/ /g, '-')
													.concat('-0')}
												className='flex flex-col'
											>
												<input
													type='radio'
													name={question.question}
													value={0}
													required
													id={question.question
														.replace(/ /g, '-')
														.concat('-0')}
												/>
												<span>0</span>
											</label>
											<label
												key={index2}
												htmlFor={question.question
													.replace(/ /g, '-')
													.concat('-1')}
												className='flex flex-col'
											>
												<input
													type='radio'
													name={question.question}
													value={1}
													required
													id={question.question
														.replace(/ /g, '-')
														.concat('-1')}
													className='flex flex-col'
												/>
												<span>1</span>
											</label>
											<label
												key={index2}
												htmlFor={question.question
													.replace(/ /g, '-')
													.concat('-2')}
												className='flex flex-col'
											>
												<input
													type='radio'
													name={question.question}
													value={2}
													required
													id={question.question
														.replace(/ /g, '-')
														.concat('-2')}
												/>
												<span>2</span>
											</label>
											<label
												key={index2}
												htmlFor={question.question
													.replace(/ /g, '-')
													.concat('-3')}
												className='flex flex-col'
											>
												<input
													type='radio'
													name={question.question}
													value={3}
													required
													id={question.question
														.replace(/ /g, '-')
														.concat('-3')}
												/>
												<span>3</span>
											</label>
											<label
												key={index2}
												htmlFor={question.question
													.replace(/ /g, '-')
													.concat('-4')}
												className='flex flex-col'
											>
												<input
													type='radio'
													name={question.question}
													value={4}
													required
													id={question.question
														.replace(/ /g, '-')
														.concat('-4')}
												/>
												<span>4</span>
											</label>
										</div>
									</div>
									<hr />
								</div>
							))}
						</div>
					))}
					<button
						type='submit'
						className='px-8 py-4 mx-auto border-secondary border-2 mt-4 w-full rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
					>
						Submit
					</button>
				</form>
				<div
					className='flex flex-col gap-2 sticky top-20 self-start'
					id='help'
				>
					<h3 className='text-2xl font-heading'>Help</h3>
					<hr />
					<p>
						Each question will have a point range from 0 to 4.
						Choose the number that best represents how you feel.
					</p>
					<ul className='text-sm'>
						<li>0 - not at all</li>
						<li>1 - somewhat</li>
						<li>2 - moderately</li>
						<li>3 - a lot</li>
						<li>4 - extremely</li>
					</ul>
					<Link
						to={'/'}
						className='text-textSecondary underline underline-offset-4 font-heading text-xl'
					>
						Go back home? Click here.
					</Link>
				</div>
			</div>
		</section>
	);
}

export default Test;
