import { IBibleVersion } from '../types';

const versions: IBibleVersion[] = [
	{
		description:
			'The King James Version, commonly known as the Authorized Version or King James Bible, is an English translation of the Christian Bible for the Church of England begun in 1604 and completed in 1611.',
		books: [
			{
				book_id: 'GEN',
				name: 'GENESIS',
				name_short: 'GENESIS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
				],
				book_seq: 'A01',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'EXO',
				name: 'EXODUS',
				name_short: 'EXODUS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40,
				],
				book_seq: 'A02',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'LEV',
				name: 'LEVITICUS',
				name_short: 'LEVITICUS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27,
				],
				book_seq: 'A03',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'NUM',
				name: 'NUMBERS',
				name_short: 'NUMBERS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
				],
				book_seq: 'A04',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'DEU',
				name: 'DEUTERONOMY',
				name_short: 'DEUTERONOMY',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
				],
				book_seq: 'A05',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JOS',
				name: 'JOSHUA',
				name_short: 'JOSHUA',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24,
				],
				book_seq: 'A06',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JDG',
				name: 'JUDGES',
				name_short: 'JUDGES',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21,
				],
				book_seq: 'A07',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'RUT',
				name: 'RUTH',
				name_short: 'RUTH',
				chapters: [1, 2, 3, 4],
				book_seq: 'A08',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1SA',
				name: '1 SAMUEL',
				name_short: '1 SAMUEL',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
				],
				book_seq: 'A09',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2SA',
				name: '2 SAMUEL',
				name_short: '2 SAMUEL',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24,
				],
				book_seq: 'A10',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1KI',
				name: '1 KINGS',
				name_short: '1 KINGS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22,
				],
				book_seq: 'A11',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2KI',
				name: '2 KINGS',
				name_short: '2 KINGS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25,
				],
				book_seq: 'A12',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1CH',
				name: '1 CHRONICLES',
				name_short: '1 CHRONICLES',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29,
				],
				book_seq: 'A13',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2CH',
				name: '2 CHRONICLES',
				name_short: '2 CHRONICLES',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
				],
				book_seq: 'A14',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'EZR',
				name: 'EZRA',
				name_short: 'EZRA',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				book_seq: 'A15',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'NEH',
				name: 'NEHEMIAH',
				name_short: 'NEHEMIAH',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				book_seq: 'A16',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'EST',
				name: 'ESTHER',
				name_short: 'ESTHER',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				book_seq: 'A17',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JOB',
				name: 'JOB',
				name_short: 'JOB',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40, 41, 42,
				],
				book_seq: 'A18',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'PSA',
				name: 'PSALMS',
				name_short: 'PSALMS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
					55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
					72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
					89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
					105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
					119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132,
					133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146,
					147, 148, 149, 150,
				],
				book_seq: 'A19',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'PRO',
				name: 'PROVERBS',
				name_short: 'PROVERBS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
				],
				book_seq: 'A20',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'ECC',
				name: 'ECCLESIASTES',
				name_short: 'ECCLESIASTES',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				book_seq: 'A21',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'SNG',
				name: 'SONG OF SOLOMON',
				name_short: 'SONG OF SOLOMON',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8],
				book_seq: 'A22',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'ISA',
				name: 'ISAIAH',
				name_short: 'ISAIAH',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
					55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
				],
				book_seq: 'A23',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JER',
				name: 'JEREMIAH',
				name_short: 'JEREMIAH',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
				],
				book_seq: 'A24',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'LAM',
				name: 'LAMENTATIONS',
				name_short: 'LAMENTATIONS',
				chapters: [1, 2, 3, 4, 5],
				book_seq: 'A25',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'EZK',
				name: 'EZEKIEL',
				name_short: 'EZEKIEL',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
				],
				book_seq: 'A26',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'DAN',
				name: 'DANIEL',
				name_short: 'DANIEL',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				book_seq: 'A27',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'HOS',
				name: 'HOSEA',
				name_short: 'HOSEA',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				book_seq: 'A28',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JOL',
				name: 'JOEL',
				name_short: 'JOEL',
				chapters: [1, 2, 3],
				book_seq: 'A29',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'AMO',
				name: 'AMOS',
				name_short: 'AMOS',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				book_seq: 'A30',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'OBA',
				name: 'OBADIAH',
				name_short: 'OBADIAH',
				chapters: [1],
				book_seq: 'A31',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JON',
				name: 'JONAH',
				name_short: 'JONAH',
				chapters: [1, 2, 3, 4],
				book_seq: 'A32',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'MIC',
				name: 'MICAH',
				name_short: 'MICAH',
				chapters: [1, 2, 3, 4, 5, 6, 7],
				book_seq: 'A33',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'NAM',
				name: 'NAHUM',
				name_short: 'NAHUM',
				chapters: [1, 2, 3],
				book_seq: 'A34',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'HAB',
				name: 'HABAKKUK',
				name_short: 'HABAKKUK',
				chapters: [1, 2, 3],
				book_seq: 'A35',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'ZEP',
				name: 'ZEPHANIAH',
				name_short: 'ZEPHANIAH',
				chapters: [1, 2, 3],
				book_seq: 'A36',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'HAG',
				name: 'HAGGAI',
				name_short: 'HAGGAI',
				chapters: [1, 2],
				book_seq: 'A37',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'ZEC',
				name: 'ZECHARIAH',
				name_short: 'ZECHARIAH',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				book_seq: 'A38',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'MAL',
				name: 'MALACHI',
				name_short: 'MALACHI',
				chapters: [1, 2, 3, 4],
				book_seq: 'A39',
				testament: 'OT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'MAT',
				name: 'MATTHEW',
				name_short: 'MATTHEW',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28,
				],
				book_seq: 'B01',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'MRK',
				name: 'MARK',
				name_short: 'MARK',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
				book_seq: 'B02',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'LUK',
				name: 'LUKE',
				name_short: 'LUKE',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24,
				],
				book_seq: 'B03',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JHN',
				name: 'JOHN',
				name_short: 'JOHN',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21,
				],
				book_seq: 'B04',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'ACT',
				name: 'ACTS',
				name_short: 'ACTS',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28,
				],
				book_seq: 'B05',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'ROM',
				name: 'ROMANS',
				name_short: 'ROMANS',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
				book_seq: 'B06',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1CO',
				name: '1 CORINTHIANS',
				name_short: '1 CORINTHIANS',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
				book_seq: 'B07',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2CO',
				name: '2 CORINTHIANS',
				name_short: '2 CORINTHIANS',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				book_seq: 'B08',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'GAL',
				name: 'GALATIANS',
				name_short: 'GALATIANS',
				chapters: [1, 2, 3, 4, 5, 6],
				book_seq: 'B09',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'EPH',
				name: 'EPHESIANS',
				name_short: 'EPHESIANS',
				chapters: [1, 2, 3, 4, 5, 6],
				book_seq: 'B10',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'PHP',
				name: 'PHILIPPIANS',
				name_short: 'PHILIPPIANS',
				chapters: [1, 2, 3, 4],
				book_seq: 'B11',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'COL',
				name: 'COLOSSIANS',
				name_short: 'COLOSSIANS',
				chapters: [1, 2, 3, 4],
				book_seq: 'B12',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1TH',
				name: '1 THESSALONIANS',
				name_short: '1 THESSALONIANS',
				chapters: [1, 2, 3, 4, 5],
				book_seq: 'B13',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2TH',
				name: '2 THESSALONIANS',
				name_short: '2 THESSALONIANS',
				chapters: [1, 2, 3],
				book_seq: 'B14',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1TI',
				name: '1 TIMOTHY',
				name_short: '1 TIMOTHY',
				chapters: [1, 2, 3, 4, 5, 6],
				book_seq: 'B15',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2TI',
				name: '2 TIMOTHY',
				name_short: '2 TIMOTHY',
				chapters: [1, 2, 3, 4],
				book_seq: 'B16',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'TIT',
				name: 'TITUS',
				name_short: 'TITUS',
				chapters: [1, 2, 3],
				book_seq: 'B17',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'PHM',
				name: 'PHILEMON',
				name_short: 'PHILEMON',
				chapters: [1],
				book_seq: 'B18',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'HEB',
				name: 'HEBREWS',
				name_short: 'HEBREWS',
				chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				book_seq: 'B19',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JAS',
				name: 'JAMES',
				name_short: 'JAMES',
				chapters: [1, 2, 3, 4, 5],
				book_seq: 'B20',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1PE',
				name: '1 PETER',
				name_short: '1 PETER',
				chapters: [1, 2, 3, 4, 5],
				book_seq: 'B21',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2PE',
				name: '2 PETER',
				name_short: '2 PETER',
				chapters: [1, 2, 3],
				book_seq: 'B22',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '1JN',
				name: '1 JOHN',
				name_short: '1 JOHN',
				chapters: [1, 2, 3, 4, 5],
				book_seq: 'B23',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '2JN',
				name: '2 JOHN',
				name_short: '2 JOHN',
				chapters: [1],
				book_seq: 'B24',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: '3JN',
				name: '3 JOHN',
				name_short: '3 JOHN',
				chapters: [1],
				book_seq: 'B25',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'JUD',
				name: 'JUDE',
				name_short: 'JUDE',
				chapters: [1],
				book_seq: 'B26',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
			{
				book_id: 'REV',
				name: 'REVELATION',
				name_short: 'REVELATION',
				chapters: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22,
				],
				book_seq: 'B27',
				testament: 'NT',
				bible: {
					abbreviation: 'KJV',
				},
			},
		],
		sponsor: {
			title: 'Faith Comes By Hearing',
			website: 'http://www.faithcomesbyhearing.com/',
		},
		id: 'ENGKJV2',
		title: 'King James Version (Dramatized)',
		abbreviation: 'KJV',
	},
];

export default versions;
