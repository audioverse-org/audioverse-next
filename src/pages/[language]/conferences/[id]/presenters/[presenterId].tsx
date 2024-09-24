import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import PresenterDetail, {
	PresenterDetailProps,
} from '~containers/collection/presenter';
import {
	getPresenterDetailPageData,
	getPresenterDetailPathsData,
} from '~containers/presenter/__generated__/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';

export default PresenterDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
	presenterId: string;
}>): Promise<GetStaticPropsResult<PresenterDetailProps & IBaseProps>> {
	const id = params?.presenterId as string;
	const collectionId = params?.id as string;
	const routeLanguage = getLanguageIdByRoute(params?.language);
	const result = await getPresenterDetailPageData({
		id,
		collectionId,
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
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			...result,
			collectionId,
			title: result.person?.name,
			canonicalUrl: result.person?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(
	collectionId: string
): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			`/${languageRoute}/conferences/${collectionId}/presenters/${node.id}` // Adjust based on your actual data structure
	);
}
