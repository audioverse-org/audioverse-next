import _ from 'lodash';

import { ENTRIES_PER_PAGE, REVALIDATE } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

// TODO: Improve nodes type
export interface PaginatedStaticProps<T> {
	props: {
		nodes: any[];
		pagination: {
			total: number;
			current: number;
		};
		data: T | undefined;
	};
	revalidate: number;
}

interface Getter<T> {
	({
		language,
		offset,
		first,
	}: {
		language: Language;
		offset: number;
		first: number;
	}): Promise<T>;
}

export async function getPaginatedStaticProps<T>(
	params: {
		language: string;
		i: number | string;
	},
	getter: Getter<T>,
	nodesPath: string,
	countPath: string
): Promise<PaginatedStaticProps<T>> {
	const { language: languageRoute, i: pageIndex } = params;

	const data = await getter({
		language: getLanguageIdByRoute(languageRoute),
		offset: (+pageIndex - 1) * ENTRIES_PER_PAGE,
		first: ENTRIES_PER_PAGE,
	}).catch(() => undefined);

	const nodes = _.get(data, nodesPath, []);
	const count = _.get(data, countPath, 0);
	const total = Math.ceil(count / ENTRIES_PER_PAGE);

	return {
		props: {
			nodes,
			pagination: {
				total,
				current: +pageIndex,
			},
			data,
		},
		revalidate: REVALIDATE,
	};
}
