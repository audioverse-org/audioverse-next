import React from 'react';

import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import withFailStates from '@components/templates/withFailStates';

export interface SermonListProps {
	nodes: Sermon[];
	pagination: {
		current: number;
		total: number;
	};
}

function SermonList({ nodes, pagination }: SermonListProps) {
	return (
		<div>
			<RecordingList sermons={nodes} />
			<Pagination
				current={pagination.current}
				total={pagination.total}
				base={'/en/sermons'}
			/>
		</div>
	);
}

const should404 = (props: SermonListProps) => !props.nodes?.length;

export default withFailStates(SermonList, should404);
