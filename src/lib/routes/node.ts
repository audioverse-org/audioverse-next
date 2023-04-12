import getter, { Getter } from './getter';

const node = <T>(
	r: string,
	extend: (r: string) => T = () => ({} as T)
): {
	get: Getter;
} & T => ({
	get: getter(r),
	...extend(r),
});

export default node;
