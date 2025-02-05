import { getBibleBookContent } from './__generated__/bibleContent';
import getResponse from './bibleBrain.getResponse';

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
	bookName: string;
	bookId: string;
	testament: string;
}

export const bibleFCBHJKVDramatized = {
	id: 'ENGKJV',
	fileSetId: 'ENGKJVO2DA',
	name: 'King James Version (Dramatized)',
};

export async function getBibles(): Promise<IBibleVersion[] | null> {
	const response = await getResponse<{ data: IBible }>('/bibles/ENGKJV?');
	if (!response) {
		return null;
	}

	return [
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
			website: 'http://www.faithcomesbyhearing.com/',
		},
		...v,
	}));
}

export async function getBible(
	bibleId: string,
): Promise<IBibleVersion | null | undefined> {
	return getBibles().then((bibles) => bibles?.find(({ id }) => id === bibleId));
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
	'2CH': '2Chr',
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
	MIC: 'Mic',
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
	'1TH': '1Thess',
	'2TH': '2Thess',
	'1TI': '1Tim',
	'2TI': '2Tim',
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

export const getFileSetId = (fileSetId: string, testament: string) => {
	return testament === 'OT'
		? fileSetId.replace(/^(.{6})./, '$1O')
		: fileSetId.replace(/^(.{6})./, '$1N');
};

export async function getBibleBookChapters(
	bibleId: string,
	testament: string,
	bookId: string,
): Promise<IBibleBookChapter[]> {
	const filesetId = `${bibleId.substring(0, bibleId.length - 1)}${
		testament === 'OT' ? 'O' : 'N'
	}${bibleId.substring(bibleId.length - 1)}DA`;
	const response = await getResponse<{ data: IBBFileset[] }>(
		`/bibles/filesets/${filesetId}?`,
	);
	if (!response) {
		return [];
	}

	const result = await getBibleBookContent({
		bibleId: 'ENGKJVC',
		bookId: `ENGKJVC-${bookIdMap[bookId]}`,
	});
	const chapters = result.audiobible?.book.chapters || [];
	const textByChapterNumber = chapters.reduce<Record<number, string>>(
		(carry, { text, id }) => {
			const matches = text.match(/<p>.+<\/p>/) || [];
			const key = +id.toString().split('-')[2];
			carry[key] = matches[0] || '';
			return carry;
		},
		{},
	);
	const filesets = response.data?.filter(({ book_id }) => book_id === bookId);

	filesets.sort((a, b) => a.chapter_start - b.chapter_start);

	return filesets.map(
		({ book_id, book_name, chapter_start, path, duration }) => {
			// Take into account accents in the regex
			const bookName = book_name
				.toLowerCase()
				.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
			return {
				id: `${filesetId}/${book_id}/${chapter_start}`,
				number: chapter_start,
				title: `${bookName} ${chapter_start}`,
				url: path,
				duration,
				text: textByChapterNumber[chapter_start],
				bookName,
				bookId: book_id,
				testament,
			};
		},
	);
}
