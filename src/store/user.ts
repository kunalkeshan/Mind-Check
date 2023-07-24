import { User } from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{
			name: 'MindCheckUser-v2.0',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
