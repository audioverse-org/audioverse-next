import { useContext } from 'react';

import { MediaContext } from '~src/components/templates/andMediaContext';

export default function usePlayerRecording() {
	const context = useContext(MediaContext);

	return {
		recording: context.recording,
		setRecording: context.setRecording,
	};
}
