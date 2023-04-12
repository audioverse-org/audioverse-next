import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const teachings = (r: string) => ({
	all: paginatedNode(`${r}/all`, (r) => ({
		feed: node(`${r}/feed.xml`),
	})),
	audio: paginatedNode(`${r}/audio`),
	video: paginatedNode(`${r}/video`),
	trending: node(`${r}/trending`, (r) => ({
		all: paginatedNode(`${r}/all`),
		audio: paginatedNode(`${r}/audio`),
		video: paginatedNode(`${r}/video`),
	})),
});

export default teachings;
