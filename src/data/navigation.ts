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
	{ name: 'Terms of Conditions', url: '/terms-of-conditions' },
	{ name: 'Privacy Policy', url: '/privacy-policy' },
];
