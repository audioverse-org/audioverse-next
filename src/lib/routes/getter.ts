export type GetterOptions = {
	params?: Record<string, string>;
};

export type Getter = (options?: GetterOptions) => string;

const getter =
	(r: string): Getter =>
	({ params }: GetterOptions = {}) => {
		if (!params) return r;
		const paramKeys = Object.keys(params);
		if (!paramKeys.length) return r;
		const filteredKeys = paramKeys.filter((k) => !!params[k]);
		if (!filteredKeys.length) return r;
		const filteredParams = filteredKeys.reduce(
			(acc, k) => ({ ...acc, [k]: params[k] }),
			{}
		);
		const query = new URLSearchParams(filteredParams);
		return `${r}?${query.toString()}`;
	};

export default getter;
