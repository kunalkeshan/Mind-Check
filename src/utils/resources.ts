/* eslint-disable no-mixed-spaces-and-tabs */
import RESOURCES, { Resource } from '../data/resources';

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
