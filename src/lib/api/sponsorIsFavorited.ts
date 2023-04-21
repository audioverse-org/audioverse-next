import { sponsorIsFavorited as _sponsorIsFavorited } from './__generated__/sponsorIsFavorited';
import { Scalars } from '@src/__generated__/graphql';

export function sponsorIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _sponsorIsFavorited({ id }).then(
		({ sponsor }) => !!sponsor?.viewerHasFavorited
	);
}
