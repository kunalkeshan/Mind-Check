/**
 * Landing Page - How It Works? Section
 */

const HOW_IT_WORKS_CONTENT = [
	{
		title: 'Open the Test',
		description:
			'Click on the "Start Assessment" button to begin the MindCheck test.',
	},
	{
		title: 'Answer Questions',
		description:
			'Carefully respond to 25 questions across four sections. Choose a score ranging from 1 to 5 for each question.',
	},
	{
		title: 'Calculate Your Score',
		description:
			"Once you've completed the questions, your scores will be calculated automatically.",
	},
	{
		title: 'Get Feedback',
		description:
			'Discover your total score and refer to the provided feedback. Understand your level of depression based on the score range and gain valuable insights into your emotional well-being.',
	},
	{
		title: 'Take Action',
		description:
			'Use the feedback to determine if further steps are necessary. Seek professional help if required or explore self-help techniques outlined in the app to improve your mental health.',
	},
];

function Working() {
	return (
		<section className='mt-20 text-center md:text-left'>
			<h2 className='font-heading text-2xl md:text-4xl font-bold'>
				How it works?
			</h2>
			<ul className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-4'>
				{HOW_IT_WORKS_CONTENT.map((content, index) => (
					<li
						key={index}
						className='border-2 border-secondary rounded-3xl px-8 py-4 h-full select-none bg-secondary bg-opacity-20 transition-all hover:border-secondaryDark hover:bg-opacity-40'
					>
						<h3 className='font-heading text-lg md:text-2xl font-semibold'>
							{content.title}
						</h3>
						<p className='mt-2'>{content.description}</p>
					</li>
				))}
			</ul>
		</section>
	);
}

export default Working;
