import _ from 'lodash';

import { ENTRIES_PER_PAGE, REVALIDATE } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

// TODO: Switch any[] to T[]
export interface PaginatedStaticProps {
	props: {
		nodes: any[];
		pagination: {
			total: number;
			current: number;
		};
	};
	revalidate: number;
}

interface IGetterResolved {
	nodes?: any[] | null;
	aggregate?: {
		count: number;
	} | null;
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

export async function getPaginatedStaticProps<T extends IGetterResolved>(
	languageRoute: string,
	pageIndex: number | string,
	getter: Getter<T>
): Promise<PaginatedStaticProps> {
	const result = await getter({
		language: getLanguageIdByRoute(languageRoute),
		offset: (+pageIndex - 1) * ENTRIES_PER_PAGE,
		first: ENTRIES_PER_PAGE,
	}).catch(() => ({}));

	const nodes = _.get(result, 'nodes', []);
	const count = _.get(result, 'aggregate.count', 0);
	const total = Math.ceil(count / ENTRIES_PER_PAGE);

	return {
		props: {
			nodes,
			pagination: {
				total,
				current: +pageIndex,
			},
		},
		revalidate: REVALIDATE,
	};
}
