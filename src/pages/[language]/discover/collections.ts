import { DehydratedState } from '@tanstack/react-query';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { getDiscoverCollectionsPageData } from '~containers/discover/__generated__/collections';
import DiscoverCollections, {
	IDiscoverCollectionsProps,
} from '~containers/discover/collections';
import { REVALIDATE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';
import { prefetchQueries } from '~src/__generated__/prefetch';
import serializableDehydrate from '~src/lib/serializableDehydrate';

export default DiscoverCollections;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<
		IDiscoverCollectionsProps & {
			dehydratedState: DehydratedState;
		} & IBaseProps
	>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const data = await getDiscoverCollectionsPageData({});

	const client = await prefetchQueries({
		getSectionConferences: { language },
		getSectionPresenters: { language },
		getSectionStorySeasons: { language },
		getSectionAudiobooks: { language },
		getSectionSponsors: { language },
		getSectionScriptureSongs: { language },
		getSectionSeries: { language },
	});

	return {
		props: {
			...data,
			title: intl.formatMessage({
				id: 'discoverCollections__title',
				defaultMessage: 'Discover Collections',
			}),
			dehydratedState: serializableDehydrate(client),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			root.lang(base_url).discover.collections.get()
		),
		fallback: false,
	};
}
