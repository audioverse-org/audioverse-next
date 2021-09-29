import _ from 'lodash';

import Register from '@containers/account/register';
import { IBaseProps } from '@containers/base';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { makeRegisterRoute } from '@lib/routes';

export default Register;

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
		paths: _.values(LANGUAGES).map(({ base_url }) =>
			makeRegisterRoute(base_url)
		),
		fallback: false,
	};
}
