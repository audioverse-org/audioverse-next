import { render } from '@testing-library/react';
import React from 'react';

import Testimonies from '@components/organisms/testimonies';
import { loadQuery } from '@lib/test/helpers';

describe('testimonies', () => {
	it('renders', async () => {
		await render(<Testimonies />);
	});

	it('has title', async () => {
		const { getByText } = await render(<Testimonies />);

		expect(getByText('Testimonies')).toBeDefined();
	});

	it('translates title', async () => {
		loadQuery({ language: 'es' });

		const { getByText } = await render(<Testimonies />);

		expect(getByText('Testimonios')).toBeDefined();
	});
});
