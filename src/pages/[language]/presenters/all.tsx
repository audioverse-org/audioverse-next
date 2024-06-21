import { DehydratedState } from '@tanstack/react-query';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

import {
	getPersonListLetterCounts,
	GetPersonListLetterCountsQuery,
} from '~containers/presenter/list/__generated__/list';
import All from '~containers/presenter/list/all';
import { REVALIDATE } from '~lib/constants';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';
import { prefetchQueries } from '~src/__generated__/prefetch';
import serializableDehydrate from '~src/lib/serializableDehydrate';

export default All;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<
		GetPersonListLetterCountsQuery & {
			dehydratedState: DehydratedState;
		}
	>
> {
	const language = getLanguageIdByRoute(params?.language);
	const counts = await getPersonListLetterCounts({
		language,
	});
	const client = await prefetchQueries({
		getPresenterListAllPageData: { language, after: null },
	});

	return {
		props: { ...counts, dehydratedState: serializableDehydrate(client) },
		revalidate: REVALIDATE,
	};
}

export function getStaticPaths() {
	return {
		paths: getLanguageRoutes().map((l) => root.lang(l).presenters.all.get()),
		fallback: 'blocking',
	};
}
