import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import {
	GetPresenterSequencesPageDataQuery,
	PresenterPivotFragment,
} from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makePresenterSequencesRoute } from '@lib/routes';

import PresenterPivot from './pivot';

export type PresenterSequencesProps = PaginatedProps<
	NonNullable<
		NonNullable<GetPresenterSequencesPageDataQuery['sequences']['nodes']>[0]
	>,
	GetPresenterSequencesPageDataQuery
>;

function PresenterSequences({
	nodes,
	data: { person },
	pagination,
}: Must<PresenterSequencesProps> & {
	data: { person: Must<PresenterPivotFragment> };
}): JSX.Element {
	return (
		<PresenterPivot {...{ person }}>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="presenterSequencesDetail__heading"
					defaultMessage="All Series"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardSequence sequence={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makePresenterSequencesRoute(languageRoute, person.id, pageIndex)
				}
			/>
		</PresenterPivot>
	);
}

export default withFailStates(PresenterSequences, {
	useShould404: ({ nodes }) => !nodes.length,
});
