import { getBibleBookContent } from '../../lib/api/__generated__/bibleContent';
import getResponse from './bibleBrain.getResponse';
import { IBBFileset, IBible, IBibleBookChapter, IBibleVersion } from './types';

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
		{
			id: 'ENGKJV01DA',
			title: 'King James Version',
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
		({ book_id, book_name, chapter_start, path, duration }) => ({
			id: `${book_id}/${chapter_start}`,
			number: chapter_start,
			title: `${book_name} ${chapter_start}`,
			url: path,
			duration,
			text: textByChapterNumber[chapter_start],
		}),
	);
}
