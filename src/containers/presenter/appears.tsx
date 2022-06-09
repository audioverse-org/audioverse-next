import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/card/collection';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { GetPresenterAppearsPageDataQuery } from '@containers/presenter/appears.gql';
import { PresenterPivotFragment } from '@containers/presenter/pivot.gql';
import { BaseColors } from '@lib/constants';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makePresenterAlsoAppearsInRoute } from '@lib/routes';

import PresenterPivot from './pivot';

export type PresenterAppearsProps = PaginatedProps<
	NonNullable<
		NonNullable<GetPresenterAppearsPageDataQuery['collections']['nodes']>[0]
	>,
	GetPresenterAppearsPageDataQuery
>;

function PresenterAppears({
	nodes,
	data: { person },
	pagination,
}: Must<PresenterAppearsProps> & {
	data: { person: Must<PresenterPivotFragment> };
}): JSX.Element {
	return (
		<PresenterPivot {...{ person }}>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="presenterAppearsDetail__heading"
					defaultMessage="All Also Appears In"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardCollection collection={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makePresenterAlsoAppearsInRoute(languageRoute, person?.id, pageIndex)
				}
			/>
		</PresenterPivot>
	);
}

export default withFailStates(PresenterAppears, ({ nodes }) => !nodes.length);
