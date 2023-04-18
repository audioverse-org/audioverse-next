import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import LineHeading from '@components/atoms/lineHeading';
import Button from '@components/molecules/button';
import CardInferred, {
	InferrableEntity,
} from '@components/molecules/card/inferred';
import CardGroup from '@components/molecules/cardGroup';
import LoadingCards from '@components/molecules/loadingCards';
import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';
import styles from './searchResults.module.scss';
import Head from 'next/head';
import { useQueryString } from '@lib/useQueryString';
import useSearch, { AugmentedFilter } from './searchResults.useResults';
import { EntityFilterId } from './searchResults.filters';
import isServerSide from '@lib/isServerSide';
import { CardRecordingFragment } from '../../lib/generated/graphql';

function SearchHead({ term }: { term?: string }): JSX.Element {
	// WORKAROUND: We can't use the <FormattedMessage> component here because
	// next/head renders outside of our IntlProvider. So we use useIntl() to
	// get the intl object and format the message manually.
	const intl = useIntl();
	const q = useQueryString('q');
	const title = intl.formatMessage(
		{
			id: 'search__titleDynamic',
			defaultMessage: 'Search | "{term}" | AudioVerse',
		},
		{ term: term || q }
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
	const s = section;
	const nodes = entityType === 'all' ? s.nodes.slice(0, 3) : s.nodes;
	return (
		<div className={styles.section}>
			<LineHeading variant="overline">{s.heading}</LineHeading>
			<CardGroup>
				{nodes.map((e: InferrableEntity) => (
					<CardInferred key={e.id} entity={e} />
				))}
			</CardGroup>
			{s.hasNextPage && entityType === 'all' && (
				<Button
					type="secondary"
					text={s.seeAll}
					IconRight={ForwardIcon}
					className={styles.seeAllButton}
					onClick={() => onEntityTypeChange(s.id)}
				/>
			)}
		</div>
	);
}

export default function Search({
	term,
	entityType,
	onEntityTypeChange,
}: {
	term?: string;
	entityType: EntityFilterId;
	onEntityTypeChange: (entityType: EntityFilterId) => void;
}): JSX.Element {
	const q = useQueryString('q');
	const { visible, loadMore, isLoading } = useSearch(
		entityType,
		term || q || ''
	);
	const endRef = useRef<HTMLDivElement>(null);
	const endReached = useOnScreen(endRef);

	useEffect(() => {
		entityType !== 'all' && endReached && !isLoading && loadMore();
	}, [entityType, endReached, isLoading, loadMore]);

	const hasExactTeaching = visible
		.find((s) => s.id === 'teachings')
		?.nodes.slice(0, 3)
		.find((e: InferrableEntity) => {
			if (e.__typename !== 'Recording') return false;
			const recording = e as CardRecordingFragment;
			const title = recording.title.toLowerCase();
			const query = (term || q || '').toLowerCase();
			return title === query;
		});
	const shouldHoistTeachings = hasExactTeaching && entityType === 'all';

	return (
		<>
			<SearchHead term={term} />

			{isLoading && <LoadingCards />}
			{!isLoading && (
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
