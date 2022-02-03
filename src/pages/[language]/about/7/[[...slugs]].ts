import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Purpose from '@containers/about/purpose';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeAboutPage } from '@lib/routes';

export default Purpose;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<IBaseProps>
> {
	return {
		props: {},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => makeAboutPage(base_url, 7)),
		fallback: false,
	};
}
