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
	const { asPath } = useRouter() || {};

	const child = Children.only(children);

	if (!child) throw new Error('Could not find child');

	const childClassName = child.props.className || '';

	const className =
		asPath === props.href || asPath === props.as
			? `${childClassName} ${activeClassName}`.trim()
			: childClassName;

	return (
		<Link {...props}>
			{React.cloneElement(child, {
				className: className || null,
			})}
		</Link>
	);
};

export default ActiveLink;
