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
