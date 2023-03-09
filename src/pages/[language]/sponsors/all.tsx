import Sponsors from '@containers/sponsor/list.all';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSponsorListAllRoute } from '@lib/routes';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export default Sponsors;

export function getStaticProps(): GetStaticPropsResult<unknown> {
	return {
		props: {},
	};
}

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: getLanguageRoutes().map(makeSponsorListAllRoute),
		fallback: false,
	};
}
