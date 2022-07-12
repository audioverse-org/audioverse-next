import { useContext } from 'react';
import { VjsContext } from '@components/templates/andVjs';

export function useIsContextReady() {
	const c = useContext(VjsContext);
	return c?.isReady;
}
