import clsx from 'clsx';
import { Masonry, RenderComponentProps } from 'masonic';
import React from 'react';

import styles from './cardMasonry.module.scss';

type Props<T> = {
	items: T[];
	render: React.ComponentType<RenderComponentProps<T>>;
	className?: string;
};

export default function CardMasonry<T>({
	className,
	...props
}: Props<T>): JSX.Element {
	return (
		<Masonry
			{...props}
			className={clsx(styles.base, className)}
			columnGutter={20}
			columnWidth={300}
			aria-owns
			role="list"
		/>
	);
}
