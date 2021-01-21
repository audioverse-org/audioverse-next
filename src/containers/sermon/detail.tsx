import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import RecordingList from '@components/molecules/recordingList';
import { Recording } from '@components/organisms/recording';
import { GetSermonDetailDataQuery } from '@lib/generated/graphql';

export type Sermon = NonNullable<GetSermonDetailDataQuery['sermon']>;

export interface SermonDetailProps {
	sermon: Sermon | null | undefined;
}

function SermonDetail({ sermon }: SermonDetailProps) {
	// TODO: Figure out how to get rid of this type guard
	if (!sermon) return null;

	const seriesItems = sermon?.sequence?.recordings?.nodes;
	return (
		<>
			<Recording sermon={sermon} />
			{seriesItems && <RecordingList sermons={seriesItems} />}
		</>
	);
}

export default withFailStates(SermonDetail, (props) => !props.sermon);
