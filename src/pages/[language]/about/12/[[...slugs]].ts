import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SpiritOfAv from '@containers/about/spirit';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeAboutPage } from '@lib/routes/makeAboutPage';

export default SpiritOfAv;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<IBaseProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			title: intl.formatMessage({
				id: 'spiritOfAv__title',
				defaultMessage: 'Spirit Of AudioVerse',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => makeAboutPage(base_url, 12)),
		fallback: false,
	};
}
