import React, { PropsWithChildren } from 'react';

import Heading2 from '~components/atoms/heading2';
import CollectionTypeLockup from '~components/molecules/collectionTypeLockup';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import Tease from '~components/molecules/tease';

import { CollectionPivotFragment } from './__generated__/pivot';
import styles from './pivot.module.scss';

type Props = {
	collection: CollectionPivotFragment;
};

export default function CollectionPivot({
	collection,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	const { title, contentType } = collection;

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<CollectionTypeLockup contentType={contentType} />
				<Heading2>{title}</Heading2>
			</ContentWidthLimiter>
			{children}
		</Tease>
	);
}
