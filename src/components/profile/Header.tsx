import { NavLink } from 'react-router-dom';

const LINKS = [
	{
		name: 'Profile',
		url: '/me',
	},
	{
		name: 'Score History',
		url: '/me/history',
	},
];

const UserProfileHeader = () => {
	return (
		<div className='w-full flex items-center text-textPrimary gap-8'>
			{LINKS.map((link, index) => (
				<NavLink
					to={link.url}
					key={index}
					className={({ isActive }) =>
						`${
							isActive
								? 'bg-secondary bg-opacity-80'
								: 'hover:bg-secondary hover:bg-opacity-40'
						} w-full font-heading text-xl transition-all font-semibold text-center py-2 rounded-xl`
					}
					end
				>
					{link.name}
				</NavLink>
			))}
		</div>
	);
};

export default UserProfileHeader;
