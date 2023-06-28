import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';

import UserPlusIcon from '../../../public/img/icons/fa-user-plus.svg';
import TypeLockup from './typeLockup';

export default function SponsorTypeLockup(): JSX.Element {
	return (
		<TypeLockup
			Icon={UserPlusIcon}
			label={
				<FormattedMessage
					id="sopnsorTypeLockup_type"
					defaultMessage="Sponsor"
				/>
			}
			iconColor={BaseColors.SALMON}
			textColor={BaseColors.DARK}
		/>
	);
}
