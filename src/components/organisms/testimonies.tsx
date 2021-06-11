import React from 'react';
import { TestimoniesFragment } from '@lib/generated/graphql';

interface TestimoniesProps {
	testimonies: TestimoniesFragment[];
}

const Testimonies = ({ testimonies }: TestimoniesProps): JSX.Element => {
	return (
		<>
			{testimonies.map((t) => (
				<p key={t.id}>{t.body}</p>
			))}
		</>
	);
};

export default Testimonies;
