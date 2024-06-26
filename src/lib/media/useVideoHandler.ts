import { useRef, useState } from 'react';

import { Scalars } from '~src/__generated__/graphql';

export default function useVideoHandler() {
	const [videoHandler, setVideoHandler] = useState<(el: Element) => void>();
	const [, setVideoHandlerId] = useState<Scalars['ID']['output']>();
	const videoHandlerIdRef = useRef<Scalars['ID']['output']>();

	return {
		getVideoHandler: () => videoHandler,
		getVideoHandlerId: () => videoHandlerIdRef.current,
		setVideoHandler: (
			id: Scalars['ID']['output'],
			handler: (el: Element) => void
		) => {
			setVideoHandlerId(id);
			videoHandlerIdRef.current = id;
			setVideoHandler(() => handler);
		},
		unsetVideoHandler: () => {
			setVideoHandler(undefined);
			setVideoHandlerId(undefined);
		},
	};
}
