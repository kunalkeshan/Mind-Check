/**
 * Moods Data
 */

interface Mood {
	scale: number;
	emoji: string;
	mood: string;
}

const MOODS: Mood[] = [
	{ scale: 1, emoji: '😢', mood: 'Devastated' },
	{ scale: 2, emoji: '😞', mood: 'Sad' },
	{ scale: 3, emoji: '😔', mood: 'Downhearted' },
	{ scale: 4, emoji: '😐', mood: 'Neutral' },
	{ scale: 5, emoji: '😊', mood: 'Content' },
	{ scale: 6, emoji: '😃', mood: 'Happy' },
	{ scale: 7, emoji: '😁', mood: 'Joyful' },
	{ scale: 8, emoji: '😄', mood: 'Ecstatic' },
	{ scale: 9, emoji: '😍', mood: 'Overjoyed' },
	{ scale: 10, emoji: '🌈', mood: 'Blissful' },
];

export default MOODS;
