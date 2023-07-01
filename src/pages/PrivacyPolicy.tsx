import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';
import { PRIVACY_POLICY } from '../data/legal';

const PrivacyPolicy = () => {
	return (
		<PublicLayout>
			<section>
				<h1 className='font-heading text-3xl md:text-5xl font-bold'>
					Privacy Policy
				</h1>
				<h2 className='text-lg md:text-2xl font-medium mt-4'>
					This Privacy Policy ("Policy") explains how Mind Check
					collects, uses, and protects the personal information of
					users ("Users") of the Mind Check application ("App"). By
					using the App, you consent to the data practices described
					in this Policy.
				</h2>
			</section>
			<ol className='mt-4 list-decimal ml-4'>
				{PRIVACY_POLICY.map((policy) => (
					<li key={policy.title}>
						<h3 className='font-heading text-lg md:text-xl font-bold'>
							{policy.title}
						</h3>
						<ul className='list-disc ml-4'>
							{policy.information.map((info) => (
								<li key={info}>{info}</li>
							))}
						</ul>
					</li>
				))}
				<li>
					<h3 className='font-heading text-lg md:text-xl font-bold'>
						Contact Us
					</h3>
					<ul className='list-disc ml-4'>
						<li>
							If you have any questions or concerns about this
							Privacy Policy or the App's privacy practices,
							please contact us at{' '}
							<a
								href='https://twitter.com/_kunalkeshan_'
								target='_blank'
								className='underline text-textSecondary'
							>
								https://twitter.com/_kunalkeshan_
							</a>
							.
						</li>
					</ul>
				</li>
			</ol>
			<ScrollToTop />
		</PublicLayout>
	);
};

export default PrivacyPolicy;
