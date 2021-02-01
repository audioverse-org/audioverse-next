import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { GetTagDetailPageDataQuery } from '@lib/generated/graphql';
import { makeTagDetailBaseRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Recordings = NonNullable<GetTagDetailPageDataQuery['recordings']['nodes']>;

export interface TagDetailProps {
	nodes: Recordings;
	rssPath: string;
	pagination: {
		current: number;
		total: number;
	};
}

function TagDetail({
	pagination,
	nodes,
	rssPath,
}: TagDetailProps): JSX.Element {
	const router = useRouter();
	const slug = _.get(router, 'query.slug');
	const languageRoute = useLanguageRoute();
	const title = decodeURIComponent(slug);

	// TODO: Use API-supplied canonical URLs so that each entity type
	//   gets linked properly.
	return (
		<>
			<h1>{title}</h1>
			<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
				RSS
			</a>
			<RecordingList recordings={nodes} />
			<Pagination
				current={pagination.current}
				total={pagination.total}
				base={makeTagDetailBaseRoute(languageRoute, slug)}
			/>
		</>
	);
}

const should404 = (props: TagDetailProps) => !props.nodes?.length;

export default withFailStates(TagDetail, should404);
