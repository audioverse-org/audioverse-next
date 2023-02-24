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
	const { asPath } = useRouter();
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
