import { Scalars } from '@src/__generated__/graphql';

import { recordingIsFavorited as _recordingIsFavorited } from '@lib/api/__generated__/recordingIsFavorited';

export function recordingIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _recordingIsFavorited({ id }).then(
		({ recording }) => !!recording?.viewerHasFavorited
	);
}
