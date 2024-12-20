import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardCollection from '~components/molecules/card/collection';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';

import { GetPresenterAppearsPageDataQuery } from './__generated__/appears';
import { PresenterPivotFragment } from './__generated__/pivot';
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
					root
						.lang(languageRoute)
						.presenters.id(person.id)
						.appears.page(pageIndex)
						.get()
				}
			/>
		</PresenterPivot>
	);
}

const WithFailStates = (props: Parameters<typeof PresenterAppears>[0]) => (
	<AndFailStates
		Component={PresenterAppears}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes.length }}
	/>
);
export default WithFailStates;
