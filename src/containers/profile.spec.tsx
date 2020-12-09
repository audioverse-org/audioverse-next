import { render } from '@testing-library/react';
import React from 'react';

import Profile from '@pages/[language]/profile';

async function renderPage() {
	// const { props } = await getStaticProps();
	const props = {};
	return render(<Profile {...props} />);
}

describe('profile page', () => {
	beforeEach(() => jest.resetAllMocks());

	it('renders', async () => {
		await renderPage();
	});
});
