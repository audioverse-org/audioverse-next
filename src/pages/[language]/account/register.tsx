import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Register from '@containers/account/register';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeRegisterRoute } from '@lib/routes/makeRegisterRoute';

export default Register;

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
				id: 'register__title',
				defaultMessage: 'Register',
			}),
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
