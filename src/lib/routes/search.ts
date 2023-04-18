import paginatedNode from './primatives/paginatedNode';

const search = (r: string) => ({
	collections: paginatedNode(`${r}/collections`),
	persons: paginatedNode(`${r}/persons`),
	sequences: paginatedNode(`${r}/sequences`),
	sponsors: paginatedNode(`${r}/sponsors`),
	teachings: paginatedNode(`${r}/teachings`),
});

export default search;
