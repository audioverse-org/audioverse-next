import { PartialDeep } from 'type-fest';

type ExactAlt<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

// WORKAROUND: https://github.com/sindresorhus/type-fest/issues/117
type Must<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

type PartialDeepRecursive<T> = PartialDeep<
	T,
	{
		recurseIntoArrays: true;
	}
>;
