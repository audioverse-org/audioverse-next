import { sponsorIsFavorited as _sponsorIsFavorited } from './sponsorIsFavorited.gql';

export function sponsorIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _sponsorIsFavorited({ id }).then(
		({ sponsor }) => !!sponsor?.viewerHasFavorited
	);
}
