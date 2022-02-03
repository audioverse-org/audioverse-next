import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Team from '@containers/about/team';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeAboutPage } from '@lib/routes';

export default Team;

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
		paths: getLanguageRoutes().map((base_url) => makeAboutPage(base_url, 13)),
		fallback: false,
	};
}
