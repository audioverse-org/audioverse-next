import React, { ReactElement } from 'react';
import { LinkProps } from 'next/link';

export default function Link(props: LinkProps & { children: ReactElement }) {
	if (props.legacyBehavior)
		return React.cloneElement(props.children, {
			href: props.href,
		});

	return <a href={props.href as string}>{props.children}</a>;
}
