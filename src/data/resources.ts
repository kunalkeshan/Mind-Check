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
	},
];

export default RESOURCES;
