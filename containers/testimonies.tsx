import React from 'react';

import Pagination from '@components/molecules/pagination';

import styles from './testimonies.module.scss';

export interface TestimoniesProps {
	nodes: any[];
	pagination: {
		current: number;
		total: number;
	};
}

export default function Testimonies({
	nodes,
	pagination,
}: TestimoniesProps): JSX.Element {
	// Semantic quotations:
	// https://css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes/#hey-what-about-the-figure-element
	return (
		<>
			<ul className={styles.list}>
				{nodes.map((n, i) => (
					<li className={styles.entry} key={i}>
						<figure className={styles.figure}>
							<blockquote
								className={styles.quotation}
								dangerouslySetInnerHTML={{ __html: n.body }}
							/>
							<figcaption className={styles.source}>{n.author}</figcaption>
						</figure>
					</li>
				))}
			</ul>
			<Pagination
				current={pagination.current}
				total={pagination.total}
				base={'/en/testimonies'}
			/>
		</>
	);
}
