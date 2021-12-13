import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@lib/constants';

import UserIcon from '../../../public/img/fa-user.svg';

import TypeLockup from './typeLockup';

export default function PersonTypeLockup(): JSX.Element {
	return (
		<TypeLockup
			Icon={UserIcon}
			label={
				<FormattedMessage
					id="personTypeLockup_type"
					defaultMessage="Presenter"
				/>
			}
			iconColor={BaseColors.RED}
			textColor={BaseColors.DARK}
		/>
	);
}
