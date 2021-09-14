import {
	sponsorIsFavorited as _sponsorIsFavorited,
	Scalars,
} from '@lib/generated/graphql';

export function sponsorIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _sponsorIsFavorited({ id }).then(
		({ sponsor }) => !!sponsor?.viewerHasFavorited
	);
}
