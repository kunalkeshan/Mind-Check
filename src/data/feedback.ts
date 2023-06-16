/**
 * Feedback Data
 */

interface Feedback {
	range: {
		min: number;
		max: number;
	};
	feedback: string;
}

type Feedbacks = Feedback[];

const FEEDBACKS: Feedbacks = [
	{
		range: {
			min: 0,
			max: 5,
		},
		feedback:
			'Great job! Your score suggests that you are currently experiencing no symptoms of depression. Keep up the positive outlook and continue taking care of your mental well-being.',
	},
	{
		range: {
			min: 6,
			max: 10,
		},
		feedback:
			'Your score indicates that you may be feeling normal but unhappy. There is room for improvement in your overall mood. Try implementing some of the self-help techniques provided in the app to uplift your spirits and boost your happiness.',
	},
	{
		range: {
			min: 11,
			max: 25,
		},
		feedback:
			"Your score suggests mild depression. While it's not a cause for alarm, it's important to address these symptoms and work towards feeling better. The self-help techniques and resources provided in the app can assist you in managing your mild depression effectively.",
	},
	{
		range: {
			min: 26,
			max: 50,
		},
		feedback:
			"Your score indicates moderate depression. It's crucial to seek professional help and consider therapy or medication to support your recovery. The app's self-help techniques can complement professional treatment and aid in your journey towards improved mental well-being.",
	},
	{
		range: {
			min: 51,
			max: 75,
		},
		feedback:
			"Your score indicates severe depression. It's essential to seek immediate professional help and consult with a mental health expert. They can provide the necessary guidance, support, and treatment options to help you overcome this challenging period.",
	},
	{
		range: {
			min: 76,
			max: 100,
		},
		feedback:
			"Your score suggests extreme depression. It's crucial to reach out to a mental health professional urgently for immediate assistance. Remember, you don't have to face this alone, and there are effective treatments available to help you regain your mental well-being.",
	},
];

export default FEEDBACKS;
