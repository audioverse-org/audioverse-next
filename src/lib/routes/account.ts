import node from './primatives/node';

const account = (r: string) => ({
	login: node(`${r}/login`),
	logout: node(`${r}/logout`),
	register: node(`${r}/register`),
	profile: node(`${r}/profile`),
	preferences: node(`${r}/preferences`),
});

export default account;
