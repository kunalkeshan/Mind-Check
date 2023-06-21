import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { FirebaseAuth } from '../firebase';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [initialLoader, setInitialLoader] = useState<boolean>(true);
	const { setUser } = useUserStore();
	const navigate = useNavigate();

	useEffect(
		() =>
			onAuthStateChanged(FirebaseAuth, (user) => {
				if (user) {
					setUser(user);
				} else {
					setUser(null);
				}
				setInitialLoader(false);
			}),
		[navigate, setUser]
	);

	return (
		<AuthContext.Provider value={{}}>
			{initialLoader ? 'Loading...' : children}
		</AuthContext.Provider>
	);
};
