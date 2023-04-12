import node from './primatives/node';

const about = (r: string) => ({
	id: (pageId: number) => node(`${r}/${pageId}`),
});

export default about;
