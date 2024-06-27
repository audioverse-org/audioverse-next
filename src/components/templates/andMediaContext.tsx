import React, { createContext, ReactNode, useMemo } from 'react';
import { VideoJsPlayer } from 'video.js';

import usePlayer from '~src/lib/media/usePlayer';

export type MediaContextType = {
	player: VideoJsPlayer | null;
	movePlayer: (newParent: HTMLDivElement) => void;
};

const DEFAULT_MEDIA_CONTEXT: MediaContextType = {
	player: null,
	movePlayer: () => void 0,
};

export const MediaContext = createContext<MediaContextType>(
	DEFAULT_MEDIA_CONTEXT
);

export default function AndMediaContext({ children }: { children: ReactNode }) {
	const { player, movePlayer } = usePlayer();

	const context: MediaContextType = useMemo(
		() => ({ player, movePlayer }),
		[player, movePlayer]
	);

	return (
		<MediaContext.Provider value={context}>{children}</MediaContext.Provider>
	);
}
