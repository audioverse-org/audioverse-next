import React from 'react';
import { FormattedMessage } from 'react-intl';
import withIntl from '@components/HOCs/withIntl';

const Testimonies = () => {
	return (
		<h2>
			<FormattedMessage id={'title'} defaultMessage={'Testimonies'} />
		</h2>
	);
};

export default withIntl(Testimonies);
