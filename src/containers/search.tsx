import { useRouter } from 'next/router';
import React from 'react';

import SearchEntry from '@components/molecules/searchEntry';

import styles from './search.module.scss';

export interface SearchProps {
	sermons?: Sermon[];
}

export default function Search({ sermons = [] }: SearchProps): JSX.Element {
	const { query } = useRouter();

	return (
		<>
			<h2>Search{query.q ? `: ${query.q}` : null}</h2>
			<ul className={styles.list}>
				{sermons.map((s, i) => (
					<li key={i}>sermon</li>
				))}
				<li key={'sermon'}>
					<SearchEntry
						type={'Sermon'}
						title={'What Is Faith?'}
						metaLines={['Mark Finley, Chad Kreuzer | 48:58']}
					/>
				</li>
				<li key={'bible'}>
					<SearchEntry
						type={'Bible'}
						title={'King James Version (Dramatized)'}
					/>
				</li>
				<li key={'bible book'}>
					<SearchEntry
						type={'Bible Book'}
						title={'Joshua'}
						metaLines={['King James Version (Dramatized)', '24 chapters']}
					/>
				</li>
				<li key={'bible chapter'}>
					<SearchEntry
						type={'Bible Chapter'}
						title={'Joshua 7'}
						metaLines={['King James Version (Dramatized)']}
					/>
				</li>
				<li key={'audiobook'}>
					<SearchEntry
						type={'Audiobook'}
						title={"Christ's Object Lessons"}
						metaLines={['30 chapters']}
					/>
				</li>
				<li key={'story album'}>
					<SearchEntry
						type={'Story Album'}
						title={'Discovery Mountain, Season 10: Oshkosh or BUST!'}
						metaLines={['Jean Boonstra | Discovery Mountain']}
					/>
				</li>
				<li key={'music album'}>
					<SearchEntry
						type={'Music Album'}
						title={'His Song In My Heart'}
						metaLines={['Young Disciple Ministries']}
					/>
				</li>
				<li key={'song'}>
					<SearchEntry
						type={'Scripture Song'}
						title={'In That Day - Isaiah 26:1-4'}
						metaLines={['His Song in My Heart', 'Young Disciple Ministries']}
					/>
				</li>
				<li key={'conference'}>
					<SearchEntry
						type={'Conference'}
						title={'Called to Serve'}
						metaLines={['March 4-16, 2019 | ASI Southwest']}
					/>
				</li>
				<li key={'presenter'}>
					<SearchEntry
						type={'Presenter'}
						title={'Elvin Adams, MD, MPH, FACPM'}
						metaLines={['Specialist in Internal Medicine and Public Health']}
					/>
				</li>
				<li key={'tag'}>
					<SearchEntry
						type={'Tag'}
						title={'Bible Prophecy'}
						metaLines={['419 Recordings']}
					/>
				</li>
				<li key={'sponsor'}>
					<SearchEntry
						type={'Sponsor'}
						title={'A Loud and Clear Call Ministries'}
						metaLines={['Hilo, Hawaii, USA']}
					/>
				</li>
				<li key={'series'}>
					<SearchEntry
						type={'Series'}
						title={'Soul Winning Hour'}
						metaLines={[
							'Michigan Camp Meeting 2019: As a Witness, Matthew 24:14',
						]}
					/>
				</li>
				<li key={'playlist'}>
					<SearchEntry
						type={'Playlist'}
						title={'End Times'}
						metaLines={['15 items']}
					/>
				</li>
			</ul>
		</>
	);
}
