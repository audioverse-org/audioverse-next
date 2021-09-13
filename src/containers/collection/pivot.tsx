import React, { PropsWithChildren } from 'react';

import Heading2 from '@components/atoms/heading2';
import ButtonBack from '@components/molecules/buttonBack';
import CollectionTypeLockup from '@components/molecules/collectionTypeLockup';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { CollectionPivotFragment } from '@lib/generated/graphql';

import styles from './pivot.module.scss';

type Props = {
	collection: CollectionPivotFragment;
};

export default function CollectionPivot({
	collection,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	const { title, canonicalPath } = collection;

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<ButtonBack
					type="secondaryInverse"
					backUrl={canonicalPath}
					className={styles.back}
				/>
				<CollectionTypeLockup />
				<Heading2>{title}</Heading2>
			</TeaseHeader>
			{children}
		</Tease>
	);
}
