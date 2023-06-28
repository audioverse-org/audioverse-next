import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import withFailStates from '~components/HOCs/withFailStates';

jest.mock('next/router');

describe('withFailStates HOC', () => {
	it('supports no should404 prop', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });

		const Comp = () => <p>hello world</p>,
			Hoc = withFailStates(Comp);

		await render(<Hoc />);
	});
});
