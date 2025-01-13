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

type Options<T> = {
	prerenderLimit?: number;
	parseHasNextPage?: (data: T) => boolean;
};

const languages = Object.values(Language).filter(
	(l) => l !== Language.Nordic,
) as SupportedLanguages[];

async function getPathsForLanguage<DATA, NODE>({
	paths = [],
	getter,
	first,
	parseNodes,
	pathMapper,
	parseHasNextPage,
	language,
}: {
	paths?: string[];
	getter: Getter<DATA>;
	first: number;
	parseNodes: (data: DATA) => NODE[] | null | undefined;
	pathMapper: (languageRoute: string, node: NODE) => string;
	parseHasNextPage?: (data: DATA) => boolean;
	language: Language;
}) {
	const data = await getter({
		language,
		first,
	});

	const nodes = parseNodes(data) || [];
	const hasNextPage = parseHasNextPage && parseHasNextPage(data);
	const routes = LANGUAGES[language].base_urls;

	paths.push(...routes.map((r) => nodes.map((n) => pathMapper(r, n))).flat());

	if (!hasNextPage) return paths;

	return getPathsForLanguage({
		paths,
		getter,
		first,
		parseNodes,
		pathMapper,
		parseHasNextPage,
		language,
	});
}

export async function getDetailStaticPaths<DATA, NODE>(
	getter: Getter<DATA>,
	parseNodes: (data: DATA) => NODE[] | null | undefined,
	pathMapper: (languageRoute: string, node: NODE) => string,
	{
		parseHasNextPage = () => false,
		prerenderLimit = DETAIL_PRERENDER_LIMIT,
	}: Options<DATA> = {},
): Promise<GetStaticPathsResult> {
	const first =
		prerenderLimit === Infinity ? DETAIL_PRERENDER_LIMIT : prerenderLimit;

	const pathSetPromises = languages.map(async (language) => {
		return getPathsForLanguage<DATA, NODE>({
			getter,
			first,
			parseNodes,
			pathMapper,
			parseHasNextPage,
			language,
		});
	});

	const pathSets = await Promise.all(pathSetPromises);

	return {
		paths: pathSets.flat(),
		fallback: 'blocking',
	};
}
