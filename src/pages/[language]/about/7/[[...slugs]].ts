import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Purpose from '@containers/about/purpose';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeAboutPage } from '@lib/routes';

export default Purpose;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<IBaseProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			title: intl.formatMessage({
				id: 'ourPurpose__title',
				defaultMessage: 'Our Purpose',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => makeAboutPage(base_url, 7)),
		fallback: false,
	};
}
