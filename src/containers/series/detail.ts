import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import type { GetSeriesDetailPageDataQuery } from '@lib/generated/graphql';

export interface SeriesDetailProps {
	sequence: GetSeriesDetailPageDataQuery['series'];
}

export default withFailStates<SeriesDetailProps>(
	Sequence,
	({ sequence }) => !sequence
);
