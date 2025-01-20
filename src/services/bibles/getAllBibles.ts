import pMemoize from 'p-memoize';

import { Language } from '~src/__generated__/graphql';

import { ApiBible, getApiBibles } from './getApiBibles';
import { getFcbhBibles } from './getFcbhBibles';

function concatBibles(
	first: ApiBible[] | null,
	second: ApiBible[] | null,
): ApiBible[] {
	return [...(first || []), ...(second || [])].sort((a, b) =>
		a.title.localeCompare(b.title),
	);
}

const getAllBibles = pMemoize(
	async (
		languageId: Language,
	): Promise<{
		fcbh: ApiBible[] | null;
		api: ApiBible[] | null;
		all: ApiBible[];
	}> => {
		const fcbh = getFcbhBibles(languageId);
		const api = await getApiBibles(languageId);
		const all = concatBibles(fcbh, api);

		return { fcbh, api, all };
	},
);

export default getAllBibles;
