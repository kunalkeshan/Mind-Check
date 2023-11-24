/**
 * Moods Data
 */

export interface Mood {
	id: number;
	scale: number;
	emoji: string;
	mood: string;
}

// ⚠ WARNING: do not change the order.
// Index or Id is stored in firebase and later used to map out in respective sections.
const MOODS: Mood[] = [
	{ id: 0, scale: 1, emoji: '😢', mood: 'Devastated' },
	{ id: 1, scale: 2, emoji: '😞', mood: 'Sad' },
	{ id: 2, scale: 3, emoji: '😔', mood: 'Downhearted' },
	{ id: 3, scale: 4, emoji: '😐', mood: 'Neutral' },
	{ id: 4, scale: 5, emoji: '😊', mood: 'Content' },
	{ id: 5, scale: 6, emoji: '😃', mood: 'Happy' },
	{ id: 6, scale: 7, emoji: '😁', mood: 'Joyful' },
	{ id: 7, scale: 8, emoji: '😄', mood: 'Ecstatic' },
	{ id: 8, scale: 9, emoji: '😍', mood: 'Overjoyed' },
	{ id: 9, scale: 10, emoji: '🌈', mood: 'Blissful' },
];

export default MOODS;
