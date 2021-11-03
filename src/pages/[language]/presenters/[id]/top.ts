import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import PresenterTop, { PresenterTopProps } from '@containers/presenter/top';
import { REVALIDATE } from '@lib/constants';
import {
	getPresenterDetailPathsData,
	getPresenterTopPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makePresenterTopRecordingsRoute } from '@lib/routes';

export default PresenterTop;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<PresenterTopProps>
> {
	const id = params?.id as string;
	const { person } = await getPresenterTopPageData({
		id,
		offset: 0,
		first: 24,
	}).catch(() => ({
		person: null,
	}));

	if (person?.language !== getLanguageIdByRoute(params?.language)) {
		return {
			notFound: true,
		};
	}

	return {
		props: { person },
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
