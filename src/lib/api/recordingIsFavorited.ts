import { Scalars } from '~src/__generated__/graphql';

import { recordingIsFavorited as _recordingIsFavorited } from './__generated__/recordingIsFavorited';

export function recordingIsFavorited(
	id: Scalars['ID']['output']
): Promise<boolean> {
	return _recordingIsFavorited({ id }).then(
		({ recording }) => !!recording?.viewerHasFavorited
	);
}
