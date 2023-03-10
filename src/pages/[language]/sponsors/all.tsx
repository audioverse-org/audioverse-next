import Sponsors from '@containers/sponsor/list.all';
import {
	getSponsorListLetterCounts,
	GetSponsorListLetterCountsQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSponsorListAllRoute } from '@lib/routes';
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
	};
}

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: getLanguageRoutes().map(makeSponsorListAllRoute),
		fallback: false,
	};
}
