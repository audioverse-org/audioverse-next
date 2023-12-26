import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { analytics } from './analytics';

type ActiveLinkProps = LinkProps & {
	children: ReactElement;
	className?: string;
	activeClassName: string;
	linkLable?: string;
};

// SOURCE: https://zaiste.net/programming/reactjs/howtos/create-activelink-nextjs/

const ActiveLink = ({
	children,
	className,
	activeClassName,
	linkLable,
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
				onClick={() => {
					analytics.track('menuClick', { lable: linkLable });
				}}
			>
				{children}
			</a>
		</Link>
	);
};

export default ActiveLink;
