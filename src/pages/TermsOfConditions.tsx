import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';
import { TERMS_AND_CCONDITIONS } from '../data/legal';

const TermsOfConditions = () => {
	return (
		<PublicLayout>
			<section>
				<h1 className='font-heading text-3xl md:text-5xl font-bold'>
					Terms of Conditions
				</h1>
				<h2 className='text-lg md:text-2xl font-medium mx-auto mt-4'>
					These Terms and Conditions ("Terms") govern your use of the
					Mind Check application ("App"), developed by Kunal Keshan.
					By using the App, you agree to comply with these Terms. If
					you do not agree with any part of these Terms, please
					refrain from using the App.
				</h2>
			</section>
			<ol className='mt-4 list-decimal ml-4'>
				{TERMS_AND_CCONDITIONS.map((toc) => (
					<li key={toc.title}>
						<h3 className='font-heading text-lg md:text-xl font-bold'>
							{toc.title}
						</h3>
						<ul className='list-disc ml-4'>
							{toc.information.map((info) => (
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
							If you have any questions or concerns about these
							Terms or the App, please contact us at{' '}
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

export default TermsOfConditions;
