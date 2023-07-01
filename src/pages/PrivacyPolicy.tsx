import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';

const PrivacyPolicy = () => {
	return (
		<PublicLayout>
			<section>
				<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
					Privacy Policy
				</h1>
				<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
					This Privacy Policy ("Policy") explains how Mind Check
					collects, uses, and protects the personal information of
					users ("Users") of the Mind Check application ("App"). By
					using the App, you consent to the data practices described
					in this Policy.
				</h2>
			</section>
			<ScrollToTop />
		</PublicLayout>
	);
};

export default PrivacyPolicy;
