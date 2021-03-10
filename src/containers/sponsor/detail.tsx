import React from 'react';
import RecordingList from '@components/molecules/recordingList';
import { SponsorStaticProps } from '@pages/[language]/sponsors/[id]/page/[i]';
import Pagination from '@components/molecules/pagination';
import { makeSponsorRoute } from '@lib/routes';
import withFailStates from '@components/HOCs/withFailStates';

type Props = SponsorStaticProps['props'];

function Sponsor({ nodes, data, pagination }: Props): JSX.Element {
	const img = data?.sponsor?.imageWithFallback?.url;
	return (
		<>
			{img && <img alt={data?.sponsor?.title} src={img} />}
			<h1>{data?.sponsor?.title}</h1>
			<RecordingList recordings={nodes} />
			<Pagination
				{...pagination}
				makeRoute={(l, i) => makeSponsorRoute(l, data?.sponsor?.id || '', i)}
			/>
		</>
	);
}

export default withFailStates(Sponsor, ({ nodes }) => !nodes?.length);
