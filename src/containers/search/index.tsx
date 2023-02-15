import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
	GetSearchResultsPageDataQuery,
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
import Mininav from '@components/molecules/mininav';

export type SearchProps = {
	language: Language;
};

function SearchHead(): JSX.Element {
	const intl = useIntl();
	const term = useRouter().query.q;
	const title = intl.formatMessage(
		{
			id: 'search__titleDynamic',
			defaultMessage: 'Search | "{term}" | AudioVerse',
		},
		{ term }
	);

	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}

const sectionDefinitions: {
	id: string;
	heading: JSX.Element;
	makeCards: (data: GetSearchResultsPageDataQuery) => JSX.Element[];
}[] = [
	{
		id: 'presenters',
		heading: (
			<FormattedMessage
				id="search__presentersHeading"
				defaultMessage="Presenters"
			/>
		),
		makeCards: (d) =>
			(d.persons.nodes || []).map((p) => <CardPerson key={p.id} person={p} />),
	},
	{
		id: 'topics',
		heading: (
			<FormattedMessage id="search__topicsHeading" defaultMessage="Topics" />
		),
		makeCards: (d) =>
			(d.collections.nodes || []).map((c) => (
				<CardCollection key={c.id} collection={c} />
			)),
	},
	{
		id: 'teachings',
		heading: (
			<FormattedMessage
				id="search__teachingsHeading"
				defaultMessage="Teachings"
			/>
		),
		makeCards: (d) =>
			(d.recordings.nodes || []).map((r) => (
				<CardRecording key={r.id} recording={r} />
			)),
	},
	{
		id: 'series',
		heading: (
			<FormattedMessage id="search__seriesHeading" defaultMessage="Series" />
		),
		makeCards: (d) =>
			(d.sequences.nodes || []).map((s) => (
				<CardSequence key={s.id} sequence={s} />
			)),
	},
	{
		id: 'stories',
		heading: (
			<FormattedMessage id="search__storiesHeading" defaultMessage="Stories" />
		),
		makeCards: (d) =>
			(d.collections.nodes || []).map((c) => (
				<CardCollection key={c.id} collection={c} />
			)),
	},
	{
		id: 'scripture-songs',
		heading: (
			<FormattedMessage
				id="search__scriptureSongsHeading"
				defaultMessage="Scripture Songs"
			/>
		),
		makeCards: (d) =>
			(d.collections.nodes || []).map((c) => (
				<CardCollection key={c.id} collection={c} />
			)),
	},
	{
		id: 'books',
		heading: (
			<FormattedMessage id="search__booksHeading" defaultMessage="Books" />
		),
		makeCards: (d) =>
			(d.collections.nodes || []).map((c) => (
				<CardCollection key={c.id} collection={c} />
			)),
	},
];

function Search({ language }: SearchProps): JSX.Element {
	const [tab, setTab] = useState('all');
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
	return (
		<>
			<SearchHead />
			<Mininav
				items={[
					{
						id: 'all',
						label: 'All',
						isActive: tab === 'all',
						onClick: () => setTab('all'),
					},
					...sectionDefinitions.map(({ id, heading }) => ({
						id,
						label: heading,
						isActive: tab === id,
						onClick: () => setTab(id),
					})),
				]}
			/>
			{sectionDefinitions.map((s) => {
				const isVisible = tab === 'all' || tab === s.id;
				const cards = s.makeCards(data);

				if (!isVisible || (!cards.length && tab === 'all')) return null;

				return (
					<div key={s.id}>
						<LineHeading>{s.heading}</LineHeading>
						<CardGroup>{cards}</CardGroup>
						{/* {seeAll ? (
						<Button
							type="secondary"
							text={seeAll}
							href={url}
							IconRight={ForwardIcon}
							className={styles.seeAllButton}
						/>
					) : (
						<div className={styles.seeAllButton} />
					)} */}
					</div>
				);
			})}
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
