// TODO: Generate GraphQL response types from queries

interface Sermon {
	audioFiles: MediaFile[];
	videoFiles: MediaFile[];
	videoStreams: MediaFile[];
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

interface MediaFile {
	url: string;
	mimeType: string;
}

interface Person {
	name: string;
	id: string;
}

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}
