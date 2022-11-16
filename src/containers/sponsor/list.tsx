import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import Card from '@components/molecules/card';
import JumpBar from '@components/molecules/jumpBar';
import { GetSponsorListPageDataQuery } from '@lib/generated/graphql';
import {
	makeDiscoverCollectionsRoute,
	makeSponsorListRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';

export type SponsorsProps = {
	sponsors: NonNullable<GetSponsorListPageDataQuery['sponsors']['nodes']>;
	sponsorLetterCounts: NonNullable<
		GetSponsorListPageDataQuery['sponsorLetterCounts']
	>;
};

// TODO: replace with sponsors landing page (featured, recent, trending, etc.)

function Sponsors({
	sponsors,
	sponsorLetterCounts,
}: SponsorsProps): JSX.Element {
	const language = useLanguageRoute();
	const jumpLinks = sponsorLetterCounts.map(({ letter }) => ({
		text: letter,
		url: makeSponsorListRoute(language, letter),
	}));

	return <>
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
        <Heading2>{sponsors[0].title.substring(0, 1).toUpperCase()}</Heading2>
        {sponsors.map(({ canonicalPath, image, title }) => (
            <Card className={styles.card} key={canonicalPath}>
                <Link href={canonicalPath} className={styles.container}>

                    {image && (
                        <div className={styles.image}>
                            <RoundImage image={image.url} />
                        </div>
                    )}
                    <span className={styles.sponsorName}>{title}</span>

                </Link>
            </Card>
        ))}
    </>;
}

export default withFailStates(Sponsors, {
	useShould404: ({ sponsors }) => !sponsors?.length,
});
