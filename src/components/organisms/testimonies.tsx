import React from 'react';
import { FormattedMessage } from 'react-intl';

const Testimonies = (): JSX.Element => {
	return (
		<>
			<FormattedMessage
				id={'testimoniesComponent__placeholder'}
				defaultMessage={'testimonies-placeholder'}
				description={'testimonies component placeholder'}
			/>
		</>
	);
};

export default Testimonies;
