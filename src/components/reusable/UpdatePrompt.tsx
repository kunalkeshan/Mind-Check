/**
 * UpdatePrompt Component
 *
 * Displays automatic notifications for PWA updates and offline status.
 * Updates are applied automatically without user interaction.
 * Shows informational messages about the update process.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { usePWAUpdate } from '../../hooks/usePWAUpdate';

const UpdatePrompt = () => {
	const { isUpdating, offlineReady } = usePWAUpdate();

	return (
		<>
			{/* Updating Notification */}
			<AnimatePresence>
				{isUpdating && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.3 }}
						className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50'
					>
						<div className='bg-blue-500 rounded-lg shadow-lg p-4'>
							<div className='flex items-center gap-3'>
								{/* Loading Spinner Icon */}
								<div className='flex-shrink-0'>
									<svg
										className='w-6 h-6 text-white animate-spin'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
								</div>

								{/* Content */}
								<div className='flex-1'>
									<h3 className='font-heading font-semibold text-white mb-1'>
										Updating Mind Check
									</h3>
									<p className='text-sm text-blue-100'>
										Applying the latest updates... This
										will only take a moment.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Offline Ready Notification */}
			<AnimatePresence>
				{offlineReady && !isUpdating && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.3 }}
						className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50'
					>
						<div className='bg-green-500 rounded-lg shadow-lg p-4'>
							<div className='flex items-center gap-3'>
								{/* Check Icon */}
								<div className='flex-shrink-0'>
									<svg
										className='w-6 h-6 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>

								{/* Content */}
								<div className='flex-1'>
									<h3 className='font-heading font-semibold text-white mb-1'>
										Ready to Work Offline
									</h3>
									<p className='text-sm text-green-100'>
										Mind Check is now available offline.
										You can use the app without an internet
										connection.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default UpdatePrompt;
