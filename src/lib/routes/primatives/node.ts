import getter, { Getter } from './getter';

type Extender<T> = (r: string) => T;

const node = <T>(
	r: string,
	extend: Extender<T> = () => ({}) as T,
): {
	get: Getter;
} & T => ({
	get: getter(r),
	...extend(r),
});

export default node;
