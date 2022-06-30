import React, { PropsWithChildren } from 'react';

import Heading2 from '@components/atoms/heading2';
import ButtonBack from '@components/molecules/buttonBack';
import CollectionTypeLockup from '@components/molecules/collectionTypeLockup';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Tease from '@components/molecules/tease';

import styles from './pivot.module.scss';
import { CollectionPivotFragment } from '@containers/collection/__generated__/pivot';

type Props = {
	collection: CollectionPivotFragment;
};

export default function CollectionPivot({
	collection,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	const { title, canonicalPath, contentType } = collection;

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<ButtonBack
					type="secondaryInverse"
					backUrl={canonicalPath}
					className={styles.back}
				/>
				<CollectionTypeLockup contentType={contentType} />
				<Heading2>{title}</Heading2>
			</ContentWidthLimiter>
			{children}
		</Tease>
	);
}
