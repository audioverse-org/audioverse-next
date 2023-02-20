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
import useSections, { TabId } from './index.useSections';

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

function Search(): JSX.Element {
	const [tab, setTab] = useState<TabId>('all');
	const sections = useSections(tab);

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
				const l = s.getNodes();
				const isVisible = (tab === 'all' && l.length > 0) || tab === s.id;
				const showSeeAll = s.hasNextPage && tab === 'all';

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
