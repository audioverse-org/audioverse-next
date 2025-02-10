import { IBible, IBibleVersion } from '../types';
import { fetchFcbhChapters } from './fetchFcbhChapters';
import fetchResponse from './fetchResponse';

export const FCBH_VERSIONS = [
	{
		id: 'ENGKJV2',
		title: 'King James Version (Dramatized)',
		abbreviation: 'KJV',
	},
];

export async function fetchFcbhBibles(): Promise<IBibleVersion[] | null> {
	const response = await fetchResponse<{ data: IBible }>('/bibles/ENGKJV?');

	if (!response) {
		return null;
	}

	return Promise.all(
		FCBH_VERSIONS.map(async (v) => {
			const books = await Promise.all(
				(response.data?.books || []).map(async (b) => {
					if (!b.book_id) {
						console.log({ b });
						throw new Error('Book ID is required');
					}
					return {
						...b,
						book_id: `${v.id}/${b.book_id}`,
						bible: { abbreviation: v.abbreviation },
						chapters_full: await fetchFcbhChapters(
							v.id,
							b.testament,
							b.book_id,
						),
					};
				}),
			);

			return {
				...response.data,
				books,
				sponsor: {
					title: 'Faith Comes By Hearing',
					website: 'http://www.faithcomesbyhearing.com/',
				},
				...v,
			};
		}),
	);
}
