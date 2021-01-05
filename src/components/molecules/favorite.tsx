import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useIsRecordingFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const { isRecordingFavorited, toggleFavorited } = useIsRecordingFavorited(id);

	return (
		<button onClick={() => toggleFavorited()}>
			{isRecordingFavorited ? (
				<FormattedMessage
					id="RecordingFavorite__unfavorite"
					defaultMessage="Unfavorite"
					description="Recording unfavorite button label"
				/>
			) : (
				<FormattedMessage
					id="RecordingFavorite__favorite"
					defaultMessage="Favorite"
					description="Recording favorite button label"
				/>
			)}
		</button>
	);
}
