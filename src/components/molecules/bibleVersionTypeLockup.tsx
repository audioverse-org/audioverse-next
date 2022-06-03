import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@lib/constants';

import BibleIcon from '../../../public/img/icons/fa-bible.svg';

import TypeLockup from './typeLockup';

type Props = {
	label?: JSX.Element | string;
	unpadded?: boolean;
};

export default function BibleVersionTypeLockup({
	label = (
		<FormattedMessage
			id="bibleVersionTypeLockup__type"
			defaultMessage="Bible Version"
		/>
	),
	...props
}: Props): JSX.Element {
	return (
		<TypeLockup
			Icon={BibleIcon}
			iconColor={BaseColors.SALMON}
			label={label}
			textColor={BaseColors.WHITE}
			{...props}
		/>
	);
}
