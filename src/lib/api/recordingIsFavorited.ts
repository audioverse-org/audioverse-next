import { recordingIsFavorited as _recordingIsFavorited } from './recordingIsFavorited.gql';

export function recordingIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _recordingIsFavorited({ id }).then(
		({ recording }) => !!recording?.viewerHasFavorited
	);
}
