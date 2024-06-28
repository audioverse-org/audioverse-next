import { useContext } from 'react';

import { MediaContext } from '~src/components/templates/andMediaContext';

export default function usePlayer() {
	const { player } = useContext(MediaContext);

	return {
		player,
	};
}
