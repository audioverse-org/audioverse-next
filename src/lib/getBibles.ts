import fs from 'fs';
import pMemoize from 'p-memoize';

import { Language } from '~src/__generated__/graphql';
import { BibleIndexProps } from '~src/containers/bible';
import { getAudiobibleIndexData } from '~src/containers/bible/__generated__';
import { getBibles as _getFcbhBibles } from '~src/services/fcbh/getBibles';

type ApiBible = BibleIndexProps['versions'][0];

function getFcbhBibles(languageRoute: string): ApiBible[] | null {
	if (languageRoute !== 'en') return null;

	return JSON.parse(fs.readFileSync('fcbh-bibles.json', 'utf8'));
}

async function getApiBibles(languageId: Language): Promise<ApiBible[] | null> {
	const apiData = await getAudiobibleIndexData({
		language: languageId,
	}).catch(() => null);

	return apiData?.collections.nodes || null;
}

function concatBibles(
	first: ApiBible[] | null,
	second: ApiBible[] | null,
): ApiBible[] {
	return [...(first || []), ...(second || [])].sort((a, b) =>
		a.title.localeCompare(b.title),
	);
}

const getBibles = pMemoize(
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

export default getBibles;
