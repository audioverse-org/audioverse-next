import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import styles from './roundImage.module.scss';

type Props = {
	image: any;
	small?: boolean;
	alt?: string;
	className?: string;
};

export default function RoundImage({
	image,
	small,
	alt,
	className,
}: Props): JSX.Element {
	const size = small ? 24 : 32;
	return (
		<Image
			alt={alt}
			src={image}
			width={size}
			height={size}
			className={clsx(styles.base, small && styles.small, className)}
		/>
	);
}
