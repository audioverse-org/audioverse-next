import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import AudiobookDetail, {
	AudiobookDetailProps,
} from '@/containers/audiobook/detail';
import { IBaseProps } from '@/containers/base';
import { REVALIDATE, REVALIDATE_FAILURE } from '@/lib/constants';
import {
	getAudiobookDetailPageData,
	getAudiobookDetailPathsData,
} from '@/lib/generated/graphql';
import { getDetailStaticPaths } from '@/lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '@/lib/getLanguageIdByRouteOrLegacyRoute';

export default AudiobookDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<AudiobookDetailProps & IBaseProps>
> {
	const id = params?.id as string;

	const { audiobook: sequence } = await getAudiobookDetailPageData({
		id,
	}).catch(() => ({
		audiobook: null,
	}));
	if (
		sequence?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			sequence,
			title: sequence?.title,
			canonicalUrl: sequence?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getAudiobookDetailPathsData,
		(d) => d.audiobooks.nodes,
		(l, { canonicalPath }) => canonicalPath
	);
}
