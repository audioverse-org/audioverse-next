import { render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import { QueryCache } from 'react-query';
import { hydrate } from 'react-query/hydration';

import * as api from '@lib/api';
import Profile, { getServerProps } from '@pages/[language]/profile';

jest.mock('@lib/api/getMe');

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

	it('dehydrates user', async () => {
		jest.spyOn(api, 'getMe').mockResolvedValue({
			name: 'the_name',
		});

		const props = await getServerProps();

		const queryCache = new QueryCache();

		hydrate(queryCache, props.dehydratedState);

		const me = queryCache.getQueryData('me');

		expect(_.get(me, 'name')).toEqual('the_name');
	});
});
