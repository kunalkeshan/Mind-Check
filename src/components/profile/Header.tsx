import { History, UserCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const LINKS = [
	{
		name: 'Profile',
		url: '/me',
		Icon: UserCircle2,
	},
	{
		name: 'Score History',
		url: '/me/history',
		Icon: History,
	},
];

const UserProfileHeader = () => {
	return (
		<div className='w-full flex items-center text-textPrimary gap-8 bg-primary'>
			{LINKS.map((link, index) => (
				<NavLink
					to={link.url}
					key={index}
					className={({ isActive }) =>
						`${
							isActive
								? 'bg-secondary bg-opacity-80'
								: 'hover:bg-secondary hover:bg-opacity-40'
						} w-full font-heading text-xl flex items-center justify-center gap-2 transition-all font-semibold text-center p-2 rounded-xl`
					}
					end
				>
					<link.Icon size={20} strokeWidth={1.5} min={20} />{' '}
					<span>{link.name}</span>
				</NavLink>
			))}
		</div>
	);
};

export default UserProfileHeader;
