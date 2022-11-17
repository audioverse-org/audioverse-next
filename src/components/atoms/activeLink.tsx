import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { Children, ReactElement } from 'react';

type ActiveLinkProps = LinkProps & {
	children: ReactElement;
	activeClassName: string;
};

// SOURCE: https://zaiste.net/programming/reactjs/howtos/create-activelink-nextjs/

const ActiveLink = ({
	children,
	activeClassName,
	...props
}: ActiveLinkProps): JSX.Element => {
	const router = useRouter();
	const asPath = router.asPath.replace(/\?.*/, '');

	const child = Children.only(children);

	if (!child) throw new Error('Could not find child');

	const childClassName = child.props.className || '';

	const className =
		asPath === props.href || asPath === props.as
			? clsx(childClassName, activeClassName)
			: childClassName;

	return (
		<Link {...props} legacyBehavior>
			<a>
				{React.cloneElement(child, {
					className: className || null,
				})}
			</a>
		</Link>
	);
};

export default ActiveLink;
