import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetSeriesDetailPageDataQuery } from '@lib/generated/graphql';

export interface SeriesDetailProps {
	sequence: GetSeriesDetailPageDataQuery['series'];
}

export default withFailStates<SeriesDetailProps>(Sequence, {
	useShould404: ({ sequence }) => !sequence,
});
