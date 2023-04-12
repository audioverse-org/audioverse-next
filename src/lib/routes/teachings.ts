import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const teachings = (r: string) => ({
	filter: (filter = 'all') => paginatedNode(`${r}/${filter}`),
	all: {
		feed: node(`${r}/all/feed.xml`),
	},
	trending: {
		filter: (filter = 'all') => node(`${r}/trending/${filter}`),
	},
});

export default teachings;
