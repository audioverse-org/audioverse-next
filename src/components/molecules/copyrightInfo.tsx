import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CopyrightInfoFragment } from '@lib/generated/graphql';

import styles from './copyrightInfo.module.scss';

interface CopyrightInfoProps {
	recording: CopyrightInfoFragment;
	useInverse?: boolean;
}

export default function CopyrightInfo({
	recording,
	useInverse,
}: CopyrightInfoProps): JSX.Element {
	const copyrightOwner =
		recording.distributionAgreement?.sponsor?.title || recording.sponsor?.title;
	return (
		<div className={clsx(styles.text, useInverse && styles.inverse)}>
			<span>
				<FormattedMessage
					id="sermonDetailPage__copyright"
					defaultMessage="Copyright ⓒ{year} {owner}."
					description="Copyright year and owner"
					values={{
						year: recording?.copyrightYear,
						owner: copyrightOwner,
					}}
				/>
			</span>
			<br />
			<div
				dangerouslySetInnerHTML={{
					__html: recording.distributionAgreement?.license?.summary || '',
				}}
			/>
			<div>
				<FormattedMessage
					id="sermonDetailPage__disclaimer"
					defaultMessage="The ideas in this recording are those of its contributors and may not necessarily reflect the views of AudioVerse."
				/>
			</div>
		</div>
	);
}
