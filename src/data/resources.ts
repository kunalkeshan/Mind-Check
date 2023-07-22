/**
 * Resources Data
 */

type Tags =
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
];

export default RESOURCES;
