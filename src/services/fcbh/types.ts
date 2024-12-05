export interface IBibleVersion {
	id: string;
	title: string;
	abbreviation: string;
	description?: string;
	books: IBibleBook[];
	sponsor: {
		title: string;
		website: string;
	};
}
export interface IBible {
	abbr: string;
	name: string;
	vname: string;
	language: string;
	iso: string;
	date: number | null;
	books: IBibleBook[];
}
export interface IBBFileset {
	book_id: string;
	book_name: string;
	chapter_start: number;
	path: string;
	duration: number;
}

export interface IBBFilesetBookChapter {
	book_id: string;
	book_name: string;
	chapter_start: number;
	chapter_end: number | null;
	verse_start: number;
	verse_start_alt: string;
	verse_end: number | null;
	verse_end_alt: number | null;
	timestamp: number | null;
	path: string;
	duration: number;
	thumbnail: string | null;
	filesize_in_bytes: number;
	youtube_url: string | null;
}

interface IBBBook {
	book_id: string;
	name: string;
	name_short: string;
	chapters: number[];
	book_seq: string;
	testament: string;
}

export interface IBibleBook extends IBBBook {
	bible: {
		abbreviation: string;
	};
}

export interface IBibleBookChapter {
	id: string;
	number: number;
	title: string;
	url: string;
	duration: number;
	text: string;
	book_name: string;
}