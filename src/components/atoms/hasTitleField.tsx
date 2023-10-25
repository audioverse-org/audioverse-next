import React from 'react';

interface ComponentWithTitleProps {
	children?: React.ReactNode;
	title?: string; // Modify this type according to your specific title field type
}

const hasTitleField = (
	component: React.ReactElement<ComponentWithTitleProps>
): boolean => {
	const { title } = component.props;

	return !!title; // Return true if the component has a non-empty title
};

export default hasTitleField;
