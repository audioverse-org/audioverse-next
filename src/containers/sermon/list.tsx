import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import useLanguage from '@lib/useLanguage';

export interface SermonListProps {
	nodes: Sermon[];
	pagination: {
		current: number;
		total: number;
	};
}

function SermonList({ nodes, pagination }: SermonListProps) {
	const lang = useLanguage();
	const { pathname = '' } = useRouter() || {};
	const match = pathname.match(/sermons\/(\w+)\/page/i);
	const filter = _.get(match, '[1]', 'all');

	return (
		<div>
			<a
				href={`/${lang}/sermons/${filter}.xml`}
				target={'_blank'}
				rel={'noreferrer noopener'}
			>
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
				base={'/en/sermons'}
			/>
		</div>
	);
}

const should404 = (props: SermonListProps) => !props.nodes?.length;

export default withFailStates(SermonList, should404);
