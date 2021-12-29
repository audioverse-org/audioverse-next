import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import CardCollection from '@components/molecules/card/collection';
import CardPerson from '@components/molecules/card/person';
import CardRecording from '@components/molecules/card/recording';
import CardSequence from '@components/molecules/card/sequence';
import CardSponsor from '@components/molecules/card/sponsor';
import CardGroup from '@components/molecules/cardGroup';
import LoadingCards from '@components/molecules/loadingCards';
import type { Language } from '@lib/generated/graphql';
import {
	makeSearchCollectionsRoute,
	makeSearchPersonsRoute,
	makeSearchSequencesRoute,
	makeSearchSponsorsRoute,
	makeSearchTeachingsRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icon-forward-light.svg';

import { useGetSearchResultsPageDataQuery } from './index.generated';
import styles from './index.module.scss';

export type SearchProps = {
	language: Language;
};

function Search({ language }: SearchProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const { query } = useRouter();
	const term = query.q as string;

	const { data, isLoading } = useGetSearchResultsPageDataQuery({
		language,
		term,
	});

	if (isLoading || !data) {
		return <LoadingCards />;
	}

	const resultsCount = reduce(
		omit(data, '__typename'),
		(count, { aggregate }) => count + (aggregate?.count || 0),
		0
	);
	const { collections, recordings, sequences, sponsors, persons } = data;

	const sections = [
		{
			heading: (
				<FormattedMessage
					id="search__teachingsHeading"
					defaultMessage="Teachings"
				/>
			),
			cards: recordings.nodes?.map((recording) => (
				<CardRecording recording={recording} key={recording.canonicalPath} />
			)),
			seeAll: recordings.pageInfo.hasNextPage && (
				<FormattedMessage
					id="search__teachingsSeeAll"
					defaultMessage="See All Teachings"
				/>
			),
			url: makeSearchTeachingsRoute(languageRoute, term),
		},
	];
	if (persons.nodes?.length) {
		sections.push({
			heading: (
				<FormattedMessage
					id="search__personsHeading"
					defaultMessage="Presenters"
				/>
			),
			cards: persons.nodes?.map((person) => (
				<CardPerson person={person} key={person.canonicalPath} />
			)),
			seeAll: persons.pageInfo.hasNextPage && (
				<FormattedMessage
					id="search__personsSeeAll"
					defaultMessage="See All Presenters"
				/>
			),
			url: makeSearchPersonsRoute(languageRoute, term),
		});
	}
	if (sequences.nodes?.length) {
		sections.push({
			heading: (
				<FormattedMessage
					id="search__sequencesHeading"
					defaultMessage="Series"
				/>
			),
			cards: sequences.nodes?.map((sequence) => (
				<CardSequence sequence={sequence} key={sequence.canonicalPath} />
			)),
			seeAll: sequences.pageInfo.hasNextPage && (
				<FormattedMessage
					id="search__sequencesSeeAll"
					defaultMessage="See All Series"
				/>
			),
			url: makeSearchSequencesRoute(languageRoute, term),
		});
	}
	if (collections.nodes?.length) {
		sections.push({
			heading: (
				<FormattedMessage
					id="search__conferencesHeading"
					defaultMessage="Conferences"
				/>
			),
			cards: collections.nodes?.map((collection) => (
				<CardCollection
					collection={collection}
					key={collection.canonicalPath}
				/>
			)),
			seeAll: collections.pageInfo.hasNextPage && (
				<FormattedMessage
					id="search__conferencesSeeAll"
					defaultMessage="See All Conferences"
				/>
			),
			url: makeSearchCollectionsRoute(languageRoute, term),
		});
	}
	if (sponsors.nodes?.length) {
		sections.push({
			heading: (
				<FormattedMessage
					id="search__sponsorsHeading"
					defaultMessage="Sponsors"
				/>
			),
			cards: sponsors.nodes?.map((sponsor) => (
				<CardSponsor sponsor={sponsor} key={sponsor.canonicalPath} />
			)),
			seeAll: sponsors.pageInfo.hasNextPage && (
				<FormattedMessage
					id="search__sponsorsSeeAll"
					defaultMessage="See All Sponsors"
				/>
			),
			url: makeSearchSponsorsRoute(languageRoute, term),
		});
	}
	return (
		<>
			<h5>
				<FormattedMessage
					id="search__resultsCount"
					defaultMessage="{count} Results"
					values={{ count: resultsCount }}
				/>
			</h5>
			{sections.map(({ heading, cards, seeAll, url }) => (
				<div key={url}>
					<LineHeading>{heading}</LineHeading>
					<CardGroup>{cards}</CardGroup>
					{seeAll ? (
						<Button
							type="secondary"
							text={seeAll}
							href={url}
							IconRight={ForwardIcon}
							className={styles.seeAllButton}
						/>
					) : (
						<div className={styles.seeAllButton} />
					)}
				</div>
			))}
		</>
	);
}

export default withFailStates(Search);
