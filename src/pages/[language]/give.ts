import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Give from '~containers/give';
import { REVALIDATE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';

export default Give;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
}>): Promise<GetStaticPropsResult<IBaseProps>> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			title: intl.formatMessage({
				id: 'give__title',
				defaultMessage: 'Donate',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			root.lang(base_url).give.get()
		),
		fallback: false,
	};
}
