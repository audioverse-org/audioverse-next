import React from 'react';

import Pagination from '@components/molecules/pagination';

export interface TestimoniesProps {
	nodes: any[];
	pagination: {
		current: number;
		total: number;
	};
}

export default function Testimonies({ nodes, pagination }: TestimoniesProps): JSX.Element {
	return (
		<>
			<ul>
				{nodes.map((n, i) => (
					<li key={i} dangerouslySetInnerHTML={{ __html: n.body }} />
				))}
			</ul>
			<Pagination current={pagination.current} total={pagination.total} base={'/en/testimonies'} />
		</>
	);
}
