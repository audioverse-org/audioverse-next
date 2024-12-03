import getResponse from './getResponse';
import { IBible, IBibleVersion } from './types';

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
