import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';

const TermsOfConditions = () => {
	return (
		<PublicLayout>
			<section>
				<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
					Terms of Conditions
				</h1>
				<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
					These Terms and Conditions ("Terms") govern your use of the
					Mind Check application ("App"), developed by Kunal Keshan.
					By using the App, you agree to comply with these Terms. If
					you do not agree with any part of these Terms, please
					refrain from using the App.
				</h2>
			</section>
			<ScrollToTop />
		</PublicLayout>
	);
};

export default TermsOfConditions;
