import React, { useState } from 'react';
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
import useSections, { TabId, definitions as tabs } from './index.useSections';

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

function Search(): JSX.Element {
	const [tab, setTab] = useState<TabId>('all');
	const { visible } = useSections(tab);

	return (
		<>
			<SearchHead />
			<Mininav
				items={Object.entries(tabs).map(([id, { heading }]) => ({
					id,
					label: heading,
					isActive: tab === id,
					onClick: () => setTab(id),
				}))}
			/>
			{visible.map((s) => (
				<div className={styles.section} key={s.id}>
					<LineHeading>{s.heading}</LineHeading>
					<CardGroup>
						{s.nodes.map((e: InferrableEntity) => (
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
