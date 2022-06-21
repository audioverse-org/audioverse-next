import React from 'react';

function Head({ children }: { children: JSX.Element }): JSX.Element {
	return <div data-testid="head">{children}</div>;
}

export default Head;
