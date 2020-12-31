// TODO: Generate GraphQL response types from queries

import { IncomingMessage } from 'http';

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
	summary?: string;
	website?: string | null;
	imageWithFallback?: {
		url: string;
	};
	viewerHasFavorited?: boolean;
}

interface User {
	givenName: string;
	playlists: {
		nodes: Playlist[];
	};
}

interface Playlist {
	id: string;
	title: string;
	hasRecording?: boolean;
}

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}
