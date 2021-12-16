import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryPlaybackStatus, {
	ILibraryPlaybackStatusProps,
} from '@containers/library/playbackStatus';
import { storeRequest } from '@lib/api';
import { RecordingViewerPlaybackStatus } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default LibraryPlaybackStatus;

export function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	playbackStatus: string;
}>): GetServerSidePropsResult<ILibraryPlaybackStatusProps> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);
	const playbackStatusMap = {
		unstarted: RecordingViewerPlaybackStatus.Unstarted,
		started: RecordingViewerPlaybackStatus.Started,
		finished: RecordingViewerPlaybackStatus.Finished,
	};

	const viewerPlaybackStatus =
		params?.playbackStatus &&
		Object.keys(playbackStatusMap).includes(params.playbackStatus)
			? playbackStatusMap[
					params.playbackStatus as keyof typeof playbackStatusMap
			  ]
			: null;

	if (!viewerPlaybackStatus) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			language,
			path: params?.playbackStatus as string,
			viewerPlaybackStatus,
		},
	};
}
