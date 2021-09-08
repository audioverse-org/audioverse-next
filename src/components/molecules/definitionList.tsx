import clsx from 'clsx';
import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';
import Heading6 from '@components/atoms/heading6';

import baseColorStyles from '../atoms/baseColors.module.scss';

import styles from './definitionList.module.scss';

export type IDefinitionListTerm = {
	term: JSX.Element | string;
	definition: JSX.Element | string;
};

type Props = {
	terms: IDefinitionListTerm[];
	textColor: BaseColors.DARK | BaseColors.LIGHT_TONE | BaseColors.WHITE;
};

export default function DefinitionList({
	terms,
	textColor,
}: Props): JSX.Element {
	return (
		<dl className={clsx(styles.dl, baseColorStyles[textColor])}>
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
