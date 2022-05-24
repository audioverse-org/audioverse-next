import { RenderResult } from '@testing-library/react';
import { QueryClient } from 'react-query';

declare global {
	type ExactAlt<T, Shape> = T extends Shape
		? Exclude<keyof T, keyof Shape> extends never
			? T
			: never
		: never;

	// WORKAROUND: https://github.com/sindresorhus/type-fest/issues/117
	type Must<T> = {
		[P in keyof T]-?: NonNullable<T[P]>;
	};

	type Renderer<P> = (
		options?: RendererOptions<P>
	) => Promise<RenderResult & { queryClient: QueryClient }>;
}
