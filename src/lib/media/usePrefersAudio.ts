import { useContext } from 'react';

import { MediaContext } from '~src/components/templates/andMediaContext';

export default function usePrefersAudio() {
	const context = useContext(MediaContext);

	return {
		prefersAudio: context.prefersAudio,
		setPrefersAudio: context.setPrefersAudio,
	};
}
