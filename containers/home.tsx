import PropTypes from 'prop-types';
import React from 'react';

import RecordingList from '@components/molecules/recordingList';

interface HomeProps {
	sermons: Sermon[];
}

export default function Home({ sermons }: HomeProps): JSX.Element {
	return (
		<div>
			<RecordingList sermons={sermons} />
		</div>
	);
}

Home.propTypes = {
	sermons: PropTypes.arrayOf(PropTypes.object),
};
