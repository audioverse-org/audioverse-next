import ConferenceList from '@containers/conference/list';
import {
	getConferenceListPageData,
	GetConferenceListPageDataQuery,
	getConferenceListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default ConferenceList;

type Conference = NonNullable<
	GetConferenceListPageDataQuery['conferences']['nodes']
>[0];
export type ConferenceListStaticProps = PaginatedStaticProps<
	GetConferenceListPageDataQuery,
	Conference
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<ConferenceListStaticProps> {
	return getPaginatedStaticProps(
		params,
		getConferenceListPageData,
		(d) => d.conferences.nodes,
		(d) => d.conferences.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'conferences',
		getConferenceListPathsData,
		(d) => d?.conferences.aggregate?.count
	);
}
