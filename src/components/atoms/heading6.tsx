import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './heading6.module.scss';
import baseStyles from './headingBase.module.scss';

type Props = {
	loose?: boolean;
	sans?: boolean;
	unpadded?: boolean;
	uppercase?: boolean;
	className?: string;
};

export default function Heading6({
	children,
	loose,
	sans,
	unpadded,
	uppercase,
	className,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<h6
			className={clsx(
				baseStyles.base,
				sans && baseStyles.sans,
				unpadded && baseStyles.unpadded,
				loose && styles.loose,
				uppercase && styles.uppercase,
				className
			)}
		>
			{children}
		</h6>
	);
}
