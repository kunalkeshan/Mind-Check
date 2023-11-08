import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSingleResource } from '../../utils/resources';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import footnotes from 'remark-footnotes';
import ReactMarkdown from 'react-markdown';
import { Github, Pencil } from 'lucide-react';
import ScrollToTop from '../../components/reusable/ScrollToTop';
import { motion } from 'framer-motion';
import Header from '../../components/resources/Header';

function SignleResource() {
	const { resourceSlug } = useParams();
	const { data, isError, isLoading } = useQuery(
		['fetchSingleResource', resourceSlug],
		() => fetchSingleResource(resourceSlug ?? '')
	);

	return (
		<div className='w-full'>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, type: 'spring' }}
				viewport={{ once: true }}
				className='font-heading font-semibold text-xl tracking-wide text-textSecondary'
			>
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
			</motion.p>
			<hr className='mt-2 mb-8' />
			{isLoading ? (
				<p>Loading Resource...</p>
			) : isError ? (
				<p>Unable to fetch resource at the moment. Try again later.</p>
			) : (
				<motion.article
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, type: 'spring' }}
					viewport={{ once: true }}
					className='max-w-5xl mx-auto'
				>
					<ReactMarkdown
						children={data?.body ?? ''}
						remarkPlugins={[remarkGfm, footnotes]}
						rehypePlugins={[rehypeRaw]}
						className='[&>*]:mt-4 text-lg'
						components={{
							h1: (props) => <Header {...props} data={data} />,
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
										loading='lazy'
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
					<p className='flex justify-between items-center gap-2 mt-4 flex-wrap'>
						<a
							href={`https://github.com/kunalkeshan/Mind-Check/tree/main/public/resources/${data?.url}.md`}
							title={`https://github.com/kunalkeshan/Mind-Check/tree/main/public/resources/${data?.url}.md`}
							className='flex items-center gap-2 w-fit text-textSecondary hover:underline text-opacity-80 transition-all duration-300 hover:text-opacity-100 underline-offset-4'
							target='_blank'
						>
							Edit this page on GitHub{' '}
							<Github size={16} strokeWidth={1.25} />
						</a>
						<a
							href={`https://mind-check.vercel.app/resources/contributing-to-resources`}
							title={`https://mind-check.vercel.app/resources/contributing-to-resources`}
							className='flex items-center gap-2 w-fit text-textSecondary hover:underline text-opacity-80 transition-all duration-300 hover:text-opacity-100 underline-offset-4'
							target='_blank'
						>
							Confused on how to edit? Read this{' '}
							<Pencil size={16} strokeWidth={1.25} />
						</a>
					</p>
				</motion.article>
			)}
			<ScrollToTop />
		</div>
	);
}

export default SignleResource;
