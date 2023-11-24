import { motion } from 'framer-motion';

const JournalInput = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, type: 'spring' }}
			viewport={{ once: true }}
			className='mt-8 w-full bg-tertiary rounded-xl p-4 flex flex-col items-center justify-center gap-4'
		>
			<h2 className='font-heading text-xl font-bold'>
				If you'd like, share more about your day or how you're feeling.
				What's on your mind? You can type your thoughts or leave it
				blank.
			</h2>
			<hr className='w-full' />
		</motion.div>
	);
};

export default JournalInput;
