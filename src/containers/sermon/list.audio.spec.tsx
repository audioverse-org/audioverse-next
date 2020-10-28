import { render } from '@testing-library/react';
import React from 'react';

import { getSermonCount, getSermons } from '@lib/api';
import { loadQuery, loadSermons } from '@lib/test/helpers';
import { getStaticPaths } from '@pages/[language]/sermons/audio/page/[i]';
import SermonList, {
	getStaticProps,
} from '@pages/[language]/sermons/audio/page/[i]';

jest.mock('@lib/api');

const renderPage = async ({
	params = { i: '1', language: 'en' },
	query = {},
} = {}) => {
	loadQuery(query);
	const { props } = await getStaticProps({ params });
	return render(<SermonList {...props} />);
};

describe('sermon audio list page', () => {
	it('gets audio count', async () => {
		await getStaticPaths();

		expect(getSermonCount).toBeCalledWith('ENGLISH', { hasVideo: false });
	});

	it('gets audio filtered sermons', async () => {
		loadSermons();

		await renderPage({
			params: {
				i: '1',
				language: 'en',
			},
		});

		expect(getSermons).toBeCalledWith('ENGLISH', {
			hasVideo: false,
			first: 25,
			offset: 0,
		});
	});
});
