import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

function Navbar() {
	return (
		<nav className='fixed top-0 left-0 bg-primary w-full'>
			<div className='max-w-7xl mx-auto py-4 px-8 flex items-center justify-between w-full'>
				<Link
					to={'/'}
					className='flex w-fit items-center gap-1 hover:scale-[0.98] active:scale-[1.02] transition-all'
				>
					<div className='w-10 h-10'>
						<img
							src='/mind-check-logo.png'
							alt='🧠'
							className='w-full h-auto object-contain'
						/>
					</div>
					<p className='font-heading text-3xl font-bold'>
						Mind Check
					</p>
				</Link>
				<button className='bg-secondary rounded-full p-2 hover:bg-secondaryDark transition-all'>
					<Menu />
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
