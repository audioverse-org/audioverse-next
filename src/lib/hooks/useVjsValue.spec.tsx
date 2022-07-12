/* eslint-disable react-hooks/exhaustive-deps */
import useVjsValue from '@lib/hooks/useVjsValue';
import React, { useEffect, useMemo } from 'react';
import AndVjs, { VjsContextType } from '@components/templates/andVjs';
import renderWithProviders from '@lib/test/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import useWithRecording from '@lib/hooks/useWithRecording';
import userEvent from '@testing-library/user-event';
import videojs from 'video.js';

const RECORDING_STUB = {
	id: 'recording-id',
} as any;

async function renderWithContext(ui: JSX.Element) {
	await renderWithProviders(<AndVjs>{ui}</AndVjs>);
}

const _get = (c: VjsContextType) => c.vjs.paused();
const _set = (c: VjsContextType, v: boolean) =>
	v ? c.vjs.pause() : c.vjs.play();

function useTestValue() {
	const wr = useWithRecording(RECORDING_STUB, {});
	const [v, set] = useVjsValue<boolean>({
		e: 'play',
		get: _get,
		set: _set,
		defaultValue: true,
	});
	return useMemo(() => ({ wr, v, set }), [wr, v, set]);
}

describe('useVjsValue', () => {
	it.only('works with useEffect', async () => {
		const C = () => {
			const { wr, v, set } = useTestValue();

			useEffect(() => {
				wr(() => {
					set(false);
				});
			}, [wr, set]);

			return <button>{v?.toString()}</button>;
		};

		await renderWithContext(<C />);

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		await expect(screen.findByText('false')).resolves.toBeInTheDocument();
	});

	it('works with click handler', async () => {
		const C = () => {
			const { wr, v, set } = useTestValue();

			return (
				<button
					onClick={() => {
						wr(() => set(false));
					}}
				>
					{v?.toString()}
				</button>
			);
		};

		await renderWithContext(<C />);

		userEvent.click(screen.getByRole('button'));

		await expect(screen.findByText('false')).resolves.toBeInTheDocument();
	});
});
