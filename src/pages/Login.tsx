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
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-hot-toast';

function Login() {
	const [loading, setLoading] = useState(false);
	const { setUser } = useUserStore();

	const handleLoginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			setLoading(true);
			const response = await signInWithPopup(FirebaseAuth, provider);
			if (
				response.user.metadata.creationTime ===
				response.user.metadata.lastSignInTime
			) {
				// Is New User
				const scoreDocRef = doc(FirebaseDb, 'users', response.user.uid);
				setDoc(scoreDocRef, {});
			}
			setUser(response.user);
		} catch (error) {
			if (error instanceof FirebaseError) {
				switch (error.code) {
					case 'auth/popup-closed-by-user': {
						toast.error(
							'Do not close popup before selecting email.'
						);
						break;
					}
					default: {
						toast.error('Unable to login. Try again later.');
						break;
					}
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<PublicLayout>
			<div className='text-center max-w-3xl mx-auto flex flex-col justify-center'>
				<h1 className='font-heading text-3xl md:text-5xl font-bold'>
					Access your Account
				</h1>
				<button
					onClick={handleLoginWithGoogle}
					className={`${
						loading
							? 'grayscale'
							: 'hover:border-secondaryDark hover:bg-tertiary'
					} px-8 py-4 w-full mt-8 text-base md:text-2xl justify-center gap-8 flex items-center border-secondary border-2 rounded-full font-semibold  transition-all `}
					disabled={loading}
				>
					<span className='w-8 md:w-10 h-8 md:h-10'>
						<img
							src='/icons/google.png'
							alt='Google'
							className='w-full h-auto object-contain'
							loading='lazy'
						/>
					</span>
					<span className='w-full md:w-fit'>
						{loading ? 'Loading...' : 'Continue with Google'}
					</span>
				</button>
				<div className='w-3/4 mx-auto mt-8'>
					<Lottie
						animationData={LoginAnimationData}
						loop={true}
						className='w-full h-auto object-contain'
					/>
				</div>
			</div>
			<ScrollToTop />
		</PublicLayout>
	);
}

export default Login;
