/**
 * Navbar Component
 */

// Dependencies
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAIN_LINKS } from '../../data/navigation';
import { useUserStore } from '../../store/user';

function Navbar() {
	const [open, setOpen] = useState(false);
	const { user } = useUserStore();
	//   console.log(user?.photoURL);
	const handleMenuToggle = () => {
		setOpen(!open);
	};

	const handleCloseMenu = () => {
		setOpen(false);
	};
	return (
		<nav className='fixed top-0 left-0 py-4 px-8 bg-primary w-full text-textPrimary z-50'>
			<div className='max-w-7xl mx-auto flex items-center justify-between md:justify-normal w-full md:gap-8'>
				<Link
					to={'/'}
					className='flex w-fit items-center gap-1 hover:scale-[0.98] active:scale-[1.02] transition-all'
				>
					<div className='w-10 h-10'>
						<img
							src='/mind-check-logo.png'
							alt='🧠'
							className='w-full h-auto object-contain'
							loading='lazy'
						/>
					</div>
					<p className='font-heading text-3xl font-bold'>
						Mind Check
					</p>
				</Link>
				<ul className='hidden md:flex gap-4 items-center'>
					{MAIN_LINKS.map((link, index) => (
						<li
							key={index}
							className='hover:text-textSecondary transition-all font-semibold text-lg'
						>
							<Link to={link.url}>{link.name}</Link>
						</li>
					))}
					<li className='hover:text-textSecondary transition-all font-semibold text-lg'>
						{user !== null ? (
							<Link to='/test'>Take Test</Link>
						) : (
							<Link to='/login'>Login/Signup</Link>
						)}
					</li>
				</ul>
				{user !== null ? (
					<Link to='/me' className='hidden md:block ml-auto'>
						<div className='rounded-full overflow-hidden w-10 h-10 transition-all hover:scale-105 duration-300'>
							<img
								src={user?.photoURL ?? ''}
								alt={user?.displayName ?? ''}
								className='w-full h-auto object-contain'
								loading='lazy'
							/>
						</div>
					</Link>
				) : (
					<Link
						to='/test'
						className='hidden md:block px-8 py-4 border-secondary border-2 ml-auto rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
					>
						Try for free
					</Link>
				)}
				<button
					className={`${
						open ? 'text-white' : ''
					} bg-secondary rounded-full p-2 hover:bg-secondaryDark transition-all block md:hidden`}
					onClick={handleMenuToggle}
				>
					<Menu />
				</button>
			</div>
			<AnimatePresence>
				{open && (
					<motion.div
						key='box'
						initial={{ opacity: 0, y: '-100%' }}
						exit={{ opacity: 0, y: '-100%' }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						className='flex flex-col items-center justify-center gap-8 md:hidden bg-primary'
					>
						<ul className='flex flex-col gap-4 items-center mt-8'>
							{MAIN_LINKS.map((link, index) => (
								<li
									key={index}
									className='hover:text-textSecondary transition-all font-semibold text-xl'
								>
									<Link
										to={link.url}
										onClick={handleCloseMenu}
									>
										{link.name}
									</Link>
								</li>
							))}
							<li className='hover:text-textSecondary transition-all font-semibold text-lg'>
								{user !== null ? (
									<Link to='/test'>Take Test</Link>
								) : (
									<Link to='/login'>Login/Signup</Link>
								)}
							</li>
						</ul>
						{user !== null ? (
							<Link
								to='/me'
								className='px-8 py-4 w-fit border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
								onClick={handleCloseMenu}
							>
								Profile
							</Link>
						) : (
							<Link
								to='/test'
								className='px-8 py-4 w-fit border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
								onClick={handleCloseMenu}
							>
								Try for free
							</Link>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}

export default Navbar;
