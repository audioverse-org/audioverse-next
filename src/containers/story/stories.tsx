import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { makeStoryListPage, makeStoryRoute } from '@lib/routes';
import { StoriesStaticProps } from '@pages/[language]/stories/page/[i]';

type Props = StoriesStaticProps['props'];

// TODO: Rename file to list.tsx

function Stories({ nodes, pagination }: Props): JSX.Element {
	// TODO: Use PaginatedList component
	return (
		<>
			<h1>
				<FormattedMessage
					id="storiesListPage__pageTitle"
					defaultMessage="Stories"
					description="Stories list page title"
				/>
			</h1>
			<RecordingList recordings={nodes} makeRoute={makeStoryRoute} />
			<Pagination makeRoute={makeStoryListPage} {...pagination} />
		</>
	);
}

export default withFailStates(Stories, ({ nodes }) => !nodes?.length);
