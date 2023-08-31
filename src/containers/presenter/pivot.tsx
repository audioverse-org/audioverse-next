import React, { PropsWithChildren } from 'react';

import Heading2 from '~components/atoms/heading2';
import RoundImage from '~components/atoms/roundImage';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import PersonTypeLockup from '~components/molecules/personTypeLockup';
import Tease from '~components/molecules/tease';

import { PresenterPivotFragment } from './__generated__/pivot';
import styles from './pivot.module.scss';

type Props = {
	person: PresenterPivotFragment;
};

export default function PresenterPivot({
	person,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	const { name, imageWithFallback } = person;
	const image = imageWithFallback.url;

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<PersonTypeLockup />
				<div className={styles.titleLockup}>
					{image && (
						<div className={styles.image}>
							<RoundImage image={image} alt={name} />
						</div>
					)}
					<Heading2 sans unpadded>
						{name}
					</Heading2>
				</div>
			</ContentWidthLimiter>
			{children}
		</Tease>
	);
}
