import React, { PropsWithChildren } from 'react';

import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import ButtonBack from '@components/molecules/buttonBack';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import SponsorTypeLockup from '@components/molecules/sponsorTypeLockup';
import Tease from '@components/molecules/tease';
import { SponsorPivotFragment } from '@lib/generated/graphql';

import styles from './pivot.module.scss';

type Props = {
	sponsor: SponsorPivotFragment;
};

export default function SponsorPivot({
	sponsor,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	const { title, imageWithFallback, canonicalPath } = sponsor;
	const image = imageWithFallback.url;

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<ButtonBack backUrl={canonicalPath} className={styles.back} />
				<SponsorTypeLockup />
				<div className={styles.titleLockup}>
					{image && (
						<div className={styles.logo}>
							<RoundImage image={image} alt={title} />
						</div>
					)}
					<Heading2 sans unpadded>
						{title}
					</Heading2>
				</div>
			</ContentWidthLimiter>
			{children}
		</Tease>
	);
}
