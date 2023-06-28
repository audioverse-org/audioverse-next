import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import styles from './heading3.module.scss';
import baseStyles from './headingBase.module.scss';

type Props = {
	sans?: boolean;
	unpadded?: boolean;
	className?: string;
};

export default function Heading3({
	children,
	sans,
	unpadded,
	className,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<h3
			className={clsx(
				baseStyles.base,
				sans && clsx(baseStyles.sans, styles.sans),
				unpadded && baseStyles.unpadded,
				className
			)}
		>
			{children}
		</h3>
	);
}
