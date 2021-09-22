import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import baseStyles from './headingBase.module.scss';

type Props = {
	unpadded?: boolean;
	className?: string;
};

export default function Heading3({
	children,
	unpadded,
	className,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<h3
			className={clsx(
				baseStyles.base,
				unpadded && baseStyles.unpadded,
				className
			)}
		>
			{children}
		</h3>
	);
}
