import Cookie from 'js-cookie';

export function logout(): void {
	Cookie.remove('avSession');
}
