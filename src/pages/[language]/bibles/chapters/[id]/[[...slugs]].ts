import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { RecordingFragment } from '~components/organisms/__generated__/recording';
import { Recording } from '~components/organisms/recording';
import { IBaseProps } from '~containers/base';
import {
	getAudiobibleBookDetailData,
	getAudiobibleBookPathsData,
} from '~containers/bible/__generated__/book';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { RecordingContentType } from '~src/__generated__/graphql';

export default Recording;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<
		{
			recording: RecordingFragment;
		} & IBaseProps
	>
> {
	const { recording } = await getAudiobibleBookDetailData({
		id: params?.id || '',
	});
	if (
		!recording ||
		recording.contentType !== RecordingContentType.BibleChapter
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			recording,
			title: recording?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getAudiobibleBookPathsData,
		(d) => d.recordings.nodes,
		(l, { canonicalPath }) => canonicalPath,
	);
}
