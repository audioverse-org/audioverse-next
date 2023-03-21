import All from '@containers/presenter/list/all';
import { REVALIDATE } from '@lib/constants';
import {
	getPersonListLetterCounts,
	GetPersonListLetterCountsQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makePresenterListAllRoute } from '@lib/routes';
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
		paths: getLanguageRoutes().map(makePresenterListAllRoute),
		fallback: 'blocking',
	};
}
