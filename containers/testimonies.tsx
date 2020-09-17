import React from 'react';

export interface TestimoniesProps {
	nodes: any[];
	pagination: {
		current: number;
		total: number;
	};
}

export default function Testimonies({ nodes, pagination }: TestimoniesProps): JSX.Element {
	console.log({ nodes, pagination });
	return <div>hello world</div>;
}
