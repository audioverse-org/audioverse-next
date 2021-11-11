import { sortBy } from 'lodash';

const API_URL = 'https://4.dbt.io/api';
const API_KEY = process.env.BIBLE_BRAIN_KEY;

export interface IBibleVersion {
	id: string;
	title: string;
	abbreviation: string;
	description?: string;
	books: IBibleBook[];
	sponsor: {
		title: string;
		url: string;
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
interface IBBFileset {
	book_id: string;
	book_name: string;
	chapter_start: number;
	path: string;
	duration: number;
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
}

export async function getBibles(): Promise<IBibleVersion[] | null> {
	const response = await getResponse<{ data: IBible }>('/bibles/ENGKJV?');
	if (!response) {
		return null;
	}

	return [
		{
			id: 'ENGKJV1',
			title: 'King James Version',
			abbreviation: 'KJV',
		},
		{
			id: 'ENGKJV2',
			title: 'King James Version (Dramatized)',
			abbreviation: 'KJV',
		},
	].map((v) => ({
		...response.data,
		books: (response.data?.books || []).map((b) => ({
			...b,
			book_id: `${v.id}/${b.book_id}`,
			bible: { abbreviation: v.abbreviation },
		})),
		sponsor: {
			title: 'Faith Comes By Hearing',
			url: 'http://www.faithcomesbyhearing.com/',
		},
		...v,
	}));
}

export async function getBible(
	bibleId: string
): Promise<IBibleVersion | null | undefined> {
	return getBibles().then((bibles) => bibles?.find(({ id }) => id === bibleId));
}

export async function getBibleBookChapters(
	bibleId: string,
	testament: string,
	bookId: string
): Promise<IBibleBookChapter[]> {
	const filesetId = `${bibleId.substring(0, bibleId.length - 1)}${
		testament === 'OT' ? 'O' : 'N'
	}${bibleId.substring(bibleId.length - 1)}DA`;
	const response = await getResponse<{ data: IBBFileset[] }>(
		`/bibles/filesets/${filesetId}?`
	);
	if (!response) {
		return [];
	}

	return sortBy(
		response.data?.filter(({ book_id }) => book_id === bookId),
		['chapter_start']
	).map(({ book_id, book_name, chapter_start, path, duration }) => ({
		id: `${book_id}/${chapter_start}`,
		number: chapter_start,
		title: `${book_name} ${chapter_start}`,
		url: path,
		duration,
	}));
}

async function getResponse<T extends Record<string, unknown>>(
	route: string
): Promise<T | null> {
	const result = await fetch(`${API_URL}${route}&v=4&key=${API_KEY}`, {
		method: 'GET',
	});

	try {
		return JSON.parse(await result.text());
	} catch (e) {
		return null;
	}
}
