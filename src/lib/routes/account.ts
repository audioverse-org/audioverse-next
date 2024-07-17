import node from './primatives/node';

const account = (r: string) => ({
	loginLanding: node(`${r}/loginLanding`),
	login: node(`${r}/login`),
	logout: node(`${r}/logout`),
	register: node(`${r}/register`),
	preferences: node(`${r}/preferences`),
});

export default account;
