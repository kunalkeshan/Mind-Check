import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
	calculateReadingTime,
	fetchSingleResource,
} from '../../utils/resources';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

function SignleResource() {
	const { resourceSlug } = useParams();
	const { data, isError, isLoading } = useQuery(
		['fetchSingleResource', resourceSlug],
		() => fetchSingleResource(resourceSlug ?? '')
	);

	const totalReadingTime = calculateReadingTime(data?.body ?? '');

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
						remarkPlugins={[remarkGfm]}
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
						}}
					/>
				</article>
			)}
		</div>
	);
}

export default SignleResource;
