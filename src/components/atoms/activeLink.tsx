import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

type ActiveLinkProps = LinkProps & {
	children: ReactElement;
	className?: string;
	activeClassName: string;
};

// SOURCE: https://zaiste.net/programming/reactjs/howtos/create-activelink-nextjs/

const ActiveLink = ({
	children,
	className,
	activeClassName,
	...props
}: ActiveLinkProps): JSX.Element => {
	const router = useRouter();
	const asPath = router.asPath.replace(/\?.*/, '');
	const isActive = asPath === props.href || asPath === props.as;
	const classes = isActive ? clsx(className, activeClassName) : className;

	return (
		<Link className={classes || ''} {...props} legacyBehavior>
			<a aria-current={isActive ? 'page' : false}>{children}</a>
		</Link>
	);
};

export default ActiveLink;
