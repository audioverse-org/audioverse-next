import {
	getPersonListLetterCounts,
	GetPersonListLetterCountsQuery,
} from '@containers/presenter/list/__generated__/list';
import All from '@containers/presenter/list/all';
import { REVALIDATE } from '@lib/constants';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import root from '@lib/routes';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

export default All;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<GetPersonListLetterCountsQuery>
> {
	return {
		props: await getPersonListLetterCounts({
			language: getLanguageIdByRoute(params?.language),
		}),
		revalidate: REVALIDATE,
	};
}

export function getStaticPaths() {
	return {
		paths: getLanguageRoutes().map((l) => root.lang(l).presenters.all.get()),
		fallback: 'blocking',
	};
}
