import node from './primatives/node';

const contact = (r: string) => ({
	testimonies: node(`${r}/testimonies`),
	subpath: (subpath: string) => node(`${r}${subpath}`),
});

export default contact;
