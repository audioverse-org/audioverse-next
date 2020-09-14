import PropTypes from 'prop-types';
import React from 'react';

import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import withFailStates from '@components/templates/withFailStates';

interface SermonListProps {
	sermons: Sermon[];
	pagination: {
		current: number;
		total: number;
	};
}

function SermonList({ sermons, pagination }: SermonListProps) {
	return (
		<div>
			<RecordingList sermons={sermons} />
			<Pagination current={pagination.current} total={pagination.total} base={'/en/sermons'} />
		</div>
	);
}

SermonList.propTypes = {
	sermons: PropTypes.arrayOf(PropTypes.object),
	pagination: PropTypes.object,
};

const should404 = (props: SermonListProps) => !props.sermons?.length;

export default withFailStates(SermonList, should404);
