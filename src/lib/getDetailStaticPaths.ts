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

const languages = Object.values(Language).filter(
	(l) => l !== Language.Nordic,
) as SupportedLanguages[];

async function getPathsForLanguage<DATA, NODE>({
	getter,
	first,
	parseNodes,
	pathMapper,
	language,
}: {
	getter: Getter<DATA>;
	first: number;
	parseNodes: (data: DATA) => NODE[] | null | undefined;
	pathMapper: (languageRoute: string, node: NODE) => string;
	language: Language;
}) {
	const data = await getter({
		language,
		first,
	});

	const nodes = parseNodes(data) || [];
	const routes = LANGUAGES[language].base_urls;

	return routes.map((r) => nodes.map((n) => pathMapper(r, n))).flat();
}

export async function getDetailStaticPaths<DATA, NODE>(
	getter: Getter<DATA>,
	parseNodes: (data: DATA) => NODE[] | null | undefined,
	pathMapper: (languageRoute: string, node: NODE) => string,
): Promise<GetStaticPathsResult> {
	const pathSets = await Promise.all(
		languages.map((language) =>
			getPathsForLanguage<DATA, NODE>({
				getter,
				first: DETAIL_PRERENDER_LIMIT,
				parseNodes,
				pathMapper,
				language,
			}).catch((e) => {
				console.log(`Failed to get some paths for language ${language}`, e);
				return [];
			}),
		),
	);

	return {
		paths: pathSets.flat(),
		fallback: 'blocking',
	};
}
