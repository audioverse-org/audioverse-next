import { LocationId } from './usePlayerLocation';

export default function getPlayerLocation() {
	const player = document.getElementById('video-element');
	if (!player) throw new Error('Player not found');
	const parent = player.parentElement;
	if (!parent) throw new Error('Player parent not found');
	return parent.id.split('-')[1] as LocationId;
}
