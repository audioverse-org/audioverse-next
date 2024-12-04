import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import RssAlternate from '~components/molecules/rssAlternate';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { Must } from '~src/types/types';

import { PresenterPivotFragment } from './__generated__/pivot';
import { GetPresenterRecordingsPageDataQuery } from './__generated__/recordings';
import PresenterPivot from './pivot';

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
}: Must<PresenterRecordingsProps> & {
	data: { person: Must<PresenterPivotFragment> };
}): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<PresenterPivot {...{ person }}>
			<RssAlternate
				url={root.lang(languageRoute).presenters.id(person.id).feed.get()}
			/>
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
					root
						.lang(languageRoute)
						.presenters.id(person.id)
						.teachings.page(pageIndex)
						.get()
				}
			/>
		</PresenterPivot>
	);
}

export default withFailStates(PresenterRecordings, {
	useShould404: ({ nodes }) => !nodes.length,
});
