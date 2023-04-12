import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const teachings = (r: string) => ({
	all: paginatedNode(`${r}/all`, (r) => ({
		feed: node(`${r}/feed.xml`),
	})),
	audio: paginatedNode(`${r}/audio`),
	video: paginatedNode(`${r}/video`),
	trending: {
		filter: (filter = 'all') => node(`${r}/trending/${filter}`),
	},
});

export default teachings;
