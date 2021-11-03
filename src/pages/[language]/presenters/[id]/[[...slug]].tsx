import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
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
	GetStaticPropsResult<PresenterDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const routeLanguage = getLanguageIdByRoute(params?.language);
	const result = await getPresenterDetailPageData({
		id,
		language: routeLanguage,
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
	}));

	if (result.person?.language !== routeLanguage) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			...result,
			title: result.person?.name,
			canonicalUrl: result.person?.canonicalUrl,
		},
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
