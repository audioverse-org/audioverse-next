import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@lib/constants';
import { CollectionContentType } from '@lib/generated/graphql';

import ListIcon from '../../../public/img/fa-list.svg';

import TypeLockup from './typeLockup';

type Props = {
	contentType: CollectionContentType;
};

export default function CollectionTypeLockup({
	contentType,
}: Props): JSX.Element {
	const label = {
		[CollectionContentType.AudiobookSeries]: (
			<FormattedMessage
				id="collectionType__audiobookSeries"
				defaultMessage="Book Series"
			/>
		),
		[CollectionContentType.Conference]: (
			<FormattedMessage
				id="collectionType__conference"
				defaultMessage="Conference"
			/>
		),
		[CollectionContentType.MusicSeries]: (
			<FormattedMessage
				id="collectionType__musicSeries"
				defaultMessage="Music Series"
			/>
		),
		[CollectionContentType.StoryProgram]: (
			<FormattedMessage
				id="collectionType__storyProgram"
				defaultMessage="Story Program"
			/>
		),
	}[contentType];
	return (
		<TypeLockup
			Icon={ListIcon}
			label={label}
			iconColor={BaseColors.SALMON}
			textColor={BaseColors.WHITE}
		/>
	);
}
