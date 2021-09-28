import _ from 'lodash';

import Login from '@containers/account/login';
import { IBaseProps } from '@containers/base';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { makeLoginRoute } from '@lib/routes';

export default Login;

export async function getStaticProps(): Promise<StaticProps<IBaseProps>> {
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
