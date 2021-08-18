import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import styles from './roundImage.module.scss';

type Props = {
	image: any;
	alt?: string;
	className?: string;
};

export default function RoundImage({
	image,
	alt,
	className,
}: Props): JSX.Element {
	return (
		<Image
			alt={alt}
			src={image}
			width={32}
			height={32}
			className={clsx(styles.base, className)}
		/>
	);
}
