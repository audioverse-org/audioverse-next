import { Scalars } from '@src/__generated__/graphql';

import { sponsorIsFavorited as _sponsorIsFavorited } from '@src/lib/api/__generated__/sponsorIsFavorited';

export function sponsorIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _sponsorIsFavorited({ id }).then(
		({ sponsor }) => !!sponsor?.viewerHasFavorited
	);
}
