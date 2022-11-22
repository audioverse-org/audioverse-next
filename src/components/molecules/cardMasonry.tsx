import clsx from 'clsx';
import { Masonry, RenderComponentProps } from 'masonic';
import React, { useEffect } from 'react';

import styles from './cardMasonry.module.scss';

type Props<T> = {
	items: T[];
	render: React.ComponentType<RenderComponentProps<T>>;
	className?: string;
};

export default function CardMasonry<T>({
	className,
	...props
}: Props<T>): JSX.Element {
	// WORKAROUND
	// https://github.com/jaredLunde/masonic/issues/123#issuecomment-1279883331
	// https://github.com/vercel/next.js/discussions/35773#discussioncomment-3441844
	const [showComponent, setShowComponent] = React.useState(false);
	useEffect(() => {
		setShowComponent(true);
	}, []);

	return (
		<>
			{showComponent && (
				<Masonry
					{...props}
					className={clsx(styles.base, className)}
					columnGutter={20}
					columnWidth={300}
				/>
			)}
		</>
	);
}
