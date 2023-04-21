import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import RoundImage from '~components/atoms/roundImage';
import Button from '~components/molecules/button';
import { useIsSponsorFavorited } from '~lib/api/useIsSponsorFavorited';

import HatIcon from '../../../../../public/img/icons/fa-user-plus.svg';
import IconLike from '../../../../../public/img/icons/icon-like-light.svg';
import { CardRecordingFragment } from '../__generated__/recording';
import CardHat from '.';
import styles from './sponsor.module.scss';

interface Props {
	sponsor: NonNullable<CardRecordingFragment['sponsor']>;
}

export default function CardHatSponsor({ sponsor }: Props): JSX.Element {
	const router = useRouter();
	const { isFavorited, toggleFavorited } = useIsSponsorFavorited(sponsor.id);

	return (
		<div className={styles.wrapper}>
			<CardHat
				title={sponsor.title}
				label={
					<FormattedMessage
						id="cardHatSponsor__sponsorLabel"
						defaultMessage="Sponsor"
					/>
				}
				url={sponsor.canonicalPath}
				icon={<HatIcon />}
			>
				<div
					className={styles.hatContent}
					onClick={(e) => {
						e.stopPropagation();
						router.push(sponsor.canonicalPath);
					}}
				>
					<Heading2 className={styles.title}>
						{sponsor.image && (
							<div className={styles.image}>
								<RoundImage image={sponsor.image.url} alt={sponsor.title} />
							</div>
						)}
						{sponsor.title}
					</Heading2>
					<div className={styles.row}>
						<Button
							type="primary"
							onClick={(e) => {
								e.stopPropagation();
								toggleFavorited();
							}}
							text={
								isFavorited ? (
									<FormattedMessage
										id="cardHatSponsor__removeSponsor"
										defaultMessage="Remove Sponsor"
									/>
								) : (
									<FormattedMessage
										id="cardHatSponsor__addSponsor"
										defaultMessage="Add Sponsor"
									/>
								)
							}
							IconLeft={IconLike}
							className={styles.favoriteSequenceButton}
						/>
					</div>
				</div>
			</CardHat>
		</div>
	);
}
