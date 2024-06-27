import React, { createContext, ReactNode } from 'react';

export type MediaContextType = object;

export const MediaContext = createContext<MediaContextType>({});

export default function AndMediaContext({ children }: { children: ReactNode }) {
	return <MediaContext.Provider value={{}}>{children}</MediaContext.Provider>;
}
