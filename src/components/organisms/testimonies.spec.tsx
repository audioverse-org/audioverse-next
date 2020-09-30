import { render } from '@testing-library/react';
import React from 'react';

import Testimonies from '@components/organisms/testimonies';
import { loadQuery } from '@lib/test/helpers';
import withIntl from '@components/HOCs/withIntl';

const renderTestimonies = async () => {
	const WithIntl = withIntl(Testimonies);

	return render(<WithIntl />);
};

describe('testimonies', () => {
	it('has title', async () => {
		const { getByText } = await renderTestimonies();

		expect(getByText('Testimonies')).toBeDefined();
	});

	it('translates title', async () => {
		loadQuery({ language: 'es' });

		const { getByText } = await renderTestimonies();

		expect(getByText('Testimonios')).toBeDefined();
	});
});
