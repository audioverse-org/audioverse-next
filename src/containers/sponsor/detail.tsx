import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/cardCollection';
import CardGroup from '@components/molecules/cardGroup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import TypeLockup from '@components/molecules/typeLockup';
import { SponsorStaticProps } from '@pages/[language]/sponsors/[id]';

import UserPlusIcon from '../../../public/img/fa-user-plus.svg';
import LikeIcon from '../../../public/img/icon-like-active.svg';
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
	} = sponsor;
	const image = imageWithFallback.url;

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: 'Description',
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (website) {
		details.push({
			term: 'Website',
			definition: (
				<Link href={website}>
					<a target="_blank" rel="nofollow noreferrer">
						{website}
					</a>
				</Link>
			),
		});
	}
	if (location) {
		details.push({
			term: 'Location',
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
					iconColor="salmon"
					textColor="dark"
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
					<ShareIcon />
					<LikeIcon />
				</div>
				<HorizontalRule color="midTone" />
				<DefinitionList terms={details} />
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
