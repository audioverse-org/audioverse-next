import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/card/collection';
import CardGroup from '@components/molecules/cardGroup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import IconButton from '@components/molecules/iconButton';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import TypeLockup from '@components/molecules/typeLockup';
import { SponsorStaticProps } from '@pages/[language]/sponsors/[id]';

import UserPlusIcon from '../../../public/img/fa-user-plus.svg';
import LikeActiveIcon from '../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../public/img/icon-like-light.svg';
import ShareIcon from '../../../public/img/icon-share-light.svg';

import styles from './detail.module.scss';

type Props = SponsorStaticProps['props'];

function SponsorDetail({ sponsor }: Must<Props>): JSX.Element {
	const intl = useIntl();

	const {
		collections,
		description,
		imageWithFallback,
		location,
		title,
		website,
		viewerHasFavorited,
	} = sponsor;
	const image = imageWithFallback.url;

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: intl.formatMessage({
				id: `sponsorDetail__descriptionLabel`,
				defaultMessage: 'Description',
			}),
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (website) {
		details.push({
			term: intl.formatMessage({
				id: `sponsorDetail__websiteLabel`,
				defaultMessage: 'Website',
			}),
			definition: (
				<Link href={website}>
					<a className="decorated" target="_blank" rel="nofollow noreferrer">
						{website}
					</a>
				</Link>
			),
		});
	}
	if (location) {
		details.push({
			term: intl.formatMessage({
				id: `sponsorDetail__locationLabel`,
				defaultMessage: 'Location',
			}),
			definition: <div>{location}</div>,
		});
	}

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<TypeLockup
					Icon={UserPlusIcon}
					label={intl.formatMessage({
						id: `sponsorDetail__type`,
						defaultMessage: 'Sponsor',
						description: `Sponsor Detail type label`,
					})}
					iconColor={BaseColors.SALMON}
					textColor={BaseColors.DARK}
				/>
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
				<div className={styles.row}>
					<Heading6 sans loose uppercase unpadded className={styles.countLabel}>
						<FormattedMessage
							id="sponsorDetail__collectionCountLabel"
							defaultMessage="{count} Conferences"
							description="Sponsor Detail collection count label"
							values={{ count: collections.aggregate?.count }}
						/>
					</Heading6>
					{/* TODO: make icons functional */}
					<IconButton
						Icon={ShareIcon}
						onPress={() => void 0}
						color={BaseColors.DARK}
						backgroundColor={BaseColors.LIGHT_TONE}
						className={styles.iconButton}
					/>
					<IconButton
						Icon={viewerHasFavorited ? LikeActiveIcon : LikeIcon}
						onPress={() => void 0}
						color={viewerHasFavorited ? BaseColors.RED : BaseColors.DARK}
						backgroundColor={BaseColors.LIGHT_TONE}
						className={styles.iconButton}
					/>
				</div>
				<HorizontalRule color="midTone" />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</TeaseHeader>
			{collections.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{collections.nodes.map((collection) => (
						<CardCollection
							collection={collection}
							key={collection.canonicalPath}
						/>
					))}
				</CardGroup>
			) : null}
		</Tease>
	);
}

export default withFailStates(SponsorDetail, ({ sponsor }) => !sponsor);
