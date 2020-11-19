import Head from 'next/head';
import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import useLanguage from '@lib/useLanguage';

export interface SermonListProps {
	nodes: Sermon[];
	rssPath: string;
	pagination: {
		current: number;
		total: number;
	};
}

function SermonList({ nodes, pagination, rssPath }: SermonListProps) {
	const lang = useLanguage();

	return (
		<div>
			<Head>
				<title>hello world</title>
				<link type="application/atom+xml" rel="alternate" href={rssPath} />
			</Head>
			<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
				RSS
			</a>
			<div>
				<a href={`/${lang}/sermons/all/page/1`}>All</a>
				<a href={`/${lang}/sermons/video/page/1`}>Video</a>
				<a href={`/${lang}/sermons/audio/page/1`}>Audio</a>
			</div>
			<RecordingList sermons={nodes} />
			<Pagination
				current={pagination.current}
				total={pagination.total}
				base={`/${lang}/sermons`}
			/>
		</div>
	);
}

const should404 = (props: SermonListProps) => !props.nodes?.length;

export default withFailStates(SermonList, should404);
