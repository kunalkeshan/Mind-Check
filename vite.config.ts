/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: 'prompt',
	manifest: {
		name: 'Mind Check',
		short_name: 'Mind Check',
		description:
			"Mind Check is a free web application designed to assess and track your mental well-being. Take a variety of mental health tests, receive personalized feedback, and track your progress over time. Improve your mental well-being with Mind Check's AI-powered insights and resources.",
		theme_color: '#f1b5ac',
		background_color: '#f3f6ef',
		display: 'standalone',
		start_url: 'https://mind-check.vercel.app',
		orientation: 'portrait',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
				purpose: 'apple touch icon',
			},
			{
				src: '/maskable_icon.png',
				sizes: '384x384',
				type: 'image/png',
				purpose: 'any maskable',
			},
		],
	},
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePWA(manifestForPlugin)],
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
