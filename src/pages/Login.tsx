/**
 * Login Page
 */

// Dependencies
import { useState } from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import ScrollToTop from '../components/reusable/ScrollToTop';
import Lottie from 'lottie-react';
import LoginAnimationData from '../assets/lottie/login.json';
import { useUserStore } from '../store/user';
import { FirebaseAuth, FirebaseDb } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Login() {
	const [loading, setLoading] = useState(false);
	const { setUser } = useUserStore();
	const handleLoginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			setLoading(true);
			const response = await signInWithPopup(FirebaseAuth, provider);
			console.log(response);
			if (
				response.user.metadata.creationTime ===
				response.user.metadata.lastSignInTime
			) {
				// Is New User
				const scoreDocRef = doc(
					FirebaseDb,
					'scores',
					response.user.uid
				);
				setDoc(scoreDocRef, {});
			}
			setUser(response.user);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PublicLayout>
			<div className='grid grid-cols-1 md:grid-cols-2 text-center md:text-left'>
				<section>
					<div className='w-11/12'>
						<Lottie
							animationData={LoginAnimationData}
							loop={true}
							className='w-full h-auto object-contain'
						/>
					</div>
				</section>
				<section>
					<h1 className='font-heading text-3xl md:text-5xl font-bold'>
						Access your Account
					</h1>
					<button
						onClick={handleLoginWithGoogle}
						className='px-8 py-4 w-full mt-8 text-base md:text-2xl justify-center gap-8 flex items-center border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
					>
						<span className='w-8 md:w-10 h-8 md:h-10'>
							<img
								src='/icons/google.png'
								alt='Google'
								className='w-full h-auto object-contain'
							/>
						</span>
						<span className='w-full md:w-fit'>
							Continue with Google
						</span>
					</button>
				</section>
			</div>
			<ScrollToTop />
		</PublicLayout>
	);
}

export default Login;
