import RESOURCES, { Resource } from '../data/resources';

const SOURCE_URL = '/resources';

export const fetchAllResources = async () => {
	const data = RESOURCES.map(async (resource) => {
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
