import React from 'react';

import { Person } from 'types';

export default function SpeakerName({
	person,
}: {
	person: Person;
}): JSX.Element {
	return <p>{person.name}</p>;
}
