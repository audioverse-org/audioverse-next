import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { makeStoryRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { StoriesStaticProps } from '@pages/[language]/stories/page/[i]';

type Props = StoriesStaticProps['props'];

function Stories({ nodes, pagination }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h1>
				<FormattedMessage
					id="storiesListPage__pageTitle"
					defaultMessage="Stories"
					description="Stories list page title"
				/>
			</h1>
			<RecordingList recordings={nodes} route={makeStoryRoute} />
			<Pagination base={`/${languageRoute}/stories`} {...pagination} />
		</>
	);
}

export default withFailStates(Stories, ({ nodes }) => !nodes?.length);
