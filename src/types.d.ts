type ExactAlt<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}

interface StaticProps<P> {
	props: P;
	revalidate: number;
}

// WORKAROUND: https://github.com/sindresorhus/type-fest/issues/117
type Must<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};
