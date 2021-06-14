type ExactAlt<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

// https://stackoverflow.com/a/61132308/937377
// https://github.com/sindresorhus/type-fest/blob/main/source/partial-deep.d.ts
// type PartialDeep<T> = T extends object
// 	? { [P in keyof T]?: PartialDeep<T[P]> }
// 	: unknown;

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}

interface StaticProps<P> {
	props: P;
	revalidate: number;
}
