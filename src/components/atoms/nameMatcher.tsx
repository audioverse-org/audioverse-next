import React from 'react';

interface Person {
	__typename?: string;
	name: string;
}

interface NameMatcherProps {
	person: Person;
	targetName: string;
}

const NameMatcher: React.FC<NameMatcherProps> = ({ person, targetName }) => {
	return person.name === targetName;
};

export default NameMatcher;
