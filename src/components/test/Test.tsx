import { useMemo, useState } from 'react';
import QUESTIONS from '../../data/questions';
import { Link } from 'react-router-dom';

function Test() {
	const sections = useMemo(() => {
		return Object.keys(QUESTIONS);
	}, []);
	const [activeSection, setActiveSection] = useState(sections[0]);
	const [sectionQuestions, setSectionQuestions] = useState(
		QUESTIONS[activeSection as keyof typeof QUESTIONS]
	);

	const handleSectionChange = (section: string) => () => {
		setActiveSection(section);
	};
	return (
		<section className='w-full max-w-7xl mx-auto py-12 px-8 flex flex-col'>
			<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
				Mental Health Check
			</h1>
			<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
				Assess your well-being with a comprehensive 25-question test.
				Based on the Burns Depression Checklist from Feeling Good: the
				new mood therapy.
			</h2>
			<p className='text-sm mt-4'>
				Select a section to answer the questions.{' '}
				<Link
					to='#help'
					className='md:hidden underline underline-offset-2 text-textSecondary text-opacity-80 hover:text-opacity-100'
				>
					Need help?
				</Link>
			</p>
			<div className='grid grid-cols-2 text-sm font-semibold md:grid-cols-4 text-textPrimary gap-4 mt-2'>
				{sections.map((section, index) => (
					<button
						key={index}
						onClick={handleSectionChange(section)}
						className={`${
							activeSection === section
								? 'bg-opacity-100 border-textPrimary'
								: 'bg-opacity-60 border-tertiary'
						} bg-secondary hover:bg-secondaryDark rounded-xl border-2 px-4 py-2 transition-all`}
					>
						{section}
					</button>
				))}
			</div>
			<div className='mt-4 flex gap-4 flex-col md:flex-row'>
				<div className='w-full flex flex-col gap-2'>
					<h3 className='text-2xl font-heading'>{activeSection}</h3>
					<hr />
					<ul className='text-lg flex flex-col gap-2'>
						{sectionQuestions.map((question, index) => (
							<li
								key={index}
								className='grid gird-cols-1 md:grid-cols-2'
							>
								<div>
									{index + 1}. {question.question}
								</div>
								<div className='flex gap-4 items-center mt-1 md:mt-0'>
									<span className='text-xs flex flex-col justify-center items-center'>
										<input
											type='radio'
											name={question.question}
											value={0}
										/>
										<p>0</p>
									</span>
									<span className='text-xs flex flex-col justify-center items-center'>
										<input
											type='radio'
											name={question.question}
											value={1}
										/>
										<p>1</p>
									</span>
									<span className='text-xs flex flex-col justify-center items-center'>
										<input
											type='radio'
											name={question.question}
											value={2}
										/>
										<p>2</p>
									</span>
									<span className='text-xs flex flex-col justify-center items-center'>
										<input
											type='radio'
											name={question.question}
											value={3}
										/>
										<p>3</p>
									</span>
									<span className='text-xs flex flex-col justify-center items-center'>
										<input
											type='radio'
											name={question.question}
											value={4}
										/>
										<p>4</p>
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className='flex flex-col gap-2' id='help'>
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
				</div>
			</div>
		</section>
	);
}

export default Test;
