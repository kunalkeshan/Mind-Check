import RESOURCES, { Resource } from '../data/resources';

const SOURCE_URL = '/resources';

export const fetchAllResources = async () => {
	const resources: Resource[] = [];
	RESOURCES.forEach(async (resource) => {
		if (localStorage.getItem(resource.url)) {
			const data = JSON.parse(
				localStorage.getItem(resource.url) as string
			) as Resource;
			resources.push(data);
		} else {
			const response = await fetch(`${SOURCE_URL}/${resource.url}.md`);
			const text = await response.text();
			const data = { ...resource, body: text } as Resource;
			localStorage.setItem(resource.url, JSON.stringify(data));
			resources.push(data);
		}
	});
	return resources;
};

export const fetchSingleResource = async (url: string) => {
	const resource = RESOURCES.find((res) => res.url === url);
	if (!resource) throw new Error('Given URL is invalid.');
	if (localStorage.getItem(url)) {
		const data = JSON.parse(
			localStorage.getItem(url) as string
		) as Resource;
		return data;
	} else {
		const response = await fetch(`${SOURCE_URL}/${url}.md`);
		const text = await response.text();
		const data = { ...resource, body: text } as Resource;
		localStorage.setItem(resource.url, JSON.stringify(data));
		return data;
	}
};
