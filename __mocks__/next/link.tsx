import React from 'react';

// WORKAROUND: https://github.com/vercel/next.js/issues/16864#issuecomment-702069418
export default function Link(props: any) {
	return React.cloneElement(props.children, { href: props.href });
}
