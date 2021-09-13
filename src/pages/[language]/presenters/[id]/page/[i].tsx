import PresenterRecordings, {
	PresenterRecordingsProps,
} from '@containers/presenter/recordings';
import {
	getPresenterDetailPathsData,
	getPresenterRecordingsPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makePresenterRecordingsRoute } from '@lib/routes';

export default PresenterRecordings;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<PresenterRecordingsProps>> {
	const { id } = params;

	return await getPaginatedStaticProps(
		params,
		({ offset, first }) =>
			getPresenterRecordingsPageData({ id, offset, first }),
		(d) => d.person?.recordings?.nodes,
		(d) => d.person?.recordings?.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			makePresenterRecordingsRoute(languageRoute, node.id)
	);
}
