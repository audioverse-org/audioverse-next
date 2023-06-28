import clsx from 'clsx';
import { MasonryProps } from 'masonic';
import dynamic from 'next/dynamic';

import styles from './cardMasonry.module.scss';

const Masonry = dynamic<MasonryProps<unknown>>(
	() => import('masonic').then((mod) => mod.Masonry),
	{
		ssr: false,
	}
);

export default function CardMasonry<T>(props: MasonryProps<T>): JSX.Element {
	return (
		<Masonry
			{...{
				columnGutter: 20,
				columnWidth: 300,
				...(props as MasonryProps<unknown>),
				className: clsx(styles.base, props.className),
			}}
		/>
	);
}
