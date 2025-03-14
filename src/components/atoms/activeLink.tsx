import clsx from 'clsx';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Link from './linkWithoutPrefetch';

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
	const { asPath } = useRouter();
	// TODO: See if useRouter exposes a prop for the current path without the query string
	// to avoid the need for this regex
	// https://nextjs.org/docs/api-reference/next/router#router-object
	const p = asPath.replace(/\?.*/, '');
	const isActive = p === props.href || p === props.as;

	return (
		<Link {...props} legacyBehavior>
			<a
				className={clsx(className, isActive && activeClassName)}
				aria-current={isActive ? 'page' : false}
			>
				{children}
			</a>
		</Link>
	);
};

export default ActiveLink;
