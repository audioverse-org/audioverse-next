import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getEgwAudiobookListPageData, //egw
	getEgwAudiobookListPathsData,
} from '~containers/audiobook/__generated__/egwList';
import EgwAudiobooksList, {
	EgwAudiobooksListProps,
} from '~containers/audiobook/egwList';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '~lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

export default EgwAudiobooksList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	i: string;
	language: string;
}>): Promise<GetStaticPropsResult<EgwAudiobooksListProps>> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return getPaginatedStaticProps(
		params,
		getEgwAudiobookListPageData,
		(d) => d.audiobooks.nodes,
		(d) => d.audiobooks.aggregate?.count,
		() => ({
			title: intl.formatMessage({
				id: 'egwbooks__title',
				defaultMessage: 'Ellen White',
			}),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'egwbooks',
		getEgwAudiobookListPathsData,
		(d) => d.audiobooks.aggregate?.count
	);
}
