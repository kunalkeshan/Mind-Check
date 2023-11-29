/**
 * Resources Data
 */

export type Tags =
	| 'Thoughts & Feelings'
	| 'Activities & Personal Relationships'
	| 'Physical Symptoms'
	| 'Suicidal Urges'
	| 'General';

export interface Resource {
	title: string;
	description: string;
	tags: Tags[];
	url: string;
	published: Date;
	image: string;
	body?: string;
	author: {
		name: string;
		social: string; // linkedin, twitter, or personal portfolio
	};
}

const RESOURCES: Resource[] = [
	{
		title: 'Introducing Mind Check: Assess and Track Your Mental Well-being',
		description:
			"In today's fast-paced world, taking care of our mental health is more important than ever. Introducing Mind Check, a web application designed to help individuals assess and track their mental well-being. With its user-friendly interface and comprehensive features, Mind Check aims to empower individuals on their journey towards improved mental health.",
		tags: ['General'],
		url: 'introducing-mind-check',
		image: '/images/resources/introducing-mind-check.svg',
		published: new Date('2023-07-16'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: "How to Contribute to Mind Check's Curated Resources",
		description:
			'A step by step guide on how to make changes and contribute to the resources of Mind Check.',
		tags: ['General'],
		url: 'contributing-to-resources',
		image: '/images/resources/contributing-to-resources.svg',
		published: new Date('2023-07-22'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: 'Embracing Failure: A Journey Towards Self-Improvement',
		description:
			'Most people in this space get extremely motivated and try to form lots of good habits all at once and become burnt out. Instead, try to focus on instituting ONE good habit at a time.',
		tags: ['Thoughts & Feelings'],
		url: 'embracing-failure-a-journey-towards-self-development',
		image: '/images/resources/embracing-failure-a-journey-towards-self-development.svg',
		published: new Date('2023-07-24'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: "When you feel like you shouldn't exist",
		description:
			'Amidst the overwhelming weight of my inner turmoil, I found solace in volunteering at a social service nonprofit. Organizing a basketball tournament for kids acted as a beacon of hope, gradually easing my depression. In valuing the lives and happiness of others, we often discover the true purpose and value of our own existence.',
		tags: ['Thoughts & Feelings', 'Suicidal Urges'],
		url: 'when-you-feel-like-you-shouldnt-exist',
		image: '/images/resources/when-you-feel-like-you-shouldnt-exist.svg',
		published: new Date('2023-07-24'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: 'Feeling like a failure',
		description:
			'Feeling like a failure, unemployed, and without many friends, can leave you feeling lost. But envision a reality where success is within reach - where persistence is the key to unlocking your dreams',
		tags: ['Thoughts & Feelings', 'Activities & Personal Relationships'],
		url: 'feeling-like-a-failure',
		image: '/images/resources/feeling-like-a-failure.svg',
		published: new Date('2023-07-24'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: 'You are not a bad person',
		description:
			'Feeling like a failure because of mistakes can be all-consuming, but remember, you are not defined by your past. Good people can stumble and rise again, stronger and wiser. Use your experiences as stepping stones to personal growth and improvement.',
		tags: ['Thoughts & Feelings'],
		url: 'you-are-not-a-bad-person',
		image: '/images/resources/you-are-not-a-bad-person.svg',
		published: new Date('2023-07-24'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: 'How to deal with afternoon blues?',
		description:
			'Struggling with the afternoon crash? Recharge your energy by taking a 10-20 minute walk after eating! As your body continues to digest food for a few hours after a meal, your "fasted state" emerges, offering potential benefits like improved focus, better sleep, and more efficient exercise.',
		tags: ['Physical Symptoms'],
		url: 'dealing-with-afternoon-blues',
		image: '/images/resources/dealing-with-afternoon-blues.svg',
		published: new Date('2023-07-24'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: 'Exporting Your Mind Check Data',
		description:
			'Mind Check understands the importance of having control over your mental health data. We provide a convenient way for you to export your data in various formats, empowering you to keep track of your mental well-being journey.',
		tags: ['General'],
		url: 'exporting-your-mind-check-data',
		image: '/images/resources/exporting-your-mind-check-data.svg',
		published: new Date('2023-11-28'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
	{
		title: 'Mind Check MVP 4 Features: Journals, Moods, and Account Deletion',
		description:
			"Mind Check is excited to unveil its latest features in MVP 4, designed to provide users with even more control over their mental well-being journey. In this update, we're introducing Journal Entries, Mood Tracking, and the ability to Delete Your Account. Let's explore these features in detail.",
		tags: ['General'],
		url: 'mind-check-mvp-4-features-journals-moods-and-account-deletion',
		image: '/images/resources/mind-check-mvp-4-features-journals-moods-and-account-deletion.svg',
		published: new Date('2023-11-29'),
		author: {
			name: 'Kunal Keshan',
			social: 'https://kunalkeshan.dev/',
		},
	},
];

export default RESOURCES;
