import type { Scalars } from '@lib/generated/graphql';

import { recordingIsFavorited as _recordingIsFavorited } from './recordingIsFavorited.generated';

export function recordingIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _recordingIsFavorited({ id }).then(
		({ recording }) => !!recording?.viewerHasFavorited
	);
}
