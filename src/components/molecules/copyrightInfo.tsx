import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './copyrightInfo.module.scss';

import { CopyrightInfoFragment } from '@lib/generated/graphql';

interface CopyrightInfoProps {
	recording: CopyrightInfoFragment;
}

export default function CopyrightInfo({
	recording,
}: CopyrightInfoProps): JSX.Element {
	const copyrightOwner =
		recording?.distributionAgreement?.sponsor?.title ||
		recording?.sponsor?.title;
	const copyrightImageUrl =
		recording?.distributionAgreement?.license?.image?.url;
	return (
		<>
			{/* TODO: Correct copyright image dimensions */}
			{copyrightImageUrl && (
				<img
					className={styles.image}
					alt={'copyright'}
					src={copyrightImageUrl}
					width={100}
					height={100}
				/>
			)}
			<p>
				<span>
					<FormattedMessage
						id={'sermonDetailPage__copyright'}
						defaultMessage={'Copyright ⓒ{year} {owner}'}
						description={'Copyright year and owner'}
						values={{
							year: recording?.copyrightYear,
							owner: copyrightOwner,
						}}
					/>
				</span>
				<br />
				<span>{recording?.distributionAgreement?.license?.summary}</span>
			</p>
		</>
	);
}
