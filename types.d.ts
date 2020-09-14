interface Sermon {
	recordingDate: string;
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
