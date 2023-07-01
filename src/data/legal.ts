/**
 * Application Legal Data
 */

interface LegalInfo {
	title: string;
	information: string[];
}

type LegalInfoList = LegalInfo[];

export const TERMS_AND_CCONDITIONS: LegalInfoList = [];

export const PRIVACY_POLICY: LegalInfoList = [
	{
		title: 'Information We Collect',
		information: [
			'1.1 Personal Information. We may collect personal information, such as: name, email, photo.',
			"1.2 Test Data. When you use the App, we may collect information related to your test inputs and results. This data is used to provide personalized feedback and improve the App's performance.",
			'1.3 Log Data. We collect information that your browser or device sends whenever you use the App. This may include your IP address, device type, operating system, browser version, and usage statistics. This data helps us analyze trends, administer the App, and improve user experience.',
		],
	},
	{
		title: 'How We Use Your Information',
		information: [
			'We use the collected information for the following purposes:',
			"To provide and personalize the App's features and content",
			"To improve the App's functionality and performance",
			'To communicate with Users and respond to inquiries',
			'To send periodic emails related to the App (optional)',
			'To analyze usage trends and gather statistical information',
		],
	},
	{
		title: 'Data Sharing and Disclosure',
		information: [
			'We may share your personal information and test data in the following circumstances:',
			'With your explicit consent',
			'With our trusted service providers who assist us in operating the App and delivering services to you',
			'When required by law, regulation, or legal process',
			'In connection with a merger, acquisition, or sale of all or a portion of our assets',
			"We do not sell, trade, or rent Users' personal information to third parties for marketing purposes.",
		],
	},
	{
		title: 'Data Security',
		information: [
			"We take appropriate security measures to protect Users' personal information and test data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.",
		],
	},
	{
		title: 'Data Retention',
		information: [
			'We retain personal information and test data for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required by law.',
		],
	},
	{
		title: "Children's Privacy",
		information: [
			'The App is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we discover that personal information from a child under 13 has been collected, we will delete it immediately.',
		],
	},
	{
		title: 'Third-Party Links',
		information: [
			'The App may contain links to third-party websites or services. We are not responsible for the privacy practices or content of such third parties. We encourage Users to review the privacy policies of those third parties before providing any personal information.',
		],
	},
	{
		title: 'Changes to this Policy',
		information: [
			'We reserve the right to update or modify this Policy at any time. Any changes will be posted on this page, and the "Last Updated" date at the top of the Policy will be revised accordingly. By continuing to use the App after any changes, you acknowledge and accept the updated Policy.',
		],
	},
];
