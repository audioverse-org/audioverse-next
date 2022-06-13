import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import NotFoundBase from '@components/organisms/notFound';
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
import {
	Language,
	useGetSearchResultsPageDataQuery,
} from '@lib/generated/graphql';
import {
	makeSearchCollectionsRoute,
	makeSearchPersonsRoute,
	makeSearchSequencesRoute,
	makeSearchSponsorsRoute,
	makeSearchTeachingsRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';

import styles from './index.module.scss';
import Head from 'next/head';

export type SearchProps = {
	language: Language;
};

function SearchHead(): JSX.Element {
	const intl = useIntl();
	const term = useRouter().query.q;

	return (
		<Head>
			<title>
				{intl.formatMessage(
					{
						id: 'search__titleDynamic',
						defaultMessage: 'Search | "{term}" | AudioVerse',
					},
					{ term }
				)}
			</title>
		</Head>
	);
}

function Search({ language }: SearchProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const { query } = useRouter();
	const term = query.q as string;

	const { data } = useGetSearchResultsPageDataQuery({
		language,
		term,
	});

	if (!data) {
		throw new Error('Unreachable');
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
					id="search__teachingsSeeAllMatching"
					defaultMessage="See All Matching Teachings"
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
					id="search__personsSeeAllMatching"
					defaultMessage="See All Matching Presenters"
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
					id="search__sequencesSeeAllMatching"
					defaultMessage="See All Matching Series"
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
					id="search__conferencesSeeAllMatching"
					defaultMessage="See All Matching Conferences"
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
					id="search__sponsorsSeeAllMatching"
					defaultMessage="See All Matching Sponsors"
				/>
			),
			url: makeSearchSponsorsRoute(languageRoute, term),
		});
	}
	return (
		<>
			<SearchHead />
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

export default withFailStates(Search, {
	useShould404: ({ language }) => {
		const { query } = useRouter();
		const term = query.q as string;
		const { isLoading, data } = useGetSearchResultsPageDataQuery({
			language,
			term,
		});
		return !isLoading && !data;
	},
	useIsLoading: ({ language }) => {
		const { query } = useRouter();
		const term = query.q as string;
		const { isLoading } = useGetSearchResultsPageDataQuery({
			language,
			term,
		});
		return isLoading;
	},
	Loading: () => (
		<>
			<SearchHead />
			<LoadingCards />
		</>
	),
	NotFound: () => (
		<>
			<SearchHead />
			<NotFoundBase />
		</>
	),
});
