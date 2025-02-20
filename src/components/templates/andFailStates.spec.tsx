import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import AndFailStates from '~src/components/templates/andFailStates';

jest.mock('next/router');

describe('AndFailStates HOC', () => {
	it('supports no should404 prop', async () => {
		// Mock console for expected error
		const consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		jest.mocked(useRouter).mockReturnValue({ isFallback: false } as any);

		render(
			<AndFailStates
				Component={() => <p>hello world</p>}
				componentProps={{}}
			/>,
		);

		consoleError.mockRestore();
		consoleLog.mockRestore();
	});
});
