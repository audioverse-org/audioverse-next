import { GetStaticPathsResult } from 'next';

import PresenterTop, { PresenterTopProps } from '@containers/presenter/top';
import { REVALIDATE } from '@lib/constants';
import {
	getPresenterDetailPathsData,
	getPresenterTopPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makePresenterTopRecordingsRoute } from '@lib/routes';

export default PresenterTop;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<StaticProps<PresenterTopProps>> {
	const { id } = params;
	return {
		props: await getPresenterTopPageData({
			id,
			offset: 0,
			first: 24,
		}).catch(() => ({
			person: null,
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			makePresenterTopRecordingsRoute(languageRoute, node.id)
	);
}
