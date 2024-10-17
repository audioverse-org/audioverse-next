import { Getter } from './getter';
import node from './node';

const paginatedNode = <T>(
	r: string,
	extend: (r: string) => T = () => ({}) as T,
): {
	get: Getter;
	page: (page: string | number) => {
		get: Getter;
	};
} & T =>
	node(r, (r) => ({
		page: (page: string | number = 1) =>
			node(Number(page) > 1 ? `${r}/page/${page}` : r),
		...extend(r),
	}));

export default paginatedNode;
