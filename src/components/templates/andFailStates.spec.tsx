import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import AndFailStates from '~src/components/templates/andFailStates';

jest.mock('next/router');

describe('AndFailStates HOC', () => {
	it('supports no should404 prop', async () => {
		jest.mocked(useRouter).mockReturnValue({ isFallback: false } as any);

		render(
			<AndFailStates
				Component={() => <p>hello world</p>}
				componentProps={{}}
			/>,
		);
	});
});
