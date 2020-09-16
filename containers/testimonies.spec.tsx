import { render } from '@testing-library/react';
import React from 'react';
import Testimonies, { getStaticPaths, getStaticProps } from '@pages/[language]/testimonies/page/[i]';
import { getTestimonyCount } from '@lib/api';

jest.mock('@lib/api');

function setEntityCount(count: number) {
	(getTestimonyCount as jest.Mock).mockReturnValue(Promise.resolve(count));
}

describe('testimonies pages', () => {
	it('renders', async () => {
		const params = {};
		const { props } = await getStaticProps({ params });

		await render(<Testimonies {...props} />);
	});

	it('revalidates', async () => {
		const { revalidate } = await getStaticProps({ params: {} });

		expect(revalidate).toBe(10);
	});

	it('gets testimony count', async () => {
		setEntityCount(0);

		await getStaticPaths();

		expect(getTestimonyCount).toBeCalledWith('ENGLISH');
	});

	it('generates static paths', async () => {
		setEntityCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/testimonies/page/1');
	});
});
