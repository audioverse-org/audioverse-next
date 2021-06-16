import { RenderComponentProps } from 'masonic/src/use-masonry';
import * as React from 'react';
import { ReactNode } from 'react';

export function Masonry<T>({
	items,
	render: Render,
}: {
	items: T[];
	render: React.ComponentType<RenderComponentProps<T>>;
}): ReactNode {
	return items.map((item, i) => (
		<Render key={i} data={item} index={i} width={0} />
	));
}
