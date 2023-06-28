import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import baseStyles from './headingBase.module.scss';

type Props = {
	unpadded?: boolean;
	className?: string;
};

export default function Heading1({
	children,
	unpadded,
	className,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<h1
			className={clsx(
				baseStyles.base,
				unpadded && baseStyles.unpadded,
				className
			)}
		>
			{children}
		</h1>
	);
}
