import { act, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';

export async function simulateMediaTick() {
	const video = screen.getByTestId('video-element');
	await act(async () => {
		ReactTestUtils.Simulate.timeUpdate(video, {} as any);
	});
}
