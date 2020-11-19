import { render } from '@testing-library/react';
import React from 'react';

import MyApp from '@pages/_app';

describe('app', () => {
	it('sets title', async () => {
		const { getByTestId } = await render(
			<MyApp
				Component={((() => null) as unknown) as typeof React.Component}
				pageProps={{}}
			/>
		);

		const head = getByTestId('head');

		expect(head.innerHTML).toContain('AudioVerse');
	});
});
