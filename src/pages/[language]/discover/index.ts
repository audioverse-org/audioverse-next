import { GetServerSidePropsContext } from 'next';

import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { prefetchQueries } from '~src/__generated__/prefetch';
import Discover from '~src/containers/discover';
import { storeRequest } from '~src/lib/api/storeRequest';
import getDehydratedProps, {
	DehydratedProps,
} from '~src/lib/getDehydratedProps';

export default Discover;

export async function getServerSideProps({
	params,
	req,
}: GetServerSidePropsContext<{ language: string }>): Promise<DehydratedProps> {
	storeRequest(req);

	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const client = await prefetchQueries({
		getDiscoverPageData: { language },
		getSectionContinueListening: { language },
		getSectionRecentTeachings: { language },
		getSectionTrendingTeachings: { language },
		getSectionFeaturedTeachings: { language },
		getSectionStorySeasons: { language },
		getSectionConferences: { language },
		getSectionBlogPosts: { language },
		getSectionTopics: { language },
		getSectionTopicsBrowse: { language },
		getSectionPresenters: { language },
		getSectionBibleBooks: { language },
		getSectionTrendingMusic: { language },
	});

	return getDehydratedProps(client, {
		title: intl.formatMessage({
			id: 'discover__title',
			defaultMessage: 'Discover',
		}),
	});
}
