import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import ButtonBack from '@components/molecules/buttonBack';
import Card from '@components/molecules/card';
import JumpBar from '@components/molecules/jumpBar';
import {
	GetSponsorListLetterCountsQuery,
	SponsorListEntryFragment,
} from '@lib/generated/graphql';
import {
	makeDiscoverCollectionsRoute,
	makeSponsorListAllRoute,
	makeSponsorListRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';

export type SponsorsProps = {
	sponsors: SponsorListEntryFragment[];
	sponsorLetterCounts: NonNullable<
		GetSponsorListLetterCountsQuery['sponsorLetterCounts']
	>;
	title?: string;
};

// TODO: replace with sponsors landing page (featured, recent, trending, etc.)

export default function Sponsors({
	sponsors,
	sponsorLetterCounts,
	title,
}: SponsorsProps): JSX.Element {
	const language = useLanguageRoute();
	const intl = useIntl();
	const jumpLinks = [
		{
			text: intl.formatMessage({
				id: 'sponsorsList__all',
				defaultMessage: 'All',
			}),
			url: makeSponsorListAllRoute(language),
		},
		...sponsorLetterCounts.map(({ letter }) => ({
			text: letter,
			url: makeSponsorListRoute(language, letter),
		})),
	];

	return (
		<>
			<ButtonBack
				backUrl={makeDiscoverCollectionsRoute(language)}
				className={styles.back}
			/>
			<Heading1 className={styles.heading}>
				<FormattedMessage
					id="sponsorsList__title"
					defaultMessage="All Sponsors"
				/>
			</Heading1>
			<JumpBar links={jumpLinks} />
			{title && <Heading2>{title}</Heading2>}
			{sponsors.map(({ canonicalPath, image, title }) => (
				<Card className={styles.card} key={canonicalPath}>
					<Link href={canonicalPath} legacyBehavior>
						<a className={styles.container}>
							{image && (
								<div className={styles.image}>
									<RoundImage image={image.url} />
								</div>
							)}
							<span className={styles.sponsorName}>{title}</span>
						</a>
					</Link>
				</Card>
			))}
		</>
	);
}
