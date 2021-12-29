import type { Scalars } from '@lib/generated/graphql';

import { sponsorIsFavorited as _sponsorIsFavorited } from './sponsorIsFavorited.generated';

export function sponsorIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _sponsorIsFavorited({ id }).then(
		({ sponsor }) => !!sponsor?.viewerHasFavorited
	);
}
