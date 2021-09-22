import React from 'react';
import { FormattedMessage } from 'react-intl';

import AudiobookIcon from '../../public/img/fa-book.svg';
import StoryIcon from '../../public/img/fa-feather.svg';
import ListIcon from '../../public/img/fa-list-alt.svg';
import SongIcon from '../../public/img/fa-music.svg';

import { BaseColors } from './constants';
import { SequenceContentType } from './generated/graphql';

type ISequenceTypeTheme = {
	iconColor: BaseColors.RED | BaseColors.SALMON;
	textColor: BaseColors.WHITE | BaseColors.DARK;
	Icon: any;
	label: JSX.Element;
};

export function getSequenceTypeTheme(
	contentType: SequenceContentType
): ISequenceTypeTheme {
	return (
		{
			[SequenceContentType.Audiobook]: {
				iconColor: BaseColors.SALMON,
				textColor: BaseColors.WHITE,
				Icon: AudiobookIcon,
				label: (
					<FormattedMessage
						id="sequenceType__audiobookTitle"
						defaultMessage="Book"
					/>
				),
			},
			[SequenceContentType.MusicAlbum]: {
				iconColor: BaseColors.RED,
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
				iconColor: BaseColors.RED,
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
				iconColor: BaseColors.SALMON,
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
