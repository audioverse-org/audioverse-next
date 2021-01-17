import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import { GetSeriesDetailDataQuery } from '@lib/generated/graphql';

type Series = NonNullable<GetSeriesDetailDataQuery['series']>;

export interface SeriesDetailProps {
	series: Series | null | undefined;
}

function SeriesDetail({ series }: SeriesDetailProps) {
	return <h1>{series?.title}</h1>;
}

export default withFailStates(SeriesDetail, (props) => !props.series);
