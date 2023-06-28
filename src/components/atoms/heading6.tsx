import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import styles from './heading6.module.scss';
import baseStyles from './headingBase.module.scss';

type Props = {
	large?: boolean;
	loose?: boolean;
	sans?: boolean;
	ultralight?: boolean;
	unpadded?: boolean;
	uppercase?: boolean;
	className?: string;
};

export default function Heading6({
	children,
	large,
	loose,
	sans,
	ultralight,
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
				large && styles.large,
				uppercase && styles.uppercase,
				ultralight && styles.ultralight,
				className
			)}
		>
			{children}
		</h6>
	);
}
