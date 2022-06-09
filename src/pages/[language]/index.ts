import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Home, { HomeProps } from '@containers/home';
import { getHomeStaticProps } from '@containers/home.gql';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { getValidLanguage } from '@lib/getValidLanguage';

export default Home;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<HomeProps & IBaseProps>
> {
	const langKey = getValidLanguage(params?.language);
	const data = await getHomeStaticProps({ language: langKey });

	return {
		props: {
			data,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => `/${base_url}`),
		fallback: false,
	};
}
