import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';

import styles from './linkButton.module.scss';

export type ILinkButtonProps = {
	href: string;
	/**
	 * The link should be considered optional and will not use an `<a>` tag. On mobile the link will be non-functional.
	 */
	isOptionalLink?: boolean;
	className?: string;
};

export default function LinkButton({
	href,
	isOptionalLink,
	className: classNameProp,
	children,
}: PropsWithChildren<ILinkButtonProps>): JSX.Element {
	const router = useRouter();
	const className = clsx(styles.container, classNameProp);
	return isOptionalLink ? (
		<div
			role="button"
			onClick={(e) => {
				e.preventDefault();
				router.push(href);
			}}
			className={className}
		>
			{children}
		</div>
	) : (
		<Link href={href}>
			<a className={className}>{children}</a>
		</Link>
	);
}
