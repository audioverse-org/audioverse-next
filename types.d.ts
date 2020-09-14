interface Sermon {
	id: string;
	description: string;
	persons: Person[];
	title: string;
}

interface Person {
	name: string;
}

interface StaticPaths {
	paths: string[];
	fallback: string;
}
