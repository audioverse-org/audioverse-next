import node from './primatives/node';

const discover = (r: string) => ({
	collections: node(`${r}/collections`),
});

export default discover;
