import sortBy from 'lodash/sortBy';

import { getBibleBookContent } from '@lib/generated/graphql';

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
	text: string;
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
	const bookIdMap: { [k: string]: string } = {
		GEN: 'Gen',
		EXO: 'Exod',
		LEV: 'Lev',
		NUM: 'Num',
		DEU: 'Deut',
		JOS: 'Josh',
		JDG: 'Judg',
		RUT: 'Ruth',
		'1SA': '1Sam',
		'2SA': '2Sam',
		'1KI': '1Kgs',
		'2KI': '2Kgs',
		'1CH': '1Chr',
		'2CH': '1Chr',
		EZR: 'Ezra',
		NEH: 'Neh',
		EST: 'Esth',
		JOB: 'Job',
		PSA: 'Ps',
		PRO: 'Prov',
		ECC: 'Eccl',
		SNG: 'Song',
		ISA: 'Isa',
		JER: 'Jer',
		LAM: 'Lam',
		EZK: 'Ezek',
		DAN: 'Dan',
		HOS: 'Hos',
		JOL: 'Joel',
		AMO: 'Amos',
		OBA: 'Obad',
		JON: 'Jonah',
		MIX: 'Mic',
		NAM: 'Nah',
		HAB: 'Hab',
		ZEP: 'Zeph',
		HAG: 'Hag',
		ZEC: 'Zech',
		MAL: 'Mal',
		MAT: 'Matt',
		MRK: 'Mark',
		LUK: 'Luke',
		JHN: 'John',
		ACT: 'Acts',
		ROM: 'Rom',
		'1CO': '1Cor',
		'2CO': '2Cor',
		GAL: 'Gal',
		EPH: 'Eph',
		PHP: 'Phil',
		COL: 'Col',
		'1TI': '1Thess',
		'2TI': '2Thess',
		'1TH': '1Tim',
		'2TH': '2Tim',
		TIT: 'Titus',
		PHM: 'Phlm',
		HEB: 'Heb',
		JAS: 'Jas',
		'1PE': '1Pet',
		'2PE': '2Pet',
		'1JN': '1John',
		'2JN': '2John',
		'3JN': '3John',
		JUD: 'Jude',
		REV: 'Rev',
	};
	const result = await getBibleBookContent({
		bibleId: 'ENGKJVC',
		bookId: `ENGKJVC-${bookIdMap[bookId]}`,
	});
	const textByChapterNumber = (result.audiobible?.book.chapters || []).reduce(
		(carry, chapter) => {
			const matches = chapter.text.match(/<p>.+<\/p>/) || [];
			carry[+(chapter.id + '').split('-')[2]] = matches[0];
			return carry;
		},
		{} as Record<number, string>
	);

	return sortBy(
		response.data?.filter(({ book_id }) => book_id === bookId),
		['chapter_start']
	).map(({ book_id, book_name, chapter_start, path, duration }) => ({
		id: `${book_id}/${chapter_start}`,
		number: chapter_start,
		title: `${book_name} ${chapter_start}`,
		url: path,
		duration,
		text: textByChapterNumber[chapter_start],
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
