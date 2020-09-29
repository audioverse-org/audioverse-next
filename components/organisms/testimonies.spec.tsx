import { render } from '@testing-library/react';
import React from 'react';
import Testimonies from '@components/organisms/testimonies';

describe('testimonies', () => {
	it('renders', async () => {
		await render(<Testimonies />);
	});
});
