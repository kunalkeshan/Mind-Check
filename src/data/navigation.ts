// Navigation Data

interface NavLink {
	name: string;
	url: string;
}

type NavLinks = NavLink[];

const COMMON_LINKS: NavLinks = [
	{
		name: 'Home',
		url: '/',
	},
	{
		name: 'Features',
		url: '/#features',
	},
];

export const MAIN_LINKS: NavLinks = [...COMMON_LINKS];

export const FOOTER_LINKS: NavLinks = [
	...COMMON_LINKS,
	{
		name: 'GitHub',
		url: 'https://github.com/kunalkeshan/Mind-Check',
	},
];
