import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import NotFoundBase from '@components/organisms/notFound';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import CardInferred, {
	InferrableEntity,
} from '@components/molecules/card/inferred';
import CardGroup from '@components/molecules/cardGroup';
import LoadingCards from '@components/molecules/loadingCards';
import {
	GetSearchResultsPageDataQuery,
	useGetSearchResultsPageDataQuery,
} from '@lib/generated/graphql';

import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';

import styles from './index.module.scss';
import Head from 'next/head';
import Mininav from '@components/molecules/mininav';
import { useQueryString } from '@lib/useQueryString';
import { useLanguageId } from '@lib/useLanguageId';

function SearchHead(): JSX.Element {
	const intl = useIntl();
	const term = useQueryString('q');
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
	seeAll: JSX.Element;
	select: (d: GetSearchResultsPageDataQuery) => {
		nodes: InferrableEntity[] | null;
		pageInfo: {
			hasNextPage: boolean;
		};
	};
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
		seeAll: (
			<FormattedMessage
				id="search__presentersSeeAll"
				defaultMessage="See All Matching Presenters"
			/>
		),
		select: (d) => d.persons,
	},
	{
		id: 'teachings',
		heading: (
			<FormattedMessage
				id="search__teachingsHeading"
				defaultMessage="Teachings"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__teachingsSeeAll"
				defaultMessage="See All Matching Teachings"
			/>
		),
		select: (d) => d.recordings,
	},
	{
		id: 'series',
		heading: (
			<FormattedMessage id="search__seriesHeading" defaultMessage="Series" />
		),
		seeAll: (
			<FormattedMessage
				id="search__seriesSeeAll"
				defaultMessage="See All Matching Series"
			/>
		),
		select: (d) => d.serieses,
	},
	{
		id: 'books',
		heading: (
			<FormattedMessage id="search__booksHeading" defaultMessage="Audiobooks" />
		),
		seeAll: (
			<FormattedMessage
				id="search__booksSeeAll"
				defaultMessage="See All Matching Audiobooks"
			/>
		),
		select: (d) => d.audiobooks,
	},
	{
		id: 'sponsors',
		heading: (
			<FormattedMessage
				id="search__sponsorsHeading"
				defaultMessage="Sponsors"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__sponsorsSeeAll"
				defaultMessage="See All Matching Sponsors"
			/>
		),
		select: (d) => d.sponsors,
	},
	{
		id: 'conferences',
		heading: (
			<FormattedMessage
				id="search__conferencesHeading"
				defaultMessage="Conferences"
			/>
		),
		seeAll: (
			<FormattedMessage
				id="search__conferencesSeeAll"
				defaultMessage="See All Matching Conferences"
			/>
		),
		select: (d) => d.conferences,
	},
	{
		id: 'music',
		heading: (
			<FormattedMessage id="search__musicHeading" defaultMessage="Music" />
		),
		seeAll: (
			<FormattedMessage
				id="search__musicSeeAll"
				defaultMessage="See All Matching Music"
			/>
		),
		select: (d) => d.musicTracks,
	},
	{
		id: 'stories',
		heading: (
			<FormattedMessage id="search__storiesHeading" defaultMessage="Stories" />
		),
		seeAll: (
			<FormattedMessage
				id="search__storiesSeeAll"
				defaultMessage="See All Matching Stories"
			/>
		),
		select: (d) => d.storyPrograms,
	},
];

function useSearchResults() {
	const term = useQueryString('q') || '';
	const language = useLanguageId();

	return useGetSearchResultsPageDataQuery({
		language,
		term,
	});
}

function Search(): JSX.Element {
	const [tab, setTab] = useState('all');
	const { data } = useSearchResults();

	if (!data) throw new Error('Unreachable');

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
				const d = s.select(data);
				const l = d.nodes || [];
				const isVisible = (tab === 'all' && l.length > 0) || tab === s.id;
				const showSeeAll = d.pageInfo.hasNextPage && tab === 'all';

				if (!isVisible) return null;

				return (
					<div key={s.id}>
						<LineHeading>{s.heading}</LineHeading>
						<CardGroup>
							{l.map((e) => (
								<CardInferred key={e.id} entity={e} />
							))}
						</CardGroup>
						{showSeeAll ? (
							<Button
								type="secondary"
								text={s.seeAll}
								IconRight={ForwardIcon}
								className={styles.seeAllButton}
								onClick={() => setTab(s.id)}
							/>
						) : (
							<div className={styles.seeAllButton} />
						)}
					</div>
				);
			})}
		</>
	);
}

export default withFailStates(Search, {
	useShould404: () => {
		const { isLoading, data } = useSearchResults();
		return !isLoading && !data;
	},
	useIsLoading: () => {
		const { isLoading } = useSearchResults();
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
