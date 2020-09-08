import React from 'react';
import RecordingList from '../../components/molecules/recordingList';

export default function SermonList({ sermons }) {
	return (
		<div>
			<RecordingList sermons={sermons} />
		</div>
	);
}
