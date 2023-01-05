import { CardTheme } from '@/components/molecules/card/base/withCardTheme';

import { BaseColors } from './constants';
import { RecordingContentType } from './generated/graphql';

type ISequenceTypeTheme = {
	accentColor: BaseColors.RED | BaseColors.SALMON;
	backgroundColor: BaseColors;
	textColor: BaseColors.WHITE | BaseColors.DARK | BaseColors.LIGHT_TONE;
	textSecondaryColor:
		| BaseColors.WHITE
		| BaseColors.DARK
		| BaseColors.LIGHT_TONE
		| BaseColors.MID_TONE;
	textRuleColor:
		| BaseColors.CREAM
		| BaseColors.STORY_H
		| BaseColors.BOOK_H
		| BaseColors.LIGHT_TONE;
	theme: CardTheme;
	useInverseButtons: boolean;
};

export function getRecordingTypeTheme(
	contentType: RecordingContentType
): ISequenceTypeTheme {
	return (
		{
			[RecordingContentType.AudiobookTrack]: {
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.BOOK_B,
				textColor: BaseColors.WHITE,
				textSecondaryColor: BaseColors.LIGHT_TONE,
				textRuleColor: BaseColors.BOOK_H,
				theme: 'audiobookTrack',
				useInverseButtons: true,
			},
			[RecordingContentType.BibleChapter]: {
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.BIBLE_B,
				textColor: BaseColors.DARK,
				textSecondaryColor: BaseColors.LIGHT_TONE,
				textRuleColor: BaseColors.CREAM,
				theme: 'chapter',
				useInverseButtons: false,
			},
			[RecordingContentType.MusicTrack]: {
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.SONG_B,
				textColor: BaseColors.DARK,
				textSecondaryColor: BaseColors.MID_TONE,
				textRuleColor: BaseColors.LIGHT_TONE,
				theme: 'song',
				useInverseButtons: false,
			},
			[RecordingContentType.Sermon]: {
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.WHITE,
				textColor: BaseColors.DARK,
				textSecondaryColor: BaseColors.MID_TONE,
				textRuleColor: BaseColors.CREAM,
				theme: 'sermon',
				useInverseButtons: false,
			},
			[RecordingContentType.Story]: {
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.STORY_B,
				textColor: BaseColors.WHITE,
				textSecondaryColor: BaseColors.LIGHT_TONE,
				textRuleColor: BaseColors.STORY_H,
				theme: 'story',
				useInverseButtons: true,
			},
		} as const
	)[contentType];
}
