import clsx from 'clsx';
import React from 'react';

import Heading6 from '@components/atoms/heading6';
import { BaseColors } from '@lib/constants';

import baseColorStyles from '../atoms/baseColors.module.scss';

import styles from './definitionList.module.scss';

type Falsy = false | 0 | '' | null | undefined;

type Term = {
	term: JSX.Element | string;
	definition: JSX.Element | string;
};

export type IDefinitionListTerm = Term | Falsy;

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
			{terms
				.filter((t): t is Term => !!t)
				.map(({ term, definition }, index) => (
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
