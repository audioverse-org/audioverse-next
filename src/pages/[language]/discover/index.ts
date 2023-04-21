import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { getDiscoverPageData } from '~containers/__generated__/discover';
import { IBaseProps } from '~containers/base';
import Discover, { DiscoverProps } from '~containers/discover';
import { REVALIDATE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';

export default Discover;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<DiscoverProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const data = await getDiscoverPageData({ language });

	return {
		props: {
			...data,
			title: intl.formatMessage({
				id: 'discover__title',
				defaultMessage: 'Discover',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			root.lang(base_url).discover.get()
		),
		fallback: false,
	};
}
