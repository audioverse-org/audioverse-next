import React from 'react';

export interface TestimoniesProps {
	nodes: {}[];
	pagination: {
		current: number;
		total: number;
	};
}

export default function Testimonies({ nodes, pagination }: TestimoniesProps) {
	return <div>hello world</div>;
}
