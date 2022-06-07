import { Beacon } from '../types/window';

export default function getBeacon(): Beacon | undefined {
	if (typeof window === 'undefined') {
		return;
	}
	return window.Beacon;
}
