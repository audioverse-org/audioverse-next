import {
	recordingIsFavorited as _recordingIsFavorited,
	Scalars,
} from '@/lib/generated/graphql';

export function recordingIsFavorited(id: Scalars['ID']): Promise<boolean> {
	return _recordingIsFavorited({ id }).then(
		({ recording }) => !!recording?.viewerHasFavorited
	);
}
