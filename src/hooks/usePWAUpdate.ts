/**
 * usePWAUpdate Hook
 *
 * Handles PWA service worker updates using vite-plugin-pwa's virtual module.
 * Detects when a new version is available and provides a method to update.
 */

import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function usePWAUpdate() {
	const [needRefresh, setNeedRefresh] = useState(false);

	const {
		needRefresh: [needRefreshState, setNeedRefreshState],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(registration) {
			console.log('[PWA] Service Worker registered:', registration);

			// Check for updates every hour
			if (registration) {
				setInterval(() => {
					console.log('[PWA] Checking for updates...');
					registration.update();
				}, 60 * 60 * 1000); // 1 hour
			}
		},
		onRegisterError(error) {
			console.error('[PWA] Service Worker registration error:', error);
		},
		onNeedRefresh() {
			console.log('[PWA] New version available!');
			setNeedRefresh(true);
			setNeedRefreshState(true);
		},
		onOfflineReady() {
			console.log('[PWA] App ready to work offline');
		},
	});

	useEffect(() => {
		setNeedRefresh(needRefreshState);
	}, [needRefreshState]);

	const updateApp = async () => {
		await updateServiceWorker(true);
	};

	const dismissUpdate = () => {
		setNeedRefresh(false);
		setNeedRefreshState(false);
	};

	return {
		needRefresh,
		updateApp,
		dismissUpdate,
	};
}
