import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
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
import useSearch, { FilterId, filters } from './index.useSearch';

function SearchHead(): JSX.Element {
	// WORKAROUND: We can't use the <FormattedMessage> component here because
	// next/head renders outside of our IntlProvider. So we use useIntl() to
	// get the intl object and format the message manually.
	const intl = useIntl();
	const title = intl.formatMessage(
		{
			id: 'search__titleDynamic',
			defaultMessage: 'Search | "{term}" | AudioVerse',
		},
		{ term: useQueryString('q') }
	);
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}

function useOnScreen(ref: RefObject<HTMLElement>): boolean {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) =>
				setIntersecting(entry.isIntersecting)
			),
		[]
	);

	useEffect(() => {
		observer.observe(ref.current as HTMLElement);
		return () => observer.disconnect();
	}, [ref, observer]);

	return isIntersecting;
}

function Search(): JSX.Element {
	const [tab, setTab] = useState<FilterId>('all');
	const { visible, loadMore, isLoading } = useSearch(tab);
	const endRef = useRef<HTMLDivElement>(null);
	const shouldLoadMore = useOnScreen(endRef);

	useEffect(() => {
		if (tab !== 'all' && shouldLoadMore && !isLoading) {
			loadMore();
		}
	}, [tab, shouldLoadMore, isLoading, loadMore]);

	return (
		<>
			<SearchHead />
			<Mininav
				items={Object.entries(filters).map(([id, { heading }]) => ({
					id,
					label: heading,
					isActive: tab === id,
					onClick: () => setTab(id),
				}))}
			/>
			{visible.map((s) => {
				const nodes = tab === 'all' ? s.nodes.slice(0, 3) : s.nodes;
				return (
					<div className={styles.section} key={s.id}>
						<LineHeading>{s.heading}</LineHeading>
						<CardGroup>
							{nodes.map((e: InferrableEntity) => (
								<CardInferred key={e.id} entity={e} />
							))}
						</CardGroup>
						{s.hasNextPage && tab === 'all' && (
							<Button
								type="secondary"
								text={s.seeAll}
								IconRight={ForwardIcon}
								className={styles.seeAllButton}
								onClick={() => setTab(s.id)}
							/>
						)}
					</div>
				);
			})}
			<div ref={endRef} />
		</>
	);
}

export default withFailStates(Search, {
	useShould404: () => false,
	useIsLoading: () => useSearch('all').isLoading,
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
