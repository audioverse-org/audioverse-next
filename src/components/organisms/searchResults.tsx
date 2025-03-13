import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import Button from '~components/molecules/button';
import CardInferred, {
	InferrableEntity,
} from '~components/molecules/card/inferred';
import CardGroup from '~components/molecules/cardGroup';
import LoadingCards from '~components/molecules/loadingCards';
import { useQueryString } from '~lib/useQueryString';
import ForwardIcon from '~public/img/icons/icon-forward-light.svg';
import useRouterWatch from '~src/lib/useRouterWatch';

import EmptyState from './emptyState';
import { EntityFilterId } from './searchResults.filters';
import styles from './searchResults.module.scss';
import useSearch, { AugmentedFilter } from './searchResults.useResults';

function SearchHead({ term }: { term?: string }): JSX.Element {
	useRouterWatch();
	const intl = useIntl();
	const title = intl.formatMessage(
		{
			id: 'search__titleDynamic',
			defaultMessage: 'Search | "{term}" | AudioVerse',
		},
		{ term },
	);
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}

function Section({
	section,
	entityType,
	onEntityTypeChange,
}: {
	section: AugmentedFilter;
	entityType: EntityFilterId;
	onEntityTypeChange: (entityType: EntityFilterId) => void;
}) {
	const nodes =
		entityType === 'all' ? section.nodes.slice(0, 3) : section.nodes;
	return (
		<div className={styles.section}>
			<LineHeading variant="overline">{section.heading}</LineHeading>
			{nodes.length ? (
				<CardGroup>
					{nodes.map((e: InferrableEntity) => (
						<CardInferred key={e.id} entity={e} />
					))}
				</CardGroup>
			) : (
				<EmptyState
					title={
						<FormattedMessage
							id="search__emptyStateTitle"
							defaultMessage="No results found"
						/>
					}
					message={
						<FormattedMessage
							id="search__emptyStateMessage"
							defaultMessage="Try searching for something else"
						/>
					}
				/>
			)}
			{section.hasNextPage && entityType === 'all' && (
				<Button
					type="secondary"
					text={section.seeAll}
					IconRight={ForwardIcon}
					className={styles.seeAllButton}
					onClick={() => onEntityTypeChange(section.id)}
				/>
			)}
		</div>
	);
}

const normalize = (s: string) =>
	s.replace(/[\p{P}\p{S}\s]/gu, '').toLowerCase();

const getTitle = (e: InferrableEntity) =>
	e.__typename === 'Person' ? e.name : e.title;

function sortSections(term: string, sections: AugmentedFilter[]) {
	const t = normalize(term);
	const a = sections.filter((s) =>
		s.nodes.slice(0, 3).map(getTitle).map(normalize).includes(t),
	);
	const b = sections.filter((s) => !a.find((hs) => hs.id === s.id));
	return [...a, ...b];
}

// ...

export default function Search({
	term,
	entityType = 'all',
	onEntityTypeChange,
}: {
	term?: string;
	entityType: EntityFilterId;
	onEntityTypeChange: (entityType: EntityFilterId) => void;
}): JSX.Element {
	const q = useQueryString('q');
	const t = term || q || '';
	const { visible, loadMore, isLoading } = useSearch(entityType, t);
	const endRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					!isLoading &&
					visible.length > 0 &&
					visible[visible.length - 1].hasNextPage
				) {
					loadMore();
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.5, // Adjust the threshold as needed
			},
		);

		const currentEndRef = endRef.current; // Save the current value

		if (currentEndRef) {
			observer.observe(currentEndRef);
		}

		return () => {
			if (currentEndRef) {
				observer.unobserve(currentEndRef);
			}
		};
	}, [isLoading, loadMore, visible]);

	const sections = sortSections(t, visible);

	return (
		<>
			<SearchHead term={t} />

			{isLoading ? (
				<LoadingCards />
			) : (
				<>
					{sections.map((s) => (
						<Section
							key={s.id}
							section={s}
							entityType={entityType}
							onEntityTypeChange={onEntityTypeChange}
						/>
					))}
					<div id="endRef" ref={endRef} />
				</>
			)}
		</>
	);
}
