import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { VideoJsPlayer } from 'video.js';

import usePlayerManager from '~src/lib/media/usePlayerManager';

import { AndMiniplayerFragment } from './__generated__/andMiniplayer';

export type MediaContextType = {
	player: VideoJsPlayer | null;
	prefersAudio: boolean;
	setPrefersAudio: (prefersAudio: boolean) => void;
	recording: AndMiniplayerFragment | null;
	setRecording: (recording: AndMiniplayerFragment) => void;
	origin: HTMLDivElement | null;
	detail: HTMLDivElement | null;
	setDetail: (detail: HTMLDivElement | null) => void;
	miniplayer: HTMLDivElement | null;
	setMiniplayer: (miniplayer: HTMLDivElement | null) => void;
	detailId: string | number | null;
	setDetailId: (detailId: string | number | null) => void;
};

const DEFAULT_MEDIA_CONTEXT: MediaContextType = {
	player: null,
	prefersAudio: false,
	setPrefersAudio: () => void 0,
	recording: null,
	setRecording: () => void 0,
	origin: null,
	detail: null,
	setDetail: () => void 0,
	miniplayer: null,
	setMiniplayer: () => void 0,
	detailId: null,
	setDetailId: () => void 0,
};

export const MediaContext = createContext<MediaContextType>(
	DEFAULT_MEDIA_CONTEXT
);

export default function AndMediaContext({ children }: { children: ReactNode }) {
	const { player } = usePlayerManager();
	const [prefersAudio, setPrefersAudio] = useState(false);
	const [recording, setRecording] = useState<AndMiniplayerFragment | null>(
		null
	);
	const [origin, setOrigin] = useState<HTMLDivElement | null>(null);
	const [detail, setDetail] = useState<HTMLDivElement | null>(null);
	const [miniplayer, setMiniplayer] = useState<HTMLDivElement | null>(null);
	const [detailId, setDetailId] = useState<string | number | null>(null);

	const context: MediaContextType = useMemo(
		() => ({
			player,
			prefersAudio,
			setPrefersAudio,
			recording,
			setRecording,
			origin,
			detail,
			setDetail,
			miniplayer,
			setMiniplayer,
			detailId,
			setDetailId,
		}),
		[detail, detailId, miniplayer, origin, player, prefersAudio, recording]
	);

	return (
		<>
			<div
				id="location-origin"
				ref={(el) => {
					if (!el) return;
					setOrigin(el);
				}}
			/>
			<MediaContext.Provider value={context}>{children}</MediaContext.Provider>
		</>
	);
}
