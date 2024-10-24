import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getAudiobookListPageData,
	getAudiobookListPathsData,
} from '~containers/audiobook/__generated__/list';
import AudiobooksList, {
	AudiobooksListProps,
} from '~containers/audiobook/list';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '~lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

export default AudiobooksList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	i: string;
	language: string;
}>): Promise<GetStaticPropsResult<AudiobooksListProps>> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return getPaginatedStaticProps(
		params,
		getAudiobookListPageData,
		(d) => d.audiobooks.nodes,
		(d) => d.audiobooks.aggregate?.count,
		() => ({
			title: intl.formatMessage({
				id: 'books__title',
				defaultMessage: 'Books',
			}),
		}),
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'books',
		getAudiobookListPathsData,
		(d) => d.audiobooks.aggregate?.count,
	);
}
