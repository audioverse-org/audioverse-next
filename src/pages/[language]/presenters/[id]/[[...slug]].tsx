import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import PresenterDetail, {
	PresenterDetailProps,
} from '@containers/presenter/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getPresenterDetailPageData,
	getPresenterDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default PresenterDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<PresenterDetailProps>
> {
	const id = params?.id as string;
	return {
		props: await getPresenterDetailPageData({
			id,
			language: getLanguageIdByRoute(params?.language),
		}).catch(() => ({
			person: null,
			sequences: {
				nodes: [],
				pageInfo: {
					hasNextPage: false,
				},
			},
			collections: {
				nodes: [],
				pageInfo: {
					hasNextPage: false,
				},
			},
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(l, { canonicalPath }) => canonicalPath
	);
}
