import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';

import ListIcon from '../../../public/img/fa-list.svg';

import TypeLockup from './typeLockup';

export default function CollectionTypeLockup(): JSX.Element {
	return (
		<TypeLockup
			Icon={ListIcon}
			label={
				<FormattedMessage
					id="collectionTypeLockup_type"
					defaultMessage="Conference"
				/>
			}
			iconColor={BaseColors.SALMON}
			textColor={BaseColors.WHITE}
		/>
	);
}
