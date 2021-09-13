import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { IButtonType } from '@components/molecules/button';

import IconBack from '../../../public/img/icon-back-light.svg';

export default function ButtonBack({
	backUrl,
	type = 'secondary',
	className,
}: {
	backUrl: string;
	type?: IButtonType;
	className?: string;
}): JSX.Element {
	return (
		<Button
			type={type}
			text={<FormattedMessage id="backButton__back" defaultMessage="Back" />}
			Icon={IconBack}
			href={backUrl}
			className={className}
		/>
	);
}
