import flatten from 'lodash/flatten';
import values from 'lodash/values';
import { GetStaticPathsResult } from 'next';

import { DETAIL_PRERENDER_LIMIT, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

type Getter<DATA> = (variables: {
	language: Language;
	first: number;
}) => Promise<DATA>;

export async function getDetailStaticPaths<DATA, NODE>(
	getter: Getter<DATA>,
	parseNodes: (data: DATA) => NODE[] | null | undefined,
	pathMapper: (languageRoute: string, node: NODE) => string
): Promise<GetStaticPathsResult> {
	const languages = values(Language);

	const pathSetPromises = languages.map(async (l: Language) => {
		const data = await getter({
			language: l,
			first: DETAIL_PRERENDER_LIMIT,
		});
		const nodes = (data && parseNodes(data)) || [];
		const languageRoute = LANGUAGES[l].base_url;

		return nodes.map((n) => pathMapper(languageRoute, n));
	});

	const pathSets = await Promise.all(pathSetPromises);

	return {
		paths: flatten(pathSets),
		fallback: 'blocking',
	};
}
