/**
 * Instructions Data
 */

interface Instruction {
	text: string;
	image: string;
}

type Instructions = Instruction[];

const INSTRUCTIONS: Instructions = [
	{
		text: 'The test consists of 25 questions divided into four sections: Thoughts and Feelings, Activities and Personal Relationships, Physical Symptoms, and Suicidal Urges.',
		image: '/images/instructions/survey.png',
	},
	{
		text: 'Each question will have a point range from 0 to 4. Choose the number that best represents how you feel.',
		image: '/images/instructions/score.png',
	},
	{
		text: 'Be honest with your responses. There are no right or wrong answers; the test helps understand your emotions.',
		image: '/images/instructions/honest.png',
	},
	{
		text: 'Take your time to carefully read and consider each question before selecting your response.',
		image: '/images/instructions/time.png',
	},
	{
		text: 'Once you have answered all the questions, your score will be calculated to provide feedback on your mental well-being.',
		image: '/images/instructions/calculate.png',
	},
	{
		text: 'Remember, this test is designed to help you, so use it as a tool to gain insights and seek support if needed.',
		image: '/images/instructions/help.png',
	},
	{
		text: 'Your answers are confidential and will only be used to generate your personal score.',
		image: '/images/instructions/confidential.png',
	},
];

export default INSTRUCTIONS;
