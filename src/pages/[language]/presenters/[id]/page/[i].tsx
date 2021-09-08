import PresenterRecordings, {
	PresenterRecordingsProps,
} from '@containers/presenter/recordings';
import { createFeed } from '@lib/createFeed';
import {
	getPresenterDetailPathsData,
	getPresenterRecordingsPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default PresenterRecordings;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<PresenterRecordingsProps>> {
	const { id } = params;

	const response = await getPaginatedStaticProps(
		params,
		({ offset, first }) =>
			getPresenterRecordingsPageData({ id, offset, first }),
		(d) => d.person?.recordings?.nodes,
		(d) => d.person?.recordings?.aggregate?.count
	);

	const rssPath = await createFeed(
		response.props.data?.person?.name,
		params,
		response.props.nodes,
		`presenters/${id}.xml`
	);

	return {
		...response,
		props: {
			rssPath,
			...response.props,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) => `/${languageRoute}/presenters/${node.id}/page/1`
	);
}
