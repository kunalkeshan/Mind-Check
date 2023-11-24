/**
 * App.tsx with Application Routes
 */

// Dependencies
import React, { PropsWithChildren, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/user';
const Home = lazy(() => import('./pages/Home'));
const Test = lazy(() => import('./pages/Test'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Score = lazy(() => import('./pages/Score'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/me/Profile'));
const ScoreHistory = lazy(() => import('./pages/me/ScoreHistory'));
const Journal = lazy(() => import('./pages/me/Journal'));
const JournalHistory = lazy(() => import('./pages/me/JournalHistory'));
const Main = lazy(() => import('./pages/me/Main'));
const TermsOfConditions = lazy(() => import('./pages/TermsOfConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Resources = lazy(() => import('./pages/resources/Resources'));
const AllResources = lazy(() => import('./pages/resources/AllResources'));
const SignleResource = lazy(() => import('./pages/resources/SignleResource'));
const IndividualScoreHistoryPage = lazy(
	() => import('./pages/me/IndividualScoreHistory')
);
const LoadingScreen = lazy(() => import('./components/reusable/LoadingScreen'));

function App() {
	const { user } = useUserStore();

	// Check if user is logged in based on the presence of
	// user which is fetched from localStorage
	const CheckUserAlreadyLoggedIn: React.FC<PropsWithChildren> = ({
		children,
	}) => {
		return user !== null ? <Navigate to='/me' /> : <>{children}</>;
	};

	// Allows only if the user state is present
	const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
		return user !== null ? <>{children}</> : <Navigate to='/login' />;
	};
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/test' element={<Test />} />
				<Route path='/score' element={<Score />} />
				<Route
					path='/login'
					element={
						<CheckUserAlreadyLoggedIn>
							<Login />
						</CheckUserAlreadyLoggedIn>
					}
				/>
				<Route
					path='/me'
					element={
						<ProtectedRoute>
							<Main />
						</ProtectedRoute>
					}
				>
					<Route index element={<Profile />} />
					<Route path='history' element={<ScoreHistory />} />
					<Route path='journal' element={<Journal />} />
					<Route
						path='journal-history'
						element={<JournalHistory />}
					/>
					<Route
						path='history/:historyId'
						element={<IndividualScoreHistoryPage />}
					/>
				</Route>
				<Route path='/resources' element={<Resources />}>
					<Route index element={<AllResources />} />
					<Route path=':resourceSlug' element={<SignleResource />} />
				</Route>
				<Route path='/terms' element={<TermsOfConditions />} />
				<Route path='/privacy' element={<PrivacyPolicy />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
