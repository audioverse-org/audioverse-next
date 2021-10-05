import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import CardRecording from '@components/molecules/card/recording';
import Dropdown from '@components/molecules/dropdown';
import RssAlternate from '@components/molecules/rssAlternate';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetSermonListPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSermonListRoute, makeSermonsFeedRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconFilter from '../../../public/img/icon-filter-light.svg';

import styles from './list.module.scss';

export type SermonListProps = PaginatedProps<
	NonNullable<GetSermonListPageDataQuery['sermons']['nodes']>[0],
	GetSermonListPageDataQuery
> & { filter: string };

function SermonList({ nodes, pagination, filter }: SermonListProps) {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={`/${language}/discover`}
			heading={
				<FormattedMessage
					id="sermonList__heading"
					defaultMessage="All Teachings"
				/>
			}
			makeRoute={(lang, page) => makeSermonListRoute(lang, filter, page)}
			filter={
				<Dropdown
					id="filterMenu"
					trigger={({ isOpen, ...props }) => (
						<Button
							type="secondary"
							text={
								<FormattedMessage
									id="sermonsList__filter"
									defaultMessage="Filter"
								/>
							}
							Icon={IconFilter}
							className={clsx(isOpen && styles.buttonOpen)}
							{...props}
						/>
					)}
					alignment="right"
				>
					<div className={styles.dropdownContainer}>
						<div className={styles.segmentedControlWrapper}>
							<Link href={makeSermonListRoute(language, 'all', 1)}>
								<a
									className={clsx(
										styles.segmentedControl,
										filter === 'all' && styles.segmentedControlActive
									)}
								>
									<FormattedMessage
										id="container-sermonList__filterLabelAll"
										defaultMessage="All"
										description="sermon list page filter all"
									/>
								</a>
							</Link>
							<Link href={makeSermonListRoute(language, 'video', 1)}>
								<a
									className={clsx(
										styles.segmentedControl,
										filter === 'filter' && styles.segmentedControlActive
									)}
								>
									<FormattedMessage
										id="container-sermonList__filterLabelVideo"
										defaultMessage="Video"
										description="sermon list page filter video"
									/>
								</a>
							</Link>
							<Link href={makeSermonListRoute(language, 'audio', 1)}>
								<a
									className={clsx(
										styles.segmentedControl,
										filter === 'audio' && styles.segmentedControlActive
									)}
								>
									<FormattedMessage
										id="container-sermonList__filterLabelAudio"
										defaultMessage="Audio only"
										description="sermon list page filter audio"
									/>
								</a>
							</Link>
						</div>
					</div>
				</Dropdown>
			}
		>
			<RssAlternate url={makeSermonsFeedRoute(language)} />
			{nodes.map((node) => (
				<CardRecording recording={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(
	SermonList,
	(props: SermonListProps) => !props.nodes?.length
);
