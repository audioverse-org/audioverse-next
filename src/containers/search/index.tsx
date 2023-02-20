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
import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';
import styles from './index.module.scss';
import Head from 'next/head';
import Mininav from '@components/molecules/mininav';
import { useQueryString } from '@lib/useQueryString';
import { useLanguageId } from '@lib/useLanguageId';
import {
	useGetSearchAudiobooksQuery,
	useGetSearchConferencesQuery,
	useGetSearchMusicTracksQuery,
	useGetSearchPersonsQuery,
	useGetSearchRecordingsQuery,
	useGetSearchSeriesQuery,
	useGetSearchSponsorsQuery,
	useGetSearchStoryProgramsQuery,
} from '@lib/generated/graphql';
import { QueryObserverResult } from 'react-query';

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

type TabId =
	| 'all'
	| 'presenters'
	| 'teachings'
	| 'series'
	| 'books'
	| 'sponsors'
	| 'conferences'
	| 'music'
	| 'stories';

const Tab: Record<string, TabId> = {
	All: 'all',
	Presenters: 'presenters',
	Teachings: 'teachings',
	Series: 'series',
	Books: 'books',
	Sponsors: 'sponsors',
	Conferences: 'conferences',
	Music: 'music',
	Stories: 'stories',
};

type QueryShape = {
	aggregate: {
		count: number;
	} | null;
	nodes: InferrableEntity[] | null;
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string | null;
	};
};

type Section = {
	id: TabId;
	heading: JSX.Element;
	seeAll: JSX.Element;
	getData: () => QueryShape | undefined;
};

function useSections(): {
	isLoading: boolean;
	sections: Section[];
} {
	const term = useQueryString('q') || '';
	const language = useLanguageId();

	const vars = {
		term,
		language,
		first: 3,
		after: null,
	};

	const presenters = useGetSearchPersonsQuery(vars);
	const teachings = useGetSearchRecordingsQuery(vars);
	const series = useGetSearchSeriesQuery(vars);
	const books = useGetSearchAudiobooksQuery(vars);
	const sponsors = useGetSearchSponsorsQuery(vars);
	const conferences = useGetSearchConferencesQuery(vars);
	const music = useGetSearchMusicTracksQuery(vars);
	const stories = useGetSearchStoryProgramsQuery(vars);

	const results = {
		presenters,
		teachings,
		series,
		books,
		sponsors,
		conferences,
		music,
		stories,
	};

	function getData(
		result: QueryObserverResult<{
			[queryName: string]: QueryShape | string;
		}>
	): QueryShape | undefined {
		return Object.values(result.data || {}).find(
			(v) => typeof v !== 'string'
		) as QueryShape;
	}

	const sections: Section[] = [
		{
			id: Tab.Presenters,
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
			getData: () => getData(presenters),
		},
		{
			id: Tab.Teachings,
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
			getData: () => getData(teachings),
		},
		{
			id: Tab.Series,
			heading: (
				<FormattedMessage id="search__seriesHeading" defaultMessage="Series" />
			),
			seeAll: (
				<FormattedMessage
					id="search__seriesSeeAll"
					defaultMessage="See All Matching Series"
				/>
			),
			getData: () => getData(series),
		},
		{
			id: Tab.Books,
			heading: (
				<FormattedMessage
					id="search__booksHeading"
					defaultMessage="Audiobooks"
				/>
			),
			seeAll: (
				<FormattedMessage
					id="search__booksSeeAll"
					defaultMessage="See All Matching Audiobooks"
				/>
			),
			getData: () => getData(books),
		},
		{
			id: Tab.Sponsors,
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
			getData: () => getData(sponsors),
		},
		{
			id: Tab.Conferences,
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
			getData: () => getData(conferences),
		},
		{
			id: Tab.Music,
			heading: (
				<FormattedMessage id="search__musicHeading" defaultMessage="Music" />
			),
			seeAll: (
				<FormattedMessage
					id="search__musicSeeAll"
					defaultMessage="See All Matching Music"
				/>
			),
			getData: () => getData(music),
		},
		{
			id: Tab.Stories,
			heading: (
				<FormattedMessage
					id="search__storiesHeading"
					defaultMessage="Stories"
				/>
			),
			seeAll: (
				<FormattedMessage
					id="search__storiesSeeAll"
					defaultMessage="See All Matching Stories"
				/>
			),
			getData: () => getData(stories),
		},
	];

	return {
		isLoading: Object.values(results).some((r) => r.isLoading),
		sections,
	};
}

function Search(): JSX.Element {
	const [tab, setTab] = useState('all');
	const sections = useSections();

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
					...sections.sections.map(({ id, heading }) => ({
						id,
						label: heading,
						isActive: tab === id,
						onClick: () => setTab(id),
					})),
				]}
			/>
			{sections.sections.map((s) => {
				const d = s.getData();
				const l = d?.nodes || [];
				const isVisible = (tab === 'all' && l.length > 0) || tab === s.id;
				const showSeeAll = d?.pageInfo.hasNextPage && tab === 'all';

				if (!isVisible) return null;

				return (
					<div key={s.id}>
						<LineHeading>{s.heading}</LineHeading>
						<CardGroup>
							{l.map((e: InferrableEntity) => (
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
	useShould404: () => false,
	useIsLoading: () => useSections().isLoading,
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
