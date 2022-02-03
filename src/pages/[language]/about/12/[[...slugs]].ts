import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import SpiritOfAv from '@containers/about/spirit';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeAboutPage } from '@lib/routes';

export default SpiritOfAv;

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
		paths: getLanguageRoutes().map((base_url) => makeAboutPage(base_url, 12)),
		fallback: false,
	};
}
