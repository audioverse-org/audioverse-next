import { createIntl } from 'react-intl';

import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount, getSermons } from '@lib/api';
import createFeed from '@lib/createFeed';
import getIntlMessages from '@lib/getIntlMessages';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SermonList;

interface StaticProps {
	props: SermonListProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { i, language: base_url } = params;

	const lang = getLanguageByBaseUrl(base_url);

	const response = await getPaginatedStaticProps(
		base_url,
		parseInt(i),
		getSermons
	);

	const messages = getIntlMessages(base_url);

	const intl = createIntl({
		locale: base_url,
		messages,
	});

	const title = intl.formatMessage(
		{
			id: 'feed-title',
			defaultMessage: 'AudioVerse Recent Recordings: {lang}',
			description: 'All sermons feed title',
		},
		{
			lang: lang.display_name,
		}
	);

	if (i === '1' && response.props.nodes) {
		await createFeed({
			recordings: response.props.nodes,
			projectRelativePath: `public/${base_url}/sermons/all.xml`,
			title,
		});
	}

	return response;
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('sermons/all', getSermonCount);
}
