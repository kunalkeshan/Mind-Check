interface Question {
	question: string;
	score?: number;
}

interface Sections {
	'Thoughts & Feelings': Question[];
	'Activities & Personal Relationships': Question[];
	'Physical Symptoms': Question[];
	'Suicidal Urges': Question[];
}

const QUESTIONS: Sections = {
	'Thoughts & Feelings': [
		{
			question: 'Feeling sad or down in the dumps',
		},
		{
			question: 'Feeling unhappy or blue',
		},
		{
			question: 'Crying spells or tearfulness',
		},
		{
			question: 'Feeling discouraged',
		},
		{
			question: 'Feeling hopeless',
		},
		{
			question: 'Low self-esteem',
		},
		{
			question: 'Feeling worthless or inadequate',
		},
		{
			question: 'Guilt or shame',
		},
		{
			question: 'Criticizing yourself or blaming yourself',
		},
		{
			question: 'Difficulty making decisions',
		},
	],
	'Activities & Personal Relationships': [
		{
			question: 'Loss of interest  in family, friends or colleagues',
		},
		{
			question: 'Loneliness',
		},
		{
			question: 'Spending less time with family or friends',
		},
		{
			question: 'Loss of motivation',
		},
		{
			question: 'Loss of interest in work or other activities',
		},
		{
			question: 'Avoiding work or other activites',
		},
		{
			question: 'Loss of pleasure of satisfaction in life',
		},
	],
	'Physical Symptoms': [
		{
			question: 'Feelingg tired',
		},
		{
			question: 'Difficulty sleepingg or sleeping too much',
		},
		{
			question: 'Decreased or increased appetite',
		},
		{
			question: 'Loss of interest in sex',
		},
		{
			question: 'Worrying about your health',
		},
	],
	'Suicidal Urges': [
		{
			question: 'Do you have any suicidal thoughts?',
		},
		{
			question: 'Would you like to end your life?',
		},
		{
			question: 'Do you have a plan for harming yourself?',
		},
	],
};

export default QUESTIONS;
