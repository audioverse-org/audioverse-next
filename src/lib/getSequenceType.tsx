import React from 'react';
import { FormattedMessage } from 'react-intl';

import BibleIcon from '../../public/img/fa-bible.svg';
import AudiobookIcon from '../../public/img/fa-book-light.svg';
import StoryIcon from '../../public/img/fa-feather-light.svg';
import ListIcon from '../../public/img/fa-list-alt.svg';
import SongIcon from '../../public/img/fa-music-light.svg';

import { BaseColors } from './constants';
import { SequenceContentType } from './generated/graphql';

type ISequenceTypeTheme = {
	backgroundColor:
		| BaseColors.BIBLE_B
		| BaseColors.BOOK_H
		| BaseColors.SONG_H
		| BaseColors.CREAM
		| BaseColors.STORY_H;
	iconColor: BaseColors.RED | BaseColors.SALMON;
	textColor: BaseColors.WHITE | BaseColors.DARK;
	ruleColor: BaseColors.LIGHT_TONE | BaseColors.MID_TONE;
	Icon: React.ElementType;
	label: JSX.Element;
};

export function getSequenceTypeTheme(
	contentType: SequenceContentType
): ISequenceTypeTheme {
	return (
		{
			[SequenceContentType.Audiobook]: {
				backgroundColor: BaseColors.BOOK_H,
				iconColor: BaseColors.SALMON,
				ruleColor: BaseColors.MID_TONE,
				textColor: BaseColors.WHITE,
				Icon: AudiobookIcon,
				label: (
					<FormattedMessage
						id="sequenceType__audiobookTitle"
						defaultMessage="Book"
					/>
				),
			},
			[SequenceContentType.BibleBook]: {
				backgroundColor: BaseColors.BIBLE_B,
				iconColor: BaseColors.SALMON,
				ruleColor: BaseColors.MID_TONE,
				textColor: BaseColors.WHITE,
				Icon: BibleIcon,
				label: (
					<FormattedMessage
						id="sequenceType__bibleBookTitle"
						defaultMessage="Bible Book"
					/>
				),
			},
			[SequenceContentType.MusicAlbum]: {
				backgroundColor: BaseColors.SONG_H,
				iconColor: BaseColors.RED,
				ruleColor: BaseColors.LIGHT_TONE,
				textColor: BaseColors.DARK,
				Icon: SongIcon,
				label: (
					<FormattedMessage
						id="sequenceType__musicTrackTitle"
						defaultMessage="Scripture Songs"
					/>
				),
			},
			[SequenceContentType.Series]: {
				backgroundColor: BaseColors.CREAM,
				iconColor: BaseColors.RED,
				ruleColor: BaseColors.MID_TONE,
				textColor: BaseColors.DARK,
				Icon: ListIcon,
				label: (
					<FormattedMessage
						id="sequenceType__seriesTitle"
						defaultMessage="Series"
					/>
				),
			},
			[SequenceContentType.StorySeason]: {
				backgroundColor: BaseColors.STORY_H,
				iconColor: BaseColors.SALMON,
				ruleColor: BaseColors.LIGHT_TONE,
				textColor: BaseColors.WHITE,
				Icon: StoryIcon,
				label: (
					<FormattedMessage
						id="sequenceType__storyTitle"
						defaultMessage="Stories"
					/>
				),
			},
		} as const
	)[contentType];
}
