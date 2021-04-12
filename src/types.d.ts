type ExactAlt<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

type PartialDeep<T> = {
	[P in keyof T]?: PartialDeep<T[P]>;
};

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}

interface StaticProps<P> {
	props: P;
	revalidate: number;
}
