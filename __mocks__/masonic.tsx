import { RenderComponentProps } from 'masonic/src/use-masonry';
import { ComponentType, ReactNode } from 'react';

export function Masonry<T>({
	items,
	render: Render,
}: {
	items: T[];
	render: ComponentType<RenderComponentProps<T>>;
}): ReactNode {
	return items.map((item, i) => (
		<Render key={i} data={item} index={i} width={0} />
	));
}
