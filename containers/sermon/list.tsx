import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import withFailStates from '@components/templates/withFailStates';

function SermonList({ sermons }) {
	return (
		<div>
			<RecordingList sermons={sermons} />
		</div>
	);
}

const should404 = (props) => !props.sermons?.length;

export default withFailStates(SermonList, should404);
