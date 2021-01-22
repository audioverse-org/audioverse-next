import Head from 'next/head';
import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { GetSermonListStaticPropsQuery } from '@lib/generated/graphql';
import {
	makeSermonListBaseRoute,
	makeSermonListRouteAll,
	makeSermonListRouteAudio,
	makeSermonListRouteVideo,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Sermons = NonNullable<GetSermonListStaticPropsQuery['sermons']['nodes']>;

export interface SermonListProps {
	nodes: Sermons;
	rssPath: string;
	filter: string;
	pagination: {
		current: number;
		total: number;
	};
}

function SermonList({ nodes, pagination, rssPath, filter }: SermonListProps) {
	const lang = useLanguageRoute();

	return (
		<div>
			<Head>
				<link type="application/atom+xml" rel="alternate" href={rssPath} />
			</Head>
			<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
				RSS
			</a>
			<div>
				<a href={makeSermonListRouteAll(lang, 1)}>All</a>
				<a href={makeSermonListRouteVideo(lang, 1)}>Video</a>
				<a href={makeSermonListRouteAudio(lang, 1)}>Audio</a>
			</div>
			<RecordingList recordings={nodes} />
			<Pagination
				current={pagination.current}
				total={pagination.total}
				base={makeSermonListBaseRoute(lang, filter)}
			/>
		</div>
	);
}

const should404 = (props: SermonListProps) => !props.nodes?.length;

export default withFailStates(SermonList, should404);
