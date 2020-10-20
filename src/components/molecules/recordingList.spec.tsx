import { render } from '@testing-library/react';
import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import { loadQuery } from '@lib/test/helpers';

describe('recording list', () => {
	it('renders', async () => {
		loadQuery({ language: 'en' });
		await render(<RecordingList sermons={[]} />);
	});
});
