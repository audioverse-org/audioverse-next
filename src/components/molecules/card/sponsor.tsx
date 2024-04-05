import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import RoundImage from '~components/atoms/roundImage';
import Card from '~components/molecules/card';
import { useIsSponsorFavorited } from '~lib/api/useIsSponsorFavorited';
import { BaseColors } from '~lib/constants';
import UserPlusIcon from '~public/img/icons/fa-user-plus.svg';
import { CatalogEntityType } from '~src/__generated__/graphql';
import { analytics } from '~src/lib/analytics';

import ButtonFavorite from '../buttonFavorite';
import TypeLockup from '../typeLockup';
import { CardSponsorFragment } from './__generated__/sponsor';
import styles from './sponsor.module.scss';

interface CardSponsorProps {
	sponsor: CardSponsorFragment;
}

export default function CardSponsor({
	sponsor,
}: CardSponsorProps): JSX.Element {
	const intl = useIntl();
	const { isFavorited, toggleFavorited } = useIsSponsorFavorited(sponsor.id);

	const {
		canonicalPath,
		image,
		title,
		collections,
		sequences,
		recordings,
		id,
	} = sponsor;

	return (
		<Card>
			<Link href={canonicalPath} legacyBehavior>
				<a
					className={styles.container}
					onClick={() => {
						analytics.track('Card click', {
							type: CatalogEntityType.Sponsor,
							id,
							title,
						});
					}}
				>
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
							isFavorited && styles.detailsWithLike
						)}
					>
						<Heading6
							sans
							unpadded
							uppercase
							loose
							className={styles.conferencesLabel}
						>
							{collections.aggregate?.count ? (
								<FormattedMessage
									id="cardSponsor__collectionCountLabel"
									defaultMessage="{count} Conferences"
									description="Sponsor Detail collection count label"
									values={{ count: collections.aggregate?.count }}
								/>
							) : sequences.aggregate?.count ? (
								<FormattedMessage
									id="cardSponsor__sequencesCountLabel"
									defaultMessage="{count} Series"
									description="Sponsor Detail series count label"
									values={{ count: sequences.aggregate?.count }}
								/>
							) : (
								<FormattedMessage
									id="cardSponsor__recordingsCountLabel"
									defaultMessage="{count} Teachings"
									description="Sponsor Detail teachings count label"
									values={{ count: recordings.aggregate?.count }}
								/>
							)}
						</Heading6>
					</div>
					{/* TODO: sub-conferences */}
				</a>
			</Link>
			<ButtonFavorite
				isFavorited={!!isFavorited}
				toggleFavorited={toggleFavorited}
				backgroundColor={BaseColors.LIGHT_TONE}
				light
				className={clsx(styles.like, isFavorited && styles.likeActive)}
			/>
		</Card>
	);
}
