import _ from 'lodash';

import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';

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
	nodes: any[];
	aggregate: {
		count: number;
	};
}

interface Getter<T> {
	(
		language: string,
		{
			offset,
			first,
		}: {
			hasVideo?: boolean | null;
			offset?: number;
			first?: number;
		}
	): Promise<T>;
}

export async function getPaginatedStaticProps<T extends IGetterResolved>(
	language: string,
	pageIndex: number,
	getter: Getter<T>
): Promise<PaginatedStaticProps> {
	const langKey = _.findKey(LANGUAGES, (l) => l.base_url === language),
		offset = (pageIndex - 1) * ENTRIES_PER_PAGE;

	if (!langKey) throw Error('Missing or invalid language');

	const result = await getter(langKey, {
		offset,
		first: ENTRIES_PER_PAGE,
	}).catch(() => ({}));

	const nodes = _.get(result, 'nodes', []),
		count = _.get(result, 'aggregate.count', 0),
		total = Math.ceil(count / ENTRIES_PER_PAGE);

	return {
		props: {
			nodes,
			pagination: {
				total,
				current: pageIndex,
			},
		},
		revalidate: 10,
	};
}
