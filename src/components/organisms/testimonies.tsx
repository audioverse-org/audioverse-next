import React from 'react';
import { FormattedMessage } from 'react-intl';

const Testimonies = (): JSX.Element => {
	return (
		<h2>
			<FormattedMessage
				id="title"
				defaultMessage="Testimonies"
				description="Testimonies slider title"
			/>
		</h2>
	);
};

export default Testimonies;
