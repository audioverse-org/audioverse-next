import node from './primatives/node';

const contact = (r: string) => ({
	general: node(`${r}/general`),
	support: node(`${r}/support`),
	testimonies: node(`${r}/testimonies`),
});

export default contact;
