import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetSeriesDetailPageDataQuery } from '@lib/generated/graphql';

export interface SeriesDetailProps {
	sequence: GetSeriesDetailPageDataQuery['series'];
	title?: string;
}

export default withFailStates<SeriesDetailProps>(
	Sequence,
	({ sequence }) => !sequence
);
