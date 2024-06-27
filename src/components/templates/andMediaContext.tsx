import React, { createContext, ReactNode } from 'react';

export type MediaContextType = object;

const DEFAULT_MEDIA_CONTEXT: MediaContextType = {};

export const MediaContext = createContext<MediaContextType>(
	DEFAULT_MEDIA_CONTEXT
);

export default function AndMediaContext({ children }: { children: ReactNode }) {
	return <MediaContext.Provider value={{}}>{children}</MediaContext.Provider>;
}
