interface Sermon {
	audioFiles: AudioFile[];
	recordingDate: string;
	id: string;
	description: string;
	persons: Person[];
	title: string;
}

interface AudioFile {
	url: string;
}

interface Person {
	name: string;
}

interface StaticPaths {
	paths: string[];
	fallback: string;
}
