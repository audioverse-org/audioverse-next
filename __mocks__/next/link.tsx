import React from 'react';

declare module 'next/link' {
	const __nextLink: jest.Mock;
}

export const __nextLink = jest.fn();

// WORKAROUND: https://github.com/vercel/next.js/issues/16864#issuecomment-702069418
export default function Link(props: any) {
	const clone = React.cloneElement(props.children, { href: props.href });
	return <span onClick={(e) => __nextLink({ e, props })}>{clone}</span>;
}
