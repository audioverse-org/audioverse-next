// TODO: Generate GraphQL response types from queries

interface Sermon {
	audioFiles: AudioFile[];
	videoFiles: VideoFile[];
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
	mimeType: string;
}

interface VideoFile {
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
