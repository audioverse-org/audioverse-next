import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Register from '@containers/account/register';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeRegisterRoute } from '@lib/routes';

export default Register;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<IBaseProps>
> {
	return {
		props: {
			disableSidebar: true,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => makeRegisterRoute(base_url)),
		fallback: false,
	};
}
