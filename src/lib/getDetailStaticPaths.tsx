import { GetStaticPathsResult } from 'next';

import {
	DETAIL_PRERENDER_LIMIT,
	LANGUAGES,
	SupportedLanguages,
} from '~lib/constants';
import { Language } from '~src/__generated__/graphql';

type Getter<DATA> = (variables: {
	language: SupportedLanguages;
	first: number;
}) => Promise<DATA>;

export async function getDetailStaticPaths<DATA, NODE>(
	getter: Getter<DATA>,
	parseNodes: (data: DATA) => NODE[] | null | undefined,
	pathMapper: (languageRoute: string, node: NODE) => string,
): Promise<GetStaticPathsResult> {
	const languages = Object.values(Language).filter(
		(l) => l !== Language.Nordic,
	) as SupportedLanguages[];

	const pathSetPromises = languages.map(async (l) => {
		const data = await getter({
			language: l,
			first: DETAIL_PRERENDER_LIMIT,
		});
		const nodes = (data && parseNodes(data)) || [];
		const routes = LANGUAGES[l].base_urls;

		return routes.map((r) => nodes.map((n) => pathMapper(r, n))).flat();
	});

	const pathSets = await Promise.all(pathSetPromises);

	return {
		paths: pathSets.flat(),
		fallback: 'blocking',
	};
}
