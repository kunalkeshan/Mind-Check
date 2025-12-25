/**
 * Floating Action Button Component
 * Provides quick access shortcuts for all users
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileEdit, Brain, Plus, X, Home, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../../store/user';

interface FABAction {
	icon: React.ReactNode;
	label: string;
	to: string;
	color: string;
}

function FloatingActionButton() {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useUserStore();

	// Different actions based on login status
	const actions: FABAction[] = user
		? [
				// Logged-in user actions
				{
					icon: <User size={20} />,
					label: 'Profile',
					to: '/me',
					color: 'bg-blue-500 hover:bg-blue-600',
				},
				{
					icon: <Brain size={20} />,
					label: 'Take Test',
					to: '/test',
					color: 'bg-purple-500 hover:bg-purple-600',
				},
				{
					icon: <FileEdit size={20} />,
					label: 'New Journal',
					to: '/me/journal',
					color: 'bg-green-500 hover:bg-green-600',
				},
		  ]
		: [
				// Logged-out user actions
				{
					icon: <Home size={20} />,
					label: 'Home',
					to: '/',
					color: 'bg-blue-500 hover:bg-blue-600',
				},
				{
					icon: <BookOpen size={20} />,
					label: 'Resources',
					to: '/resources',
					color: 'bg-green-500 hover:bg-green-600',
				},
				{
					icon: <Brain size={20} />,
					label: 'Take Test',
					to: '/test',
					color: 'bg-purple-500 hover:bg-purple-600',
				},
		  ];

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<div className='fixed bottom-6 right-6 z-50'>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className='flex flex-col-reverse gap-3 mb-3'
					>
						{actions.map((action, index) => (
							<motion.div
								key={action.label}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ delay: index * 0.05 }}
							>
								<Link
									to={action.to}
									onClick={() => setIsOpen(false)}
									className={`${action.color} text-white rounded-full p-4 shadow-lg transition-all flex items-center gap-3 group`}
								>
									<span className='flex-shrink-0'>
										{action.icon}
									</span>
									<span className='text-sm font-semibold whitespace-nowrap pr-2'>
										{action.label}
									</span>
								</Link>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main FAB Button */}
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={toggleMenu}
				className='bg-secondary hover:bg-secondaryDark text-white rounded-full p-4 shadow-lg transition-all'
				aria-label='Quick actions menu'
			>
				<AnimatePresence mode='wait'>
					{isOpen ? (
						<motion.div
							key='close'
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<X size={24} />
						</motion.div>
					) : (
						<motion.div
							key='open'
							initial={{ rotate: 90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: -90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<Plus size={24} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</div>
	);
}

export default FloatingActionButton;
