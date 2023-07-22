import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AppContext.tsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import ScrollToAnchor from './components/reusable/ScrollToAnchor.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AnimatePresence>
				<BrowserRouter>
					<AuthProvider>
						<App />
						<Toaster position='bottom-right' />
						<ScrollToAnchor />
					</AuthProvider>
				</BrowserRouter>
			</AnimatePresence>
		</QueryClientProvider>
	</React.StrictMode>
);
