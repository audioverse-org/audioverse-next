import React from 'react';
import RecordingList from '@components/molecules/recordingList';
import { GetConferenceDetailPageDataQuery } from '@lib/generated/graphql';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeSponsorRoute } from '@lib/routes';

type Recordings = NonNullable<
	NonNullable<
		GetConferenceDetailPageDataQuery['conference']
	>['recordings']['nodes']
>;

export interface ConferenceDetailProps {
	data: GetConferenceDetailPageDataQuery | undefined;
	nodes: Recordings;
}

function ConferenceDetail({ nodes, data }: ConferenceDetailProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const sponsorId = data?.conference?.sponsor?.id;

	return (
		<>
			<h1>{data?.conference?.title}</h1>
			{sponsorId && (
				<a href={makeSponsorRoute(languageRoute, sponsorId)}>
					{data?.conference?.sponsor?.title}
				</a>
			)}
			<RecordingList recordings={nodes} />
		</>
	);
}

export default ConferenceDetail;
