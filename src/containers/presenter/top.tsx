import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import { BaseColors } from '~lib/constants';
import { Must } from '~src/types/types';

import { PresenterPivotFragment } from './__generated__/pivot';
import { GetPresenterTopPageDataQuery } from './__generated__/top';
import PresenterPivot from './pivot';

export type PresenterTopProps = GetPresenterTopPageDataQuery;

function PresenterTop({
	person,
}: Must<PresenterTopProps> & {
	data: { person: Must<PresenterPivotFragment> };
}): JSX.Element {
	return (
		<PresenterPivot {...{ person }}>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="presenterTopDetail__heading"
					defaultMessage="Most Listened"
				/>
			</LineHeading>
			<CardGroup>
				{person.recordings.nodes?.map((node) => (
					<CardRecording recording={node} key={node.canonicalPath} />
				))}
			</CardGroup>
		</PresenterPivot>
	);
}

export default withFailStates(PresenterTop, {
	useShould404: ({ person }) => !person,
});
