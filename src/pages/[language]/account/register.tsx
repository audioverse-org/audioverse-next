import _ from 'lodash';
import { GetStaticPropsContext } from 'next';

import Register from '@containers/account/register';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { getValidLanguage } from '@lib/getValidLanguage';
import { makeRegisterRoute } from '@lib/routes';

export default Register;

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
		paths: _.values(LANGUAGES).map(({ base_url }) =>
			makeRegisterRoute(base_url)
		),
		fallback: false,
	};
}
