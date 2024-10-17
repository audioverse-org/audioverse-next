import clsx from 'clsx';
import Image from 'next/legacy/image';
import React from 'react';

import styles from './roundImage.module.scss';

type Props = {
	image: string;
	large?: boolean;
	small?: boolean;
	alt?: string;
	className?: string;
};

export default function RoundImage({
	image,
	large,
	small,
	alt,
	className,
}: Props): JSX.Element {
	const size = large ? 64 : small ? 24 : 32;
	return (
		<Image
			alt={alt}
			src={image}
			width={size}
			height={size}
			className={clsx(
				styles.base,
				large && styles.large,
				small && styles.small,
				className,
			)}
			unoptimized
		/>
	);
}
