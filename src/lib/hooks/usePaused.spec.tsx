import { useEffect } from 'react';
import AndVjs from '@components/templates/andVjs';
import React from 'react';
import renderWithProviders from '@lib/test/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import usePaused from '@lib/hooks/usePaused';

const C = () => {
	const [paused, setPaused] = usePaused(
		{
			id: 'recording-id',
		} as any,
		{}
	);

	useEffect(() => {
		setPaused(false);
	}, [setPaused]);

	return <div>{paused.toString()}</div>;
};

describe('useVjsValue', () => {
	it('works', async () => {
		await renderWithProviders(
			<AndVjs>
				<C />
			</AndVjs>
		);

		await waitFor(() => {
			expect(screen.getByText('false')).toBeInTheDocument();
		});
	});
});
