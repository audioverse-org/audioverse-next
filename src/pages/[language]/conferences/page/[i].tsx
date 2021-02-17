import ConferenceList, {
	ConferenceListProps,
} from '@containers/conference/list';
import {
	getConferenceListPageData,
	getConferenceListPathsData,
} from '@lib/generated/graphql';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';

export default ConferenceList;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<StaticProps<ConferenceListProps>> {
	const { language, i } = params;
	return getPaginatedStaticProps(language, i, async (variables) => {
		return (await getConferenceListPageData(variables)).conferences;
	});
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('conferences', async (language) => {
		const response = await getConferenceListPathsData({ language });

		return response?.conferences.aggregate?.count || 0;
	});
}
