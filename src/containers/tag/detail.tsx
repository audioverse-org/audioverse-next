import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { GetTagDetailPageDataQuery } from '@lib/generated/graphql';
import { makeTagDetailBaseRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Recordings = NonNullable<GetTagDetailPageDataQuery['recordings']['nodes']>;

export interface TagDetailProps {
	nodes: Recordings;
	pagination: {
		current: number;
		total: number;
	};
}

function TagDetail({ pagination, nodes }: TagDetailProps): JSX.Element {
	const router = useRouter();
	const slug = _.get(router, 'query.slug');
	const languageRoute = useLanguageRoute();

	return (
		<>
			<RecordingList recordings={nodes} />
			<Pagination
				current={pagination.current}
				total={pagination.total}
				base={makeTagDetailBaseRoute(languageRoute, slug)}
			/>
		</>
	);
}

export default TagDetail;
