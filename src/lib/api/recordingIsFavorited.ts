import { recordingIsFavorited as _recordingIsFavorited } from './__generated__/recordingIsFavorited';
import { Scalars } from '@src/__generated__/graphql';

export function recordingIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _recordingIsFavorited({ id }).then(
		({ recording }) => !!recording?.viewerHasFavorited
	);
}
