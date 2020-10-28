// TODO: Generate GraphQL response types from queries

interface Sermon {
	audioFiles: AudioFile[];
	recordingDate: string;
	duration: number;
	id: string;
	description: string;
	persons: Person[];
	title: string;
	imageWithFallback: {
		url: string;
	};
}

interface Testimony {
	author: string;
	body: string;
	writtenDate: string;
}

interface AudioFile {
	url: string;
}

interface Person {
	name: string;
	id: string;
}

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}
