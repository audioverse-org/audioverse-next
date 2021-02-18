import ConferenceList, {
	ConferenceListProps,
} from '@containers/conference/list';
import {
	getConferenceListPageData,
	getConferenceListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default ConferenceList;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<StaticProps<ConferenceListProps>> {
	return getPaginatedStaticProps(
		params,
		getConferenceListPageData,
		'conferences.nodes',
		'conferences.aggregate.count'
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('conferences', async (language) => {
		const response = await getConferenceListPathsData({ language });

		return response?.conferences.aggregate?.count || 0;
	});
}
