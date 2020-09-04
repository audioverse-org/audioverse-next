import { render } from '@testing-library/react';
import Home from './home';
import React from 'react';
import { getStaticProps } from '../pages/[language]/index';

describe('home page', () => {
	it('can render', async () => {
		const { props } = await getStaticProps({ params: {} });
		render(<Home {...props} />);
	});

	it('revalidates static copy every 10s', async () => {
		const { revalidate } = await getStaticProps({ params: {} });

		expect(revalidate).toBe(10);
	});
});
