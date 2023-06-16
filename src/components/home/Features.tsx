const FEATURES_CONTENT = [
	{
		title: 'Free Test and Feedback',
		description:
			'Take advantage of our free and comprehensive depression test. Answer the questions, and receive instant feedback on your emotional well-being. Gain valuable insights into your mental health without any cost.',
		available: true,
		image: '/images/features/test.svg',
	},
	{
		title: 'Login/Create Account to Store Test Data',
		description:
			'Create your account or log in to store your test data securely. Your information will be protected, allowing you to track your progress over time and access your past test results whenever you need them.',
		available: false,
		image: '/images/features/account.svg',
	},
	{
		title: 'View Past Score History',
		description:
			'Easily access and review your previous test scores. Monitor your journey and observe patterns in your emotional well-being over time. Understanding your progress is essential, and our app provides a clear overview of your score history.',
		available: false,
		image: '/images/features/history.svg',
	},
	{
		title: 'Personalized Feedback Based on Test Inputs (Using AI)',
		description:
			'Benefit from the power of artificial intelligence (AI) to receive personalized feedback based on your test inputs. Our AI algorithms analyze your responses and generate tailored feedback, providing you with valuable insights and suggestions for improving your emotional well-being.',
		available: false,
		image: '/images/features/ai.svg',
	},
];

function Features() {
	return (
		<section className='mt-20 text-center md:text-left'>
			<h2 className='font-heading text-2xl md:text-4xl font-bold'>
				Our Features
			</h2>
			<ul className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4'>
				{FEATURES_CONTENT.map((content, index) => (
					<li
						key={index}
						className='border-2 border-secondary overflow-hidden group transition-all hover:border-secondaryDark rounded-3xl px-8 py-4 h-full select-none hover:-translate-y-2 hover:-translate-x-2'
					>
						<h3 className='font-heading text-lg md:text-2xl font-semibold'>
							{content.title}
						</h3>
						<p>{content.available ? 'Ready' : 'Coming Soon'}</p>
						<div className='w-[160px] h-[160px] p-4 flex items-center justify-center mx-auto relative my-4'>
							<img
								src={content.image}
								alt={content.title}
								className='w-full h-auto object-contain z-10 group-hover:scale-95 transition-all duration-700'
							/>
							<div className='bg-secondary rounded-full w-[160px] h-[160px] group-hover:w-[500%] group-hover:h-[500%] bg-opacity-40 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 transition-all duration-300' />
						</div>
						<p>{content.description}</p>
					</li>
				))}
			</ul>
			<p className='mt-4'>
				With these features, MindCheck offers a comprehensive and
				user-friendly experience. Take the test, track your progress,
				and receive personalized feedback to support your mental health
				journey. Sign up or log in today to get started!
			</p>
		</section>
	);
}

export default Features;
