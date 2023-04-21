import {
	getSponsorListLetterCounts,
	GetSponsorListLetterCountsQuery,
} from '@containers/sponsor/list/__generated__/list';
import Sponsors from '@containers/sponsor/list/all';
import { REVALIDATE } from '@lib/constants';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import root from '@lib/routes';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

export default Sponsors;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<GetSponsorListLetterCountsQuery>
> {
	return {
		props: await getSponsorListLetterCounts({
			language: getLanguageIdByRoute(params?.language),
		}),
		revalidate: REVALIDATE,
	};
}

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: getLanguageRoutes().map((l) => root.lang(l).sponsors.all.get()),
		fallback: 'blocking',
	};
}
