import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CircleInitials from '~components/atoms/circleInitials';
import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import Link from '~components/atoms/linkWithoutPrefetch';
import RoundImage from '~components/atoms/roundImage';
import Card from '~components/molecules/card';
import { useIsPersonFavorited } from '~lib/api/useIsPersonFavorited';
import { BaseColors } from '~lib/constants';
import { CatalogEntityType } from '~src/__generated__/graphql';

import ButtonFavorite from '../buttonFavorite';
import PersonTypeLockup from '../personTypeLockup';
import { ConferencePersonFragment } from './__generated__/conferencePerson';
import { CardPersonFragment } from './__generated__/person';
import styles from './person.module.scss';

interface CardCollectionProps {
	person: CardPersonFragment | ConferencePersonFragment;
	compact?: boolean;
	largeinit?: boolean;
	midinit?: boolean;
	smallinit?: boolean;
}

export default function CardPerson({
	person,
	compact = false,
	largeinit = false,
	midinit = false,
	smallinit = false,
}: CardCollectionProps): JSX.Element {
	const { isFavorited, toggleFavorited } = useIsPersonFavorited(person.id);
	const { canonicalPath, image, name, recordings, id } = person;

	return (
		<Card className={clsx(compact && styles.compact)}>
			<Link href={canonicalPath} legacyBehavior>
				<a className={styles.container}>
					<div className={styles.stretch}>
						{!compact && <PersonTypeLockup />}
						<Heading2 unpadded sans className={styles.title}>
							{image ? (
								<div className={styles.image}>
									<RoundImage image={image.url} alt={name} large={compact} />
								</div>
							) : (
								<CircleInitials
									name={name}
									large={largeinit}
									mid={midinit}
									small={smallinit}
								/>
							)}
							<span>{name}</span>
						</Heading2>
					</div>
					{!compact && (
						<div
							className={clsx(
								styles.details,
								isFavorited && styles.detailsWithLike,
							)}
						>
							<Heading6
								sans
								unpadded
								uppercase
								loose
								className={styles.teachingsLabel}
							>
								<FormattedMessage
									id="cardPerson_teachingsLabel"
									defaultMessage="{count} teachings"
									description="Card person teachings count label"
									values={{ count: recordings.aggregate?.count }}
								/>
							</Heading6>
						</div>
					)}
				</a>
			</Link>
			{!compact && (
				<ButtonFavorite
					isFavorited={!!isFavorited}
					toggleFavorited={toggleFavorited}
					backgroundColor={BaseColors.SMART_PLAYLIST_H}
					light
					className={clsx(styles.like, isFavorited && styles.likeActive)}
					contentType={CatalogEntityType.Person}
					id={id}
					title={name}
				/>
			)}
		</Card>
	);
}
