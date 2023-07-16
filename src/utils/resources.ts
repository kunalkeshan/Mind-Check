import RESOURCES, { Resource } from '../data/resources';

const SOURCE_URL =
	'https://github.com/kunalkeshan/Mind-Check/tree/main/resources';

export const fetchAllResources = () => {
	const resources: Resource[] = [];
	RESOURCES.forEach(async (resource) => {
		const response = await fetch(`${SOURCE_URL}/${resource.url}`);
		const text = await response.text();
		resources.push({ ...resource, body: text });
	});
	return resources;
};

// export const fetchSingleResource = async () => {};
