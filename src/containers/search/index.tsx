import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
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
import useSections, {
	TabId,
	sectionDefinitions as tabs,
} from './index.useSections';

function SearchHead(): JSX.Element {
	return (
		<Head>
			<title>
				<FormattedMessage
					id="search__titleDynamic"
					defaultMessage='Search | "{term}" | AudioVerse'
					values={{ term: useQueryString('q') }}
				/>
			</title>
		</Head>
	);
}

function Search(): JSX.Element {
	const [tab, setTab] = useState<TabId>('all');
	const { visible } = useSections(tab);

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
					...tabs.map(({ id, heading }) => ({
						id,
						label: heading,
						isActive: tab === id,
						onClick: () => setTab(id),
					})),
				]}
			/>
			{visible.map((s) => (
				<div className={styles.section} key={s.id}>
					<LineHeading>{s.heading}</LineHeading>
					<CardGroup>
						{s.getNodes().map((e: InferrableEntity) => (
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
			))}
		</>
	);
}

export default withFailStates(Search, {
	useShould404: () => false,
	useIsLoading: () => useSections('all').isLoading,
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
