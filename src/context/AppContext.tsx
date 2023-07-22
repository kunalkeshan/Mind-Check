import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { FirebaseAuth } from '../firebase';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { fetchAllResources } from '../utils/resources';
import LoadingScreen from '../components/reusable/LoadingScreen';

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

	useEffect(() => {
		fetchAllResources({});
	}, []);

	return (
		<AuthContext.Provider value={{}}>
			{initialLoader ? <LoadingScreen /> : children}
		</AuthContext.Provider>
	);
};
