/**
 * usePWAUpdate Hook
 *
 * Handles PWA service worker automatic updates using vite-plugin-pwa's virtual module.
 * In autoUpdate mode, updates are applied automatically without user interaction.
 * This hook provides notifications to inform users about the update process.
 */

import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function usePWAUpdate() {
	const [isUpdating, setIsUpdating] = useState(false);
	const [offlineReady, setOfflineReady] = useState(false);

	useRegisterSW({
		onRegistered(registration) {
			console.log('[PWA] Service Worker registered:', registration);

			// Check for updates every hour
			if (registration) {
				setInterval(
					() => {
						console.log('[PWA] Checking for updates...');
						registration.update();
					},
					60 * 60 * 1000
				); // 1 hour
			}
		},
		onRegisterError(error) {
			console.error('[PWA] Service Worker registration error:', error);
		},
		onOfflineReady() {
			console.log('[PWA] App ready to work offline');
			setOfflineReady(true);
			// Auto-hide offline ready notification after 5 seconds
			setTimeout(() => {
				setOfflineReady(false);
			}, 5000);
		},
	});

	// Listen for service worker updates
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.addEventListener('controllerchange', () => {
			console.log('[PWA] New service worker activated, reloading...');
			setIsUpdating(true);
			// Give a brief moment to show the notification before reload
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		});
	}

	return {
		isUpdating,
		offlineReady,
	};
}
