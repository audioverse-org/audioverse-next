import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Login from '~containers/account/login';
import { IBaseProps } from '~containers/base';
import { REVALIDATE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';

export default Login;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<IBaseProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			disableSidebar: true,
			title: intl.formatMessage({
				id: 'login__title',
				defaultMessage: 'Login',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			root.lang(base_url).account.login.get()
		),
		fallback: false,
	};
}
