import { render, waitFor } from '@testing-library/react';
import AndVjs, { VjsContext } from './andVjs';
import React, { useContext, useEffect } from 'react';
import { screen } from '@testing-library/react';
import { VideoJsPlayer } from 'video.js';

const renderComponent = async () => {
	let vjs: VideoJsPlayer | undefined;

	const C = () => {
		vjs = useContext(VjsContext);
		useEffect(() => {
			vjs?.pause();
		}, []);

		return <div>hello world</div>;
	};

	const view = render(
		<AndVjs>
			<C />
		</AndVjs>
	);

	await waitFor(() => {
		expect(vjs).toBeDefined();
	});

	if (vjs === undefined) {
		throw new Error('Unreachable');
	}

	return { ...view, vjs };
};

describe('andPlaybackContext', () => {
	it('handles set paused to false', async () => {
		const { vjs } = await renderComponent();

		vjs.pause();

		expect(vjs.paused()).toBe(true);
	});

	it('handles set paused to true', async () => {
		const { vjs } = await renderComponent();

		vjs.play();

		expect(vjs.paused()).toBe(false);
	});
});
