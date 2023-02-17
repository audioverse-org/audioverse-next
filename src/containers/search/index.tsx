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
import CardInferred, {
	InferrableEntity,
} from '@components/molecules/card/inferred';
import CardGroup from '@components/molecules/cardGroup';
import LoadingCards from '@components/molecules/loadingCards';
import {
	GetSearchResultsPageDataQuery,
	Language,
	Person,
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

type Section = {
	id: string;
	heading: JSX.Element;
	getEntities: (d: GetSearchResultsPageDataQuery) => InferrableEntity[] | null;
};

const sections: Section[] = [
	{
		id: 'presenters',
		heading: (
			<FormattedMessage
				id="search__presentersHeading"
				defaultMessage="Presenters"
			/>
		),
		getEntities: (d) => d.persons.nodes,
	},
	{
		id: 'teachings',
		heading: (
			<FormattedMessage
				id="search__teachingsHeading"
				defaultMessage="Teachings"
			/>
		),
		getEntities: (d) => d.recordings.nodes,
	},
	{
		id: 'series',
		heading: (
			<FormattedMessage id="search__seriesHeading" defaultMessage="Series" />
		),
		getEntities: (d) => d.serieses.nodes,
	},
	{
		id: 'books',
		heading: (
			<FormattedMessage id="search__booksHeading" defaultMessage="Audiobooks" />
		),
		getEntities: (d) => d.audiobooks.nodes,
	},
	{
		id: 'sponsors',
		heading: (
			<FormattedMessage
				id="search__sponsorsHeading"
				defaultMessage="Sponsors"
			/>
		),
		getEntities: (d) => d.sponsors.nodes,
	},
	{
		id: 'conferences',
		heading: (
			<FormattedMessage
				id="search__conferencesHeading"
				defaultMessage="Conferences"
			/>
		),
		getEntities: (d) => d.conferences.nodes,
	},
	{
		id: 'music',
		heading: (
			<FormattedMessage id="search__musicHeading" defaultMessage="Music" />
		),
		getEntities: (d) => d.musicTracks.nodes,
	},
	{
		id: 'stories',
		heading: (
			<FormattedMessage id="search__storiesHeading" defaultMessage="Stories" />
		),
		getEntities: (d) => d.storyPrograms.nodes,
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
					...sections.map(({ id, heading }) => ({
						id,
						label: heading,
						isActive: tab === id,
						onClick: () => setTab(id),
					})),
				]}
			/>
			{sections.map((s) => {
				const l = s.getEntities(data) || [];
				const isVisible = (tab === 'all' && l.length > 0) || tab === s.id;

				if (!isVisible) return null;

				return (
					<div key={s.id}>
						<LineHeading>{s.heading}</LineHeading>
						<CardGroup>
							{l.map((e) => (
								<CardInferred key={e.id} entity={e} />
							))}
						</CardGroup>
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
