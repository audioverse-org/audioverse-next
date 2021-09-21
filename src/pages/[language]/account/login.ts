import _ from 'lodash';
import { GetStaticPropsContext } from 'next';

import Login from '@containers/account/login';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { getValidLanguage } from '@lib/getValidLanguage';
import { makeLoginRoute } from '@lib/routes';

export default Login;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	StaticProps<{ disableSidebar: true }>
> {
	getValidLanguage(params?.language);

	// // TODO: try/catch errors to ensure proper 404 page is displayed
	// const data = await getHomeStaticProps({ language: langKey });

	return {
		props: {
			disableSidebar: true,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map(({ base_url }) => makeLoginRoute(base_url)),
		fallback: false,
	};
}
