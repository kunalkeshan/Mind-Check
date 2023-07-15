/**
 * Feedback Data
 */

interface Feedback {
	range: {
		min: number;
		max: number;
	};
	feedback: string[];
}

type Feedbacks = Feedback[];

const FEEDBACKS: Feedbacks = [
	{
		range: {
			min: 0,
			max: 5,
		},
		feedback: [
			'Great job! Your score suggests that you are currently experiencing no symptoms of depression. Keep up the positive outlook and continue taking care of your mental well-being.',
			'Fantastic work! Based on your score, it appears that you are currently free from any symptoms of depression. Maintain your positive mindset and keep prioritizing your mental well-being.',
			'Congratulations! Your score indicates that you are currently not experiencing any signs of depression. Continue embracing your positive outlook and nurturing your mental health.',
			'Well done! Your score suggests that you are currently symptom-free when it comes to depression. Keep up the great work of focusing on your mental well-being and maintaining a positive mindset.',
			'Amazing achievement! According to your score, you are currently showing no indications of depression. Continue fostering a positive perspective and taking steps to care for your mental well-being.',
			'Outstanding performance! Your score indicates that you are currently not encountering any depression symptoms. Stay committed to your positive mindset and continue nurturing your mental health for overall well-being.',
		],
	},
	{
		range: {
			min: 6,
			max: 10,
		},
		feedback: [
			'Your score indicates that you may be feeling normal but unhappy. There is room for improvement in your overall mood. Try implementing some of the self-help techniques provided in the app to uplift your spirits and boost your happiness.',
			"Based on your score, it seems that you are currently in the range of normal but feeling unhappy. Remember, there's always room for improvement in your overall mood. Explore the self-help techniques offered in the app to uplift your spirits and enhance your happiness.",
			"Your score suggests that you might be experiencing a normal but unhappy state. Don't worry, there's ample opportunity to improve your overall mood. Take advantage of the self-help techniques available in the app to lift your spirits and increase your happiness.",
			"According to your score, you may be feeling normal but unhappy at the moment. The good news is, there's potential for improvement in your overall mood. Discover and implement the self-help techniques provided in the app to uplift your spirits and boost your happiness.",
			"Your score indicates that you're currently in the normal but unhappy range. However, there's plenty of room for improvement in your overall mood. Consider trying out the self-help techniques offered in the app to elevate your spirits and enhance your happiness.",
			"Based on your score, it appears that you're feeling normal but unhappy. Remember, there's always potential for improvement in your overall mood. Explore the self-help techniques within the app to uplift your spirits and boost your happiness.",
		],
	},
	{
		range: {
			min: 11,
			max: 25,
		},
		feedback: [
			"Your score suggests mild depression. While it's not a cause for alarm, it's important to address these symptoms and work towards feeling better. The self-help techniques and resources provided in the app can assist you in managing your mild depression effectively.",
			"Based on your score, it seems that you are experiencing mild depression. Although it's not a cause for alarm, it's crucial to address these symptoms and focus on feeling better. Utilize the self-help techniques and resources available in the app to effectively manage your mild depression.",
			"Your score indicates mild depression. While it's not a reason to panic, it's important to acknowledge these symptoms and take steps towards improving your well-being. The app offers valuable self-help techniques and resources that can assist you in effectively managing your mild depression.",
			"According to your score, you're showing signs of mild depression. Remember, it's not something to be overly concerned about, but it's essential to address these symptoms and work towards feeling better. Leverage the self-help techniques and resources provided in the app to effectively manage your mild depression.",
			"Your score suggests mild depression. While it may not be severe, it's vital to recognize and address these symptoms for your overall well-being. Explore the self-help techniques and resources within the app, as they can assist you in effectively managing your mild depression.",
			"Based on your score, it appears that you're experiencing mild depression. Don't worry, it's not a cause for panic, but it's important to acknowledge these symptoms and take steps towards improvement. Make use of the self-help techniques and resources available in the app to effectively manage your mild depression.",
		],
	},
	{
		range: {
			min: 26,
			max: 50,
		},
		feedback: [
			"Your score indicates moderate depression. It's crucial to seek professional help and consider therapy or medication to support your recovery. The app's self-help techniques can complement professional treatment and aid in your journey towards improved mental well-being.",
			"Based on your score, it appears that you are experiencing moderate depression. It's important to reach out for professional help and consider therapy or medication to support your recovery. The self-help techniques available in the app can complement your treatment and play a role in your journey towards improved mental well-being.",
			"Your score suggests moderate depression. This is a critical time to seek professional help and explore options like therapy or medication to assist in your recovery. The app's self-help techniques can work hand in hand with professional treatment, offering additional support on your path towards improved mental well-being.",
			"According to your score, you're currently dealing with moderate depression. It's crucial to prioritize professional help and consider therapy or medication to aid in your recovery. The app provides self-help techniques that can complement your treatment, offering valuable support on your journey towards improved mental well-being.",
			"Your score indicates moderate depression. This calls for seeking professional assistance and considering therapy or medication to support your recovery. The app's self-help techniques are designed to complement professional treatment, empowering you on your path towards improved mental well-being.",
			"Based on your score, it seems that you're facing moderate depression. Remember, seeking professional help is vital, and options like therapy or medication can be instrumental in your recovery. The app's self-help techniques are here to support you alongside professional treatment, guiding you towards improved mental well-being.",
		],
	},
	{
		range: {
			min: 51,
			max: 75,
		},
		feedback: [
			"Your score indicates severe depression. It's essential to seek immediate professional help and consult with a mental health expert. They can provide the necessary guidance, support, and treatment options to help you overcome this challenging period.",
			"Based on your score, it's evident that you're experiencing severe depression. It's of utmost importance to seek immediate professional help and consult with a mental health expert. They possess the expertise to guide you, provide essential support, and offer appropriate treatment options to help you overcome this challenging period.",
			'Your score suggests severe depression. This is a critical time to reach out for immediate professional help and consult with a mental health expert. They are equipped to provide the necessary guidance, support, and tailored treatment options to help you navigate through this challenging phase.',
			"According to your score, you're currently dealing with severe depression. Seeking immediate professional help is essential. Consulting with a mental health expert will ensure you receive the necessary guidance, support, and appropriate treatment options to help you overcome this challenging period.",
			'Your score indicates severe depression. This calls for immediate action, seeking professional help, and consulting with a mental health expert. They possess the expertise to guide you through this difficult journey, offering essential support and tailored treatment options to help you regain your well-being.',
			"Based on your score, it seems that you're facing severe depression. Remember, seeking immediate professional help is crucial. Consulting with a mental health expert will provide you with the necessary guidance, unwavering support, and specialized treatment options to help you overcome this challenging phase.",
		],
	},
	{
		range: {
			min: 76,
			max: 100,
		},
		feedback: [
			"Your score suggests extreme depression. It's crucial to reach out to a mental health professional urgently for immediate assistance. Remember, you don't have to face this alone, and there are effective treatments available to help you regain your mental well-being.",
			"Based on your score, it appears that you're experiencing extreme depression. It's crucial to reach out to a mental health professional urgently for immediate assistance. Remember, you don't have to face this alone. There are effective treatments available that can help you regain your mental well-being.",
			"Your score indicates extreme depression. This is a critical time to urgently seek assistance from a mental health professional. Remember, you don't have to go through this alone. There are effective treatments and support systems in place to help you regain your mental well-being.",
			"According to your score, you're currently dealing with extreme depression. It's crucial to reach out to a mental health professional urgently for immediate assistance. Remember, you're not alone in this journey, and there are effective treatments available to support you in regaining your mental well-being.",
			"Your score suggests extreme depression. This calls for urgent action, reaching out to a mental health professional for immediate assistance. Remember, you don't have to face this alone. There are effective treatments and support networks that can help you in your journey towards regaining your mental well-being.",
			"Based on your score, it seems that you're facing extreme depression. Urgently seeking assistance from a mental health professional is crucial. Remember, you're not alone in this battle. There are effective treatments and resources available to support you in regaining your mental well-being.",
		],
	},
];
export const FEEDBACKS_LENGTH = FEEDBACKS[0].feedback.length;

export default FEEDBACKS;
