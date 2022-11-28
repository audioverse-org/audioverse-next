import clsx from 'clsx';
import { MasonryProps, RenderComponentProps } from 'masonic';
import React from 'react';
import dynamic from 'next/dynamic';

import styles from './cardMasonry.module.scss';

const Masonry = dynamic<MasonryProps<unknown>>(
	() => import('masonic').then((mod) => mod.Masonry),
	{
		ssr: false,
	}
);

type Props<T> = {
	items: T[];
	render: React.ComponentType<RenderComponentProps<T>>;
	className?: string;
};

export default function CardMasonry<T>({
	className,
	items,
	render,
}: Props<T>): JSX.Element {
	return (
		<Masonry
			items={items}
			render={
				render as unknown as React.ComponentType<RenderComponentProps<unknown>>
			}
			className={clsx(styles.base, className)}
			columnGutter={20}
			columnWidth={300}
		/>
	);
}
