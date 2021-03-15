import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import { SeriesDetailStaticProps } from '@pages/[language]/series/[id]/page/[i]';
import RecordingList from '@components/molecules/recordingList';
import Pagination from '@components/molecules/pagination';
import { makeSeriesDetailRoute } from '@lib/routes';
import { useQueryString } from '@lib/useQueryString';

type Props = SeriesDetailStaticProps['props'];

function SeriesDetail({ data, nodes, pagination }: Props) {
	const id = useQueryString('id') || '';
	return (
		<>
			<img
				src={data?.series?.imageWithFallback.url}
				alt={data?.series?.title}
			/>
			<h1>{data?.series?.title}</h1>
			<RecordingList recordings={nodes} />
			<Pagination
				makeRoute={(l, i) => makeSeriesDetailRoute(l, id, i)}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(SeriesDetail, ({ nodes }) => !nodes?.length);
