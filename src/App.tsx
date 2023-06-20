/**
 * App.tsx with Application Routes
 */

// Dependencies
import React, { PropsWithChildren } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import NotFound from './pages/NotFound';
import Score from './pages/Score';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useUserStore } from './store/user';

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
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default App;
