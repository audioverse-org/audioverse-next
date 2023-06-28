import Head from 'next/head';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import Button from '~components/molecules/button';
import { CardRecordingFragment } from '~components/molecules/card/__generated__/recording';
import CardInferred, {
	InferrableEntity,
} from '~components/molecules/card/inferred';
import CardGroup from '~components/molecules/cardGroup';
import LoadingCards from '~components/molecules/loadingCards';
import isServerSide from '~lib/isServerSide';
import { useQueryString } from '~lib/useQueryString';

import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';
import EmptyState from './emptyState';
import { EntityFilterId } from './searchResults.filters';
import styles from './searchResults.module.scss';
import useSearch, { AugmentedFilter } from './searchResults.useResults';

function SearchHead({ term }: { term?: string }): JSX.Element {
	// WORKAROUND: We can't use the <FormattedMessage> component here because
	// next/head renders outside of our IntlProvider. So we use useIntl() to
	// get the intl object and format the message manually.
	const intl = useIntl();
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

function useOnScreen(ref: RefObject<HTMLElement>): boolean {
	const [isIntersecting, setIntersecting] = useState(false);
	const enabled = !isServerSide() && ref.current;

	const observer = useMemo(() => {
		if (!enabled) return null;
		return new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting)
		);
	}, [enabled]);

	useEffect(() => {
		if (!observer || !ref.current) return;
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref, observer]);

	return isIntersecting;
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

const isRecording = (e: InferrableEntity): e is CardRecordingFragment =>
	e.__typename === 'Recording';

function hasExactMatch(term: string, sections: AugmentedFilter[]): boolean {
	return !!sections
		.find((s) => s.id === 'teachings')
		?.nodes.slice(0, 3)
		.find((e) => isRecording(e) && normalize(e.title) === normalize(term));
}

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
	const endReached = useOnScreen(endRef);
	const hasExactTeaching = hasExactMatch(t, visible);
	const shouldHoistTeachings = hasExactTeaching && entityType === 'all';

	useEffect(() => {
		if (entityType !== 'all' && endReached && !isLoading) loadMore();
	}, [entityType, endReached, isLoading, loadMore]);

	return (
		<>
			<SearchHead term={t} />

			{isLoading ? (
				<LoadingCards />
			) : (
				<>
					{shouldHoistTeachings && (
						<Section
							key="teachings"
							section={
								visible.find((s) => s.id === 'teachings') as AugmentedFilter
							}
							entityType={entityType}
							onEntityTypeChange={onEntityTypeChange}
						/>
					)}
					{visible.map((s) => {
						if (s.id === 'teachings' && shouldHoistTeachings) {
							return null;
						}
						return (
							<Section
								key={s.id}
								section={s}
								entityType={entityType}
								onEntityTypeChange={onEntityTypeChange}
							/>
						);
					})}
					<div ref={endRef} />
				</>
			)}
		</>
	);
}
