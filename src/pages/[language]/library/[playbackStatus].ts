import { GetServerSidePropsContext } from 'next';

import LibraryPlaybackStatus, {
	getLibraryPlaybackStatusDataVariables,
	ILibraryPlaybackStatusProps,
} from '@containers/library/playbackStatus';
import { storeRequest } from '@lib/api';
import {
	getLibraryData,
	RecordingViewerPlaybackStatus,
} from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default LibraryPlaybackStatus;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	playbackStatus: string;
}>): Promise<DehydratedProps<ILibraryPlaybackStatusProps>> {
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

	return getDehydratedProps(
		[
			[
				'getLibraryData',
				() =>
					getLibraryData(
						getLibraryPlaybackStatusDataVariables(
							language,
							viewerPlaybackStatus
						)
					),
			],
		],
		{
			language,
			path: params?.playbackStatus as string,
			viewerPlaybackStatus,
		}
	);
}
