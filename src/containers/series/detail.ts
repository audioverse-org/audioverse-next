import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetSeriesDetailPageDataQuery } from '@containers/series/detail.gql';

export interface SeriesDetailProps {
	sequence: GetSeriesDetailPageDataQuery['series'];
}

export default withFailStates<SeriesDetailProps>(
	Sequence,
	({ sequence }) => !sequence
);
