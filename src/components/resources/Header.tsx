import React, { useMemo } from 'react';
import { Copy, Share } from 'lucide-react';
import { Resource } from '../../data/resources';
import { calculateReadingTime } from '../../utils/resources';
import { toast } from 'react-hot-toast';

type HeaderProps = React.ComponentProps<'header'> & {
	data: Resource | undefined;
};

const Header: React.FC<HeaderProps> = ({ data, children, ...props }) => {
	const totalReadingTime = calculateReadingTime(data?.body ?? '');

	const shareData = useMemo(() => {
		return {
			url: window.location.href,
			title: data?.title,
			text: data?.description,
		};
	}, [data]);

	const handleSharePost = async () => {
		if (navigator.canShare(shareData)) {
			try {
				await navigator.share(shareData);
			} catch (error) {
				toast.error('Unable to share. Try again later.');
			}
		} else {
			toast.error('Your device cannot share this. Copy the URL!');
		}
	};

	const handleCopyPostLink = async () => {
		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(shareData.url);
				toast.success('Link copied!');
			} catch (error) {
				toast.error('Unable to copy link. Try again later.');
			}
		} else {
			toast.error('Your device copy this!');
		}
	};

	return (
		<header className='[&>*]:mt-2' {...props}>
			<h1 className='text-3xl md:text-5xl font-heading font-bold'>
				{children}
			</h1>
			<span className='text-sm'>
				Written by:{' '}
				<a
					href={data?.author.social}
					title={data?.author.social}
					target='_blank'
					className='text-textSecondary hover:underline underline-offset-4 text-opacity-80 hover:text-opacity-100 transition-all duration-300'
				>
					{data?.author.name}
				</a>{' '}
				•{' '}
			</span>
			<span className='text-sm'>
				{new Date(data?.published ?? '').toLocaleDateString()} •{' '}
			</span>
			<span className='text-sm'>{totalReadingTime} min read</span>
			<div className='w-full border-t gap-2 border-b flex flex-wrap items-center justify-center sm:justify-between py-2 text-sm text-textPrimary transition-all duration-300'>
				<ul className='flex items-center gap-2'>
					{data?.tags.map((tag) => (
						<li
							title={tag}
							key={`${data.url}-${tag}`}
							className='text-textPrimary max-w-[12] select-none text-ellipsis overflow-hidden whitespace-nowrap px-2 py-1 w-fit rounded-full border border-textSecondary font-heading hover:bg-textSecondary bg-opacity-20 hover:text-white duration-300 transition-all font-bold text-xs'
						>
							{tag}
						</li>
					))}
				</ul>
				<div className='flex items-centerr gap-2'>
					<button
						onClick={handleSharePost}
						className='flex items-center gap-2 hover:text-textSecondary transition-all duration-300'
					>
						<Share size={16} strokeWidth={1.25} />
						Share
					</button>
					•
					<button
						onClick={handleCopyPostLink}
						className='flex items-center gap-2 hover:text-textSecondary transition-all duration-300'
						title={window.location.href}
					>
						<Copy size={16} strokeWidth={1.25} />
						Copy link
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
