import _ from 'lodash';

import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

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
	(
		language: Language,
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

// TODO: Modify so it accepts getters straight from graphql codegen
export async function getPaginatedStaticProps<T extends IGetterResolved>(
	language: string,
	pageIndex: number,
	getter: Getter<T>
): Promise<PaginatedStaticProps> {
	const langKey = _.findKey(LANGUAGES, (l) => l.base_url === language),
		offset = (pageIndex - 1) * ENTRIES_PER_PAGE;

	if (!langKey) throw Error('Missing or invalid language');

	// TODO: Fix langKey type
	const result = await getter(langKey as any, {
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
