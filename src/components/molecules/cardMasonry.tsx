import { Masonry, RenderComponentProps } from 'masonic';
import React from 'react';

type Props<T> = {
	items: T[];
	render: React.ComponentType<RenderComponentProps<T>>;
	className?: string;
};

export default function CardMasonry<T>(props: Props<T>): JSX.Element {
	return <Masonry {...props} columnGutter={20} columnWidth={300} />;
}
