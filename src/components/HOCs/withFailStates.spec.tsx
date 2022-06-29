import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';

jest.mock('next/router');

describe('withFailStates HOC', () => {
	it('supports no should404 prop', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });

		const Comp = () => <p>hello world</p>;
		const Hoc = withFailStates(Comp);

		await expect(() => render(<Hoc />)).not.toThrow();
	});
});
