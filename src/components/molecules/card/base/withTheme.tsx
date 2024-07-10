import React, { PropsWithChildren } from 'react';

import Card from '..';
import WithCardTheme, { ExtendedCardTheme } from './withCardTheme';

interface Props {
	theme: ExtendedCardTheme;
	className?: string;
}

export default function CardWithTheme({
	children,
	...props
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<Card className={props.className}>
			<WithCardTheme {...props}>{children}</WithCardTheme>
		</Card>
	);
}
