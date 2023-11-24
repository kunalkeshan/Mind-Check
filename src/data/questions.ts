/**
 * Questions Data
 */

interface Question {
	question: string;
	id: number;
}

interface Sections {
	'Thoughts & Feelings': Question[];
	'Activities & Personal Relationships': Question[];
	'Physical Symptoms': Question[];
	'Suicidal Urges': Question[];
}

// ⚠ WARNING: do not change the order.
// Index is stored in firebase and later used to map out in respective sections.
const QUESTIONS: Sections = {
	'Thoughts & Feelings': [
		{
			question: 'Feeling sad or down in the dumps',
			id: 0,
		},
		{
			question: 'Feeling unhappy or blue',
			id: 1,
		},
		{
			question: 'Crying spells or tearfulness',
			id: 2,
		},
		{
			question: 'Feeling discouraged',
			id: 3,
		},
		{
			question: 'Feeling hopeless',
			id: 4,
		},
		{
			question: 'Low self-esteem',
			id: 5,
		},
		{
			question: 'Feeling worthless or inadequate',
			id: 6,
		},
		{
			question: 'Guilt or shame',
			id: 7,
		},
		{
			question: 'Criticizing yourself or blaming yourself',
			id: 8,
		},
		{
			question: 'Difficulty making decisions',
			id: 9,
		},
	],
	'Activities & Personal Relationships': [
		{
			question: 'Loss of interest  in family, friends or colleagues',
			id: 10,
		},
		{
			question: 'Loneliness',
			id: 11,
		},
		{
			question: 'Spending less time with family or friends',
			id: 12,
		},
		{
			question: 'Loss of motivation',
			id: 13,
		},
		{
			question: 'Loss of interest in work or other activities',
			id: 14,
		},
		{
			question: 'Avoiding work or other activites',
			id: 15,
		},
		{
			question: 'Loss of pleasure of satisfaction in life',
			id: 16,
		},
	],
	'Physical Symptoms': [
		{
			question: 'Feelingg tired',
			id: 17,
		},
		{
			question: 'Difficulty sleepingg or sleeping too much',
			id: 18,
		},
		{
			question: 'Decreased or increased appetite',
			id: 19,
		},
		{
			question: 'Loss of interest in sex',
			id: 20,
		},
		{
			question: 'Worrying about your health',
			id: 21,
		},
	],
	'Suicidal Urges': [
		{
			question: 'Do you have any suicidal thoughts?',
			id: 22,
		},
		{
			question: 'Would you like to end your life?',
			id: 23,
		},
		{
			question: 'Do you have a plan for harming yourself?',
			id: 24,
		},
	],
};

export default QUESTIONS;
