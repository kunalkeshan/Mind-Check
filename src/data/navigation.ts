/**
 * Navigation Data
 */

interface NavLink {
	name: string;
	url: string;
}

type NavLinks = NavLink[];

const COMMON_LINKS: NavLinks = [
	{ name: 'Home', url: '/' },
	{ name: 'Features', url: '/#features' },
	{ name: 'Resources', url: '/resources' },
];

export const MAIN_LINKS: NavLinks = [...COMMON_LINKS];

export const FOOTER_LINKS: NavLinks = [
	...COMMON_LINKS,
	{
		name: 'Contribute to Resources',
		url: '/resources/contributing-to-resources',
	},
	{ name: 'Terms & Conditions', url: '/terms' },
	{ name: 'Privacy Policy', url: '/privacy' },
];
