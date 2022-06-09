import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import ReleaseDetail, { ReleaseDetailProps } from '@containers/release/detail';
import {
	getMediaReleaseFormsPageData,
	getMediaReleaseFormsPathsData,
} from '@containers/release/detail.gql';
import { REVALIDATE } from '@lib/constants';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeReleaseRoute } from '@lib/routes';

export default ReleaseDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<ReleaseDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { mediaReleaseForm } = await getMediaReleaseFormsPageData({
		id,
	}).catch(() => ({
		mediaReleaseForm: null,
	}));

	return {
		props: {
			mediaReleaseForm,
			title: mediaReleaseForm?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getMediaReleaseFormsPathsData,
		(d) => d.mediaReleaseForms.nodes,
		(l, { id }) => makeReleaseRoute(l, id)
	);
}
