import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import { Must } from '~src/types/types';

import { PresenterPivotFragment } from './__generated__/pivot';
import { GetPresenterSequencesPageDataQuery } from './__generated__/sequences';
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
					root
						.lang(languageRoute)
						.presenters.id(person.id)
						.sequences.page(pageIndex)
						.get()
				}
			/>
		</PresenterPivot>
	);
}

export default withFailStates(PresenterSequences, {
	useShould404: ({ nodes }) => !nodes.length,
});
