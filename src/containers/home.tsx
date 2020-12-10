import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import Testimonies from '@components/organisms/testimonies';

import type { Sermon } from '../../types';

export interface HomeProps {
	sermons: Sermon[];
}

export default function Home({ sermons }: HomeProps): JSX.Element {
	return (
		<div>
			<h2>Recent</h2>
			<RecordingList sermons={sermons} />
			<Testimonies />
		</div>
	);
}
