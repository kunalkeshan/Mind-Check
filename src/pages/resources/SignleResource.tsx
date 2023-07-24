import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
	calculateReadingTime,
	fetchSingleResource,
} from '../../utils/resources';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import footnotes from 'remark-footnotes';
import ReactMarkdown from 'react-markdown';
import { Copy, Github, Share } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMemo } from 'react';
import ScrollToTop from '../../components/reusable/ScrollToTop';

function SignleResource() {
	const { resourceSlug } = useParams();
	const { data, isError, isLoading } = useQuery(
		['fetchSingleResource', resourceSlug],
		() => fetchSingleResource(resourceSlug ?? '')
	);

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
		<div className='w-full'>
			<p className='font-heading font-semibold text-xl tracking-wide text-textSecondary'>
				/
				<Link
					to='/resources'
					className='hover:underline underline-offset-4 decoration-textSecondary'
				>
					resources
				</Link>
				{resourceSlug === data?.url ? (
					<>
						/
						<Link
							to='/resources'
							className='hover:underline underline-offset-4 decoration-textSecondary'
						>
							{resourceSlug}
						</Link>
					</>
				) : null}
			</p>
			<hr className='mt-2 mb-8' />
			{isLoading ? (
				<p>Loading Resource...</p>
			) : isError ? (
				<p>Unable to fetch resource at the moment. Try again later.</p>
			) : (
				<article className='max-w-5xl mx-auto'>
					<ReactMarkdown
						children={data?.body ?? ''}
						remarkPlugins={[remarkGfm, footnotes]}
						rehypePlugins={[rehypeRaw]}
						className='[&>*]:mt-4 text-lg'
						components={{
							h1: ({ children, ...props }) => (
								<header className='[&>*]:mt-2'>
									<h1
										className='text-3xl md:text-5xl font-heading font-bold'
										{...props}
									>
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
										{new Date(
											data?.published ?? ''
										).toLocaleDateString()}{' '}
										•{' '}
									</span>
									<span className='text-sm'>
										{totalReadingTime} min read
									</span>
									<div className='w-full border-t gap-2 border-b flex items-center justify-end py-2 text-sm hover:text-textSecondary text-textPrimary transition-all duration-300'>
										<button
											onClick={handleSharePost}
											className='flex items-center gap-2'
										>
											<Share
												size={16}
												strokeWidth={1.25}
											/>
											Share
										</button>
										•
										<button
											onClick={handleCopyPostLink}
											className='flex items-center gap-2'
											title={window.location.href}
										>
											<Copy
												size={16}
												strokeWidth={1.25}
											/>
											Copy link
										</button>
									</div>
								</header>
							),
							h2: ({ children, ...props }) => (
								<h2
									className='text-2xl md:text-3xl font-heading font-bold'
									{...props}
								>
									{children}
								</h2>
							),
							img: ({ children, ...props }) => (
								<div className='rounded-xl w-2/3 overflow-hidden border border-secondaryDark mx-auto'>
									<img
										className='w-full h-auto object-contain'
										{...props}
									>
										{children}
									</img>
								</div>
							),
							ol: ({ children, ...props }) => (
								<ol className='mt-4 [&>*]:mt-4' {...props}>
									{children}
								</ol>
							),
							li: ({ children, ...props }) => (
								<li className='ml-4' {...props}>
									{children}
								</li>
							),
							pre: ({ children, ...props }) => (
								<pre
									className='font-mono bg-[#1b1b1b] [&>code]:max-w-[100%] [&>code]:min-w-[100%] text-white rounded-xl px-8 py-4 overflow-x-scroll [&>code]:whitespace-pre [&>code]:box-decoration-clone [&>code]:break-words'
									{...props}
								>
									{children}
								</pre>
							),
							a: ({ children, ...props }) => (
								<a
									className='text-textSecondary underline underline-offset-4 hover:underline-offset-2 text-opacity-80 hover:text-opacity-100 transition-all duration-300'
									{...props}
								>
									{children}
								</a>
							),
						}}
					/>
					<a
						href={`https://github.com/kunalkeshan/Mind-Check/tree/main/public/resources/${data?.url}.md`}
						title={`https://github.com/kunalkeshan/Mind-Check/tree/main/public/resources/${data?.url}.md`}
						className='flex justify-end items-center gap-2 w-full mt-4 text-textSecondary hover:underline text-opacity-80 transition-all duration-300 hover:text-opacity-100 underline-offset-4'
						target='_blank'
					>
						Edit this page on GitHub{' '}
						<Github size={16} strokeWidth={1.25} />
					</a>
				</article>
			)}
			<ScrollToTop />
		</div>
	);
}

export default SignleResource;
