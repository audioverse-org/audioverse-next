import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import Testimonies from '@components/organisms/testimonies';
import { GetHomeStaticPropsQuery } from '@lib/generated/graphql';

type Sermons = NonNullable<GetHomeStaticPropsQuery['sermons']['nodes']>;

export interface HomeProps {
	sermons: Sermons;
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
