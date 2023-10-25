import React from 'react';

const isComponentEmpty = (component: React.ReactNode): boolean => {
	// Check if the component is null, undefined, or has no children
	return (
		component === null ||
		component === undefined ||
		React.Children.count(component) === 0
	);
};

export default isComponentEmpty;
