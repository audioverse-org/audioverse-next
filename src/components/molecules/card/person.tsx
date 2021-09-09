import Link from 'next/link';
import React from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import Card from '@components/molecules/card';
import { CardPersonFragment } from '@lib/generated/graphql';

import UserIcon from '../../../../public/img/fa-user.svg';
import TypeLockup from '../typeLockup';

import styles from './person.module.scss';

interface CardCollectionProps {
	person: CardPersonFragment;
}

export default function CardPerson({
	person,
}: CardCollectionProps): JSX.Element {
	const intl = useIntl();

	const { canonicalPath, image, name } = person;
	return (
		<Card>
			<Link href={canonicalPath}>
				<a className={styles.container}>
					<div className={styles.stretch}>
						<TypeLockup
							Icon={UserIcon}
							label={intl.formatMessage({
								id: 'cardPerson_hatTitle',
								defaultMessage: 'Speaker',
								description: 'Card person hat title',
							})}
							iconColor={BaseColors.RED}
							textColor={BaseColors.DARK}
						/>
						<Heading2 unpadded sans className={styles.title}>
							{image && (
								<div className={styles.image}>
									<RoundImage image={image.url} alt={name} />
								</div>
							)}
							{name}
						</Heading2>
					</div>
					{/* TODO: sub-recordings */}
				</a>
			</Link>
		</Card>
	);
}
