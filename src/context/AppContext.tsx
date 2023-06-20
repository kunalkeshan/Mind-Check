import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { FirebaseAuth } from '../firebase';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

export interface AuthContextState {
	user: User | null;
}

export const AuthContext = createContext<AuthContextState>({
	user: {} as User,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [initialLoader, setInitialLoader] = useState<boolean>(true);
	const { user, setUser } = useUserStore();
	const navigate = useNavigate();

	const value = useMemo(
		() => ({
			user,
		}),
		[user]
	);

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
		<AuthContext.Provider value={value}>
			{initialLoader ? 'Loading...' : children}
		</AuthContext.Provider>
	);
};
