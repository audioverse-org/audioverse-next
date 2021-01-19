import _ from 'lodash';

import { DETAIL_PRERENDER_LIMIT, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

type Getter = (variables: { language: Language; first: number }) => any;

export async function getDetailStaticPaths(
	getter: Getter,
	nodesPath: string,
	pathMapper: (node: any, baseUrl: string) => string
): Promise<StaticPaths> {
	const languages = _.values(Language);

	const pathSetPromises = languages.map(async (l: Language) => {
		const result = await getter({
			language: l,
			first: DETAIL_PRERENDER_LIMIT,
		});
		const nodes = _.get(result, nodesPath, []);
		const baseUrl = LANGUAGES[l].base_url;

		return nodes.map((n: any) => pathMapper(n, baseUrl)) || [];
	});

	const pathSets = await Promise.all(pathSetPromises);

	return {
		paths: _.flatten(pathSets),
		fallback: true,
	};
}
