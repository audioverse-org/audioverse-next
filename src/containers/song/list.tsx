import Image from 'next/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GetSongsListPageDataQuery } from '@lib/generated/graphql';
import {
	makeAlbumRoute,
	makeBibleMusicRoute,
	makeSponsorMusicRoute,
	makeTagMusicRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export interface SongsProps {
	data: GetSongsListPageDataQuery;
}

function SongList({ data }: SongsProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h2>
				<FormattedMessage
					id="songsListPage__bookTabLabel"
					defaultMessage="Books"
					description="Songs list page book tab label"
				/>
			</h2>
			<ul>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Genesis')}>
						<FormattedMessage
							id="songsListPage__GenesisLabel"
							defaultMessage="Genesis"
							description="Songs list page Genesis link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Exodus')}>
						<FormattedMessage
							id="songsListPage__ExodusLabel"
							defaultMessage="Exodus"
							description="Songs list page Exodus link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Leviticus')}>
						<FormattedMessage
							id="songsListPage__LeviticusLabel"
							defaultMessage="Leviticus"
							description="Songs list page Leviticus link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Numbers')}>
						<FormattedMessage
							id="songsListPage__NumbersLabel"
							defaultMessage="Numbers"
							description="Songs list page Numbers link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Deuteronomy')}>
						<FormattedMessage
							id="songsListPage__DeuteronomyLabel"
							defaultMessage="Deuteronomy"
							description="Songs list page Deuteronomy link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Joshua')}>
						<FormattedMessage
							id="songsListPage__JoshuaLabel"
							defaultMessage="Joshua"
							description="Songs list page Joshua link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Judges')}>
						<FormattedMessage
							id="songsListPage__JudgesLabel"
							defaultMessage="Judges"
							description="Songs list page Judges link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Ruth')}>
						<FormattedMessage
							id="songsListPage__RuthLabel"
							defaultMessage="Ruth"
							description="Songs list page Ruth link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Samuel')}>
						<FormattedMessage
							id="songsListPage__1SamuelLabel"
							defaultMessage="1 Samuel"
							description="Songs list page 1 Samuel link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Samuel')}>
						<FormattedMessage
							id="songsListPage__2SamuelLabel"
							defaultMessage="2 Samuel"
							description="Songs list page 2 Samuel link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Kings')}>
						<FormattedMessage
							id="songsListPage__1KingsLabel"
							defaultMessage="1 Kings"
							description="Songs list page 1 Kings link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Kings')}>
						<FormattedMessage
							id="songsListPage__2KingsLabel"
							defaultMessage="2 Kings"
							description="Songs list page 2 Kings link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Chronicles')}>
						<FormattedMessage
							id="songsListPage__1ChroniclesLabel"
							defaultMessage="1 Chronicles"
							description="Songs list page 1 Chronicles link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Chronicles')}>
						<FormattedMessage
							id="songsListPage__2ChroniclesLabel"
							defaultMessage="2 Chronicles"
							description="Songs list page 2 Chronicles link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Ezra')}>
						<FormattedMessage
							id="songsListPage__EzraLabel"
							defaultMessage="Ezra"
							description="Songs list page Ezra link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Nehemiah')}>
						<FormattedMessage
							id="songsListPage__NehemiahLabel"
							defaultMessage="Nehemiah"
							description="Songs list page Nehemiah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Esther')}>
						<FormattedMessage
							id="songsListPage__EstherLabel"
							defaultMessage="Esther"
							description="Songs list page Esther link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Job')}>
						<FormattedMessage
							id="songsListPage__JobLabel"
							defaultMessage="Job"
							description="Songs list page Job link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Psalms')}>
						<FormattedMessage
							id="songsListPage__PsalmsLabel"
							defaultMessage="Psalms"
							description="Songs list page Psalms link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Proverbs')}>
						<FormattedMessage
							id="songsListPage__ProverbsLabel"
							defaultMessage="Proverbs"
							description="Songs list page Proverbs link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Ecclesiastes')}>
						<FormattedMessage
							id="songsListPage__EcclesiastesLabel"
							defaultMessage="Ecclesiastes"
							description="Songs list page Ecclesiastes link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Detail of Solomon')}>
						<FormattedMessage
							id="songsListPage__Song of SolomonLabel"
							defaultMessage="Detail of Solomon"
							description="Songs list page Detail of Solomon link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Isaiah')}>
						<FormattedMessage
							id="songsListPage__IsaiahLabel"
							defaultMessage="Isaiah"
							description="Songs list page Isaiah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Jeremiah')}>
						<FormattedMessage
							id="songsListPage__JeremiahLabel"
							defaultMessage="Jeremiah"
							description="Songs list page Jeremiah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Lamentations')}>
						<FormattedMessage
							id="songsListPage__LamentationsLabel"
							defaultMessage="Lamentations"
							description="Songs list page Lamentations link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Ezekiel')}>
						<FormattedMessage
							id="songsListPage__EzekielLabel"
							defaultMessage="Ezekiel"
							description="Songs list page Ezekiel link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Daniel')}>
						<FormattedMessage
							id="songsListPage__DanielLabel"
							defaultMessage="Daniel"
							description="Songs list page Daniel link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Hosea')}>
						<FormattedMessage
							id="songsListPage__HoseaLabel"
							defaultMessage="Hosea"
							description="Songs list page Hosea link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Joel')}>
						<FormattedMessage
							id="songsListPage__JoelLabel"
							defaultMessage="Joel"
							description="Songs list page Joel link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Amos')}>
						<FormattedMessage
							id="songsListPage__AmosLabel"
							defaultMessage="Amos"
							description="Songs list page Amos link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Obadiah')}>
						<FormattedMessage
							id="songsListPage__ObadiahLabel"
							defaultMessage="Obadiah"
							description="Songs list page Obadiah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Jonah')}>
						<FormattedMessage
							id="songsListPage__JonahLabel"
							defaultMessage="Jonah"
							description="Songs list page Jonah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Micah')}>
						<FormattedMessage
							id="songsListPage__MicahLabel"
							defaultMessage="Micah"
							description="Songs list page Micah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Nahum')}>
						<FormattedMessage
							id="songsListPage__NahumLabel"
							defaultMessage="Nahum"
							description="Songs list page Nahum link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Habakkuk')}>
						<FormattedMessage
							id="songsListPage__HabakkukLabel"
							defaultMessage="Habakkuk"
							description="Songs list page Habakkuk link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Zephaniah')}>
						<FormattedMessage
							id="songsListPage__ZephaniahLabel"
							defaultMessage="Zephaniah"
							description="Songs list page Zephaniah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Haggai')}>
						<FormattedMessage
							id="songsListPage__HaggaiLabel"
							defaultMessage="Haggai"
							description="Songs list page Haggai link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Zechariah')}>
						<FormattedMessage
							id="songsListPage__ZechariahLabel"
							defaultMessage="Zechariah"
							description="Songs list page Zechariah link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Malachi')}>
						<FormattedMessage
							id="songsListPage__MalachiLabel"
							defaultMessage="Malachi"
							description="Songs list page Malachi link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Matthew')}>
						<FormattedMessage
							id="songsListPage__MatthewLabel"
							defaultMessage="Matthew"
							description="Songs list page Matthew link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Mark')}>
						<FormattedMessage
							id="songsListPage__MarkLabel"
							defaultMessage="Mark"
							description="Songs list page Mark link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Luke')}>
						<FormattedMessage
							id="songsListPage__LukeLabel"
							defaultMessage="Luke"
							description="Songs list page Luke link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'John')}>
						<FormattedMessage
							id="songsListPage__JohnLabel"
							defaultMessage="John"
							description="Songs list page John link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Acts')}>
						<FormattedMessage
							id="songsListPage__ActsLabel"
							defaultMessage="Acts"
							description="Songs list page Acts link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Romans')}>
						<FormattedMessage
							id="songsListPage__RomansLabel"
							defaultMessage="Romans"
							description="Songs list page Romans link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Corinthians')}>
						<FormattedMessage
							id="songsListPage__1CorinthiansLabel"
							defaultMessage="1 Corinthians"
							description="Songs list page 1 Corinthians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Corinthians')}>
						<FormattedMessage
							id="songsListPage__2CorinthiansLabel"
							defaultMessage="2 Corinthians"
							description="Songs list page 2 Corinthians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Galatians')}>
						<FormattedMessage
							id="songsListPage__GalatiansLabel"
							defaultMessage="Galatians"
							description="Songs list page Galatians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Ephesians')}>
						<FormattedMessage
							id="songsListPage__EphesiansLabel"
							defaultMessage="Ephesians"
							description="Songs list page Ephesians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Philippians')}>
						<FormattedMessage
							id="songsListPage__PhilippiansLabel"
							defaultMessage="Philippians"
							description="Songs list page Philippians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Colossians')}>
						<FormattedMessage
							id="songsListPage__ColossiansLabel"
							defaultMessage="Colossians"
							description="Songs list page Colossians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Thessalonians')}>
						<FormattedMessage
							id="songsListPage__1ThessaloniansLabel"
							defaultMessage="1 Thessalonians"
							description="Songs list page 1 Thessalonians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Thessalonians')}>
						<FormattedMessage
							id="songsListPage__2ThessaloniansLabel"
							defaultMessage="2 Thessalonians"
							description="Songs list page 2 Thessalonians link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Timothy')}>
						<FormattedMessage
							id="songsListPage__1TimothyLabel"
							defaultMessage="1 Timothy"
							description="Songs list page 1 Timothy link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Timothy')}>
						<FormattedMessage
							id="songsListPage__2TimothyLabel"
							defaultMessage="2 Timothy"
							description="Songs list page 2 Timothy link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Titus')}>
						<FormattedMessage
							id="songsListPage__TitusLabel"
							defaultMessage="Titus"
							description="Songs list page Titus link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Philemon')}>
						<FormattedMessage
							id="songsListPage__PhilemonLabel"
							defaultMessage="Philemon"
							description="Songs list page Philemon link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Hebrews')}>
						<FormattedMessage
							id="songsListPage__HebrewsLabel"
							defaultMessage="Hebrews"
							description="Songs list page Hebrews link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'James')}>
						<FormattedMessage
							id="songsListPage__JamesLabel"
							defaultMessage="James"
							description="Songs list page James link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 Peter')}>
						<FormattedMessage
							id="songsListPage__1PeterLabel"
							defaultMessage="1 Peter"
							description="Songs list page 1 Peter link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 Peter')}>
						<FormattedMessage
							id="songsListPage__2PeterLabel"
							defaultMessage="2 Peter"
							description="Songs list page 2 Peter link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '1 John')}>
						<FormattedMessage
							id="songsListPage__1JohnLabel"
							defaultMessage="1 John"
							description="Songs list page 1 John link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '2 John')}>
						<FormattedMessage
							id="songsListPage__2JohnLabel"
							defaultMessage="2 John"
							description="Songs list page 2 John link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, '3 John')}>
						<FormattedMessage
							id="songsListPage__3JohnLabel"
							defaultMessage="3 John"
							description="Songs list page 3 John link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Jude')}>
						<FormattedMessage
							id="songsListPage__JudeLabel"
							defaultMessage="Jude"
							description="Songs list page Jude link label"
						/>
					</a>
				</li>
				<li>
					<a href={makeBibleMusicRoute(languageRoute, 'Revelation')}>
						<FormattedMessage
							id="songsListPage__RevelationLabel"
							defaultMessage="Revelation"
							description="Songs list page Revelation link label"
						/>
					</a>
				</li>
			</ul>
			<h2>
				<FormattedMessage
					id="songsListPage__albumTabLabel"
					defaultMessage="Albums"
					description="Songs list page album tab label"
				/>
			</h2>
			<ul>
				{data?.musicAlbums?.nodes?.map((n) => (
					<li key={n.id}>
						<a href={makeAlbumRoute(languageRoute, n.id)}>
							<Image
								src={n.imageWithFallback.url}
								alt={n.title}
								width={100}
								height={100}
							/>
							<span>{n.title}</span>
							<span>{n.sponsor?.title}</span>
						</a>
					</li>
				))}
			</ul>
			<h2>
				<FormattedMessage
					id="songsListPage__sponsorTabLabel"
					defaultMessage="Sponsors"
					description="Songs list page sponsor tab label"
				/>
			</h2>
			<ul>
				{data?.sponsors?.nodes?.map((n) => (
					<li key={n.id}>
						<a href={makeSponsorMusicRoute(languageRoute, n.id)}>
							<Image
								src={n.imageWithFallback.url}
								alt={n.title}
								width={100}
								height={100}
							/>
							{n.title}
						</a>
					</li>
				))}
			</ul>
			<h2>
				<FormattedMessage
					id="songsListPage__tagTabLabel"
					defaultMessage="Tags"
					description="Songs list page tag tab label"
				/>
			</h2>
			<ul>
				{data?.musicMoodTags?.nodes?.map((n) => (
					<li key={n.id}>
						<a href={makeTagMusicRoute(languageRoute, n.name)}>{n.name}</a>
					</li>
				))}
			</ul>
		</>
	);
}

export default SongList;
