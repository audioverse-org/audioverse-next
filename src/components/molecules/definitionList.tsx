import React from 'react';

import Heading6 from '@components/atoms/heading6';

import styles from './definitionList.module.scss';

export type IDefinitionListTerm = {
	term: string;
	definition: JSX.Element | string;
};

type Props = {
	terms: IDefinitionListTerm[];
};

export default function DefinitionList({ terms }: Props): JSX.Element {
	return (
		<dl className={styles.dl}>
			{terms.map(({ term, definition }, index) => (
				<React.Fragment key={index}>
					<dt className={styles.dt}>
						<Heading6 sans unpadded uppercase>
							{term}
						</Heading6>
					</dt>
					<dd className={styles.dd}>{definition}</dd>
				</React.Fragment>
			))}
		</dl>
	);
}
