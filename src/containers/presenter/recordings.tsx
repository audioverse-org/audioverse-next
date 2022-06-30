import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import RssAlternate from '@components/molecules/rssAlternate';
import { BaseColors } from '@lib/constants';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import useLanguageRoute from '@lib/useLanguageRoute';

import PresenterPivot from './pivot';
import { makePresenterRecordingsRoute } from '@lib/routes/makePresenterRecordingsRoute';
import { makePresenterFeedRoute } from '@lib/routes/makePresenterFeedRoute';
import { GetPresenterRecordingsPageDataQuery } from '@containers/presenter/__generated__/recordings';

export type PresenterRecordingsProps = PaginatedProps<
	NonNullable<
		NonNullable<
			NonNullable<
				GetPresenterRecordingsPageDataQuery['person']
			>['recordings']['nodes']
		>[0]
	>,
	GetPresenterRecordingsPageDataQuery
>;

function PresenterRecordings({
	nodes,
	data: { person },
	pagination,
}: Must<PresenterRecordingsProps>): JSX.Element {
	const languageRoute = useLanguageRoute();

	if (!person) {
		throw new Error('Unreachable');
	}

	return (
		<PresenterPivot {...{ person }}>
			<RssAlternate url={makePresenterFeedRoute(languageRoute, person.id)} />
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="presenterRecordingsDetail__heading"
					defaultMessage="All Recordings"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardRecording recording={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makePresenterRecordingsRoute(languageRoute, person.id, pageIndex)
				}
			/>
		</PresenterPivot>
	);
}

export default withFailStates(PresenterRecordings, {
	useShould404: ({ nodes, data }) => !nodes.length || !data?.person,
});
