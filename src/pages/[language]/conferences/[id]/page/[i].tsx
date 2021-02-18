import ConferenceDetail, {
	ConferenceDetailProps,
} from '@containers/conference/detail';
import {
	getConferenceDetailPageData,
	getConferenceDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeConferenceRoute } from '@lib/routes';

export default ConferenceDetail;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<ConferenceDetailProps>> {
	const { id } = params;

	return getPaginatedStaticProps(
		params,
		async ({ offset, first }) =>
			getConferenceDetailPageData({ id, offset, first }),
		'conference.recordings.nodes',
		'conference.recordings.aggregate.count'
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getConferenceDetailPathsData,
		'conferences.nodes',
		(languageRoute, node) => makeConferenceRoute(languageRoute, node.id, 1)
	);
}
