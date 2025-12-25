/**
 * UpdatePrompt Component
 *
 * Displays a notification when a new version of the PWA is available.
 * Provides options to update immediately or dismiss the notification.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { usePWAUpdate } from '../../hooks/usePWAUpdate';

const UpdatePrompt = () => {
	const { needRefresh, updateApp, dismissUpdate } = usePWAUpdate();

	return (
		<AnimatePresence>
			{needRefresh && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.3 }}
					className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50'
				>
					<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4'>
						<div className='flex items-start gap-3'>
							{/* Icon */}
							<div className='flex-shrink-0'>
								<svg
									className='w-6 h-6 text-blue-500'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
									/>
								</svg>
							</div>

							{/* Content */}
							<div className='flex-1'>
								<h3 className='font-heading font-semibold text-gray-900 dark:text-white mb-1'>
									Update Available
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-300 mb-3'>
									A new version of Mind Check is available.
									Refresh to get the latest features and
									improvements.
								</p>

								{/* Action Buttons */}
								<div className='flex gap-2'>
									<button
										onClick={updateApp}
										className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
									>
										Update Now
									</button>
									<button
										onClick={dismissUpdate}
										className='px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
									>
										Later
									</button>
								</div>
							</div>

							{/* Close Button */}
							<button
								onClick={dismissUpdate}
								className='flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200'
								aria-label='Dismiss update notification'
							>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default UpdatePrompt;
