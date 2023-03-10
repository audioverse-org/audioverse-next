import withFailStates from '@components/HOCs/withFailStates';
import Sponsors from './list';

export type { SponsorsProps } from './list';

export default withFailStates(Sponsors, {
	useShould404: ({ sponsors }) => !sponsors?.length,
});
