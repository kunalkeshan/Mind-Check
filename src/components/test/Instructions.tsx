/**
 * Test Page - Instructions Section
 */

// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import INSTRUCTIONS from '../../data/instructions';
import { motion } from 'framer-motion';

interface InstructionsProps {
	setTestInProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

const Instructions: React.FC<InstructionsProps> = ({ setTestInProgress }) => {
	const handleStartTest = () => {
		setTestInProgress(true);
	};

	return (
		<section className='w-full max-w-7xl mx-auto py-12 px-8 flex flex-col'>
			<h1 className='font-heading text-3xl md:text-5xl font-bold text-center'>
				Mental Health Check
			</h1>
			<h2 className='text-lg md:text-2xl font-medium text-center max-w-2xl mx-auto mt-4'>
				Assess your well-being with a comprehensive 25-question test.
				Based on the Burns Depression Checklist from Feeling Good: the
				new mood therapy.
			</h2>
			<div className='flex flex-col gap-8 mt-8 w-full'>
				{INSTRUCTIONS.map((instruction, index) => (
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						whileInView={{ opacity: 1, scale: 1, y: 0 }}
						transition={{
							delay: 0.05 * (index + 1),
							type: 'keyframes',
							duration: 0.2,
						}}
						viewport={{ once: true }}
						key={`${instruction.text}`}
						className={`${
							index % 2
								? index % 3
									? 'bg-secondary'
									: 'bg-secondaryDark'
								: 'bg-tertiary'
						} w-full rounded-xl text-textPrimary grid grid-cols-1 md:grid-cols-2 py-8 px-12 place-items-center sticky shadow hover:-translate-y-1 hover:shadow-md transition-all`}
						style={{
							top: `${(index + 1) * 2}em`,
						}}
					>
						<div>
							<p className='font-heading font-bold text-base md:text-2xl'>
								{instruction.text}
							</p>
						</div>
						<div className='hidden md:block'>
							<div className='max-w-xs rounded-full overflow-hidden'>
								<img
									src={instruction.image}
									alt={instruction.text}
									className='w-full h-auto object-contain'
									loading='lazy'
								/>
							</div>
						</div>
					</motion.div>
				))}
			</div>
			<div className='min-h-[20vh] md:min-h-[40vh] mt-12 flex flex-col items-center justify-center gap-8 text-center'>
				<h2 className='text-3xl md:text-6xl max-w-3xl font-heading'>
					Don't wait anymore to start taking control of your mind and
					your life.
				</h2>
				<button
					onClick={handleStartTest}
					className='px-8 py-4 mx-auto border-secondary border-2 rounded-full font-semibold hover:bg-tertiary transition-all hover:border-secondaryDark'
				>
					Take test now
				</button>
				<Link
					to={'/'}
					className='text-textSecondary underline underline-offset-4 font-heading text-xl'
				>
					Go back home? Click here.
				</Link>
			</div>
		</section>
	);
};

export default Instructions;
