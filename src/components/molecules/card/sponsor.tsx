import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import RoundImage from '@components/atoms/roundImage';
import Card from '@components/molecules/card';
import { BaseColors } from '@lib/constants';
import { CardSponsorFragment } from '@lib/generated/graphql';

import UserPlusIcon from '../../../../public/img/fa-user-plus.svg';
import LikeActiveIcon from '../../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../../public/img/icon-like-light.svg';
import IconButton from '../iconButton';
import TypeLockup from '../typeLockup';

import styles from './sponsor.module.scss';

interface CardSponsorProps {
	sponsor: CardSponsorFragment;
}

export default function CardSponsor({
	sponsor,
}: CardSponsorProps): JSX.Element {
	const intl = useIntl();

	const { canonicalPath, image, title, viewerHasFavorited, collections } =
		sponsor;

	return (
		<Card>
			<Link href={canonicalPath}>
				<a className={styles.container}>
					<TypeLockup
						Icon={UserPlusIcon}
						label={intl.formatMessage({
							id: 'cardSponsor_hatTitle',
							defaultMessage: 'Sponsor',
							description: 'Card sponsor hat title',
						})}
						iconColor={BaseColors.RED}
						textColor={BaseColors.DARK}
					/>
					<div className={styles.titleLockup}>
						{image && (
							<div className={styles.logo}>
								<RoundImage image={image.url} alt={title} />
							</div>
						)}
						<Heading2 sans unpadded className={styles.title}>
							{title}
						</Heading2>
					</div>
					<div
						className={clsx(
							styles.details,
							viewerHasFavorited && styles.detailsWithLike
						)}
					>
						<Heading6
							sans
							unpadded
							uppercase
							loose
							className={styles.conferencesLabel}
						>
							<FormattedMessage
								id="cardSponsor_conferencesLabel"
								defaultMessage="{count} conferences"
								description="Card sponsor conferences count label"
								values={{ count: collections.aggregate?.count }}
							/>
						</Heading6>
					</div>
					{/* TODO: has favorited, sub-conferences */}
				</a>
			</Link>
			<IconButton
				Icon={viewerHasFavorited ? LikeActiveIcon : LikeIcon}
				onPress={() => alert('TODO')}
				color={viewerHasFavorited ? BaseColors.RED : BaseColors.DARK}
				backgroundColor={BaseColors.LIGHT_TONE}
				className={clsx(styles.like, viewerHasFavorited && styles.likeActive)}
			/>
		</Card>
	);
}
