import RESOURCES, { Resource, Tags } from '../data/resources';

const SOURCE_URL = '/resources';

interface IFetchAllResourcesOptions {
	limit: number;
	sort: {
		by?: 'date';
		order: 'asc' | 'desc';
	};
}

type FetchAllResourcesOptions = Partial<IFetchAllResourcesOptions>;

const fetchAllResourcesDefaults: FetchAllResourcesOptions = {
	limit: undefined,
};

export const fetchAllResources = async (_options: FetchAllResourcesOptions) => {
	const options = { ...fetchAllResourcesDefaults, ..._options };
	let sorted: Resource[] = [];
	switch (options?.sort?.by) {
		case 'date': {
			sorted = RESOURCES.sort((a, b) =>
				options?.sort?.order === 'asc'
					? a.published.getTime() - b.published.getTime()
					: b.published.getTime() - a.published.getTime()
			);
			break;
		}
		default: {
			sorted = RESOURCES;
			break;
		}
	}
	const data = sorted.slice(0, options.limit).map(async (resource) => {
		if (sessionStorage.getItem(resource.url)) {
			const data = JSON.parse(
				sessionStorage.getItem(resource.url) as string
			) as Resource;
			return data;
		} else {
			const response = await fetch(`${SOURCE_URL}/${resource.url}.md`);
			const text = await response.text();
			const data = { ...resource, body: text } as Resource;
			sessionStorage.setItem(resource.url, JSON.stringify(data));
			return data;
		}
	});
	const resources = await Promise.all(data);
	return resources;
};

export const fetchSingleResource = async (url: string) => {
	const resource = RESOURCES.find((res) => res.url === url);
	if (!resource) throw new Error('Given URL is invalid.');
	if (sessionStorage.getItem(url)) {
		const data = JSON.parse(
			sessionStorage.getItem(url) as string
		) as Resource;
		return data;
	} else {
		const response = await fetch(`${SOURCE_URL}/${url}.md`);
		const text = await response.text();
		const data = { ...resource, body: text } as Resource;
		sessionStorage.setItem(resource.url, JSON.stringify(data));
		return data;
	}
};

export const calculateReadingTime = (text: string) => {
	const textLength = text.trim().split(/s+/gi).length;
	const AVERAGE_HUMAN_READING_TIME = 200; // words per minute;
	const totalReadingTime = Math.ceil(textLength / AVERAGE_HUMAN_READING_TIME);
	return totalReadingTime;
};

export const fetchRecommendedResources = (scores: Score['score']) => {
	function checkThreshold(section: keyof Score['score'], score: number) {
		let crossesThreshold = false;
		switch (section) {
			case 'Activities & Personal Relationships': {
				if (score >= 8) crossesThreshold = true;
				break;
			}
			case 'Physical Symptoms': {
				if (score >= 5) crossesThreshold = true;
				break;
			}
			case 'Suicidal Urges': {
				if (score >= 1) crossesThreshold = true;
				break;
			}
			case 'Thoughts & Feelings': {
				if (score >= 10) crossesThreshold = true;
				break;
			}
		}
		return crossesThreshold;
	}

	const resources: Resource[] = [];
	const tags: Tags[] = [];

	// Get Tags Crossing the threshold
	Object.keys(scores).forEach((section) => {
		const sectionScore = Object.values(
			scores[section as keyof Score['score']]
		).reduce((prev, curr) => prev + curr, 0);
		if (checkThreshold(section as keyof Score['score'], sectionScore)) {
			tags.push(section as keyof Score['score']);
		}
	});

	// Selecting Random Resources as per Tags
	tags.forEach((tag) => {
		const selectedResources = RESOURCES.filter(
			(resource) => resource.tags.findIndex((value) => value === tag) > -1
		);
		resources.push(
			selectedResources[
				Math.floor(Math.random() * selectedResources.length)
			]
		);
	});

	return resources;
};
