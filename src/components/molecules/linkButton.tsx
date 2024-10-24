import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

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
	className,
	children,
}: PropsWithChildren<ILinkButtonProps>): JSX.Element {
	const router = useRouter();
	return isOptionalLink ? (
		<div
			role="button"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				router.push(href);
			}}
			className={clsx(styles.isOptionalLink, className)}
		>
			{children}
		</div>
	) : (
		<Link href={href} legacyBehavior>
			<a className={className}>{children}</a>
		</Link>
	);
}
