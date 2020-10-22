import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createModel } from '@xstate/test';
import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import machine from '@components/molecules/recordingList.machine';
import { loadQuery } from '@lib/test/helpers';

type RenderComponentReturnType = RenderResult & {
	allInput: HTMLElement;
	videoInput: HTMLElement;
	audioInput: HTMLElement;
};

async function renderComponent(
	sermonData = {}
): Promise<RenderComponentReturnType> {
	loadQuery({ language: 'en' });

	const result = render(
		<RecordingList
			sermons={[
				{
					imageWithFallback: {
						url: 'the_url',
					},
					title: 'the_title',
					persons: [{ name: 'the_person_name', id: 'the_person_id' }],
					duration: 600,
					...sermonData,
				} as any,
			]}
		/>
	);

	const { getByRole } = result;

	return {
		allInput: getByRole('radio', { name: 'All' }),
		videoInput: getByRole('radio', { name: 'Video' }),
		audioInput: getByRole('radio', { name: 'Audio' }),
		...result,
	};
}

machine.states.all.meta = {
	test: async (page: RenderComponentReturnType) => {
		expect(page.allInput).toBeChecked();
	},
};

machine.states.video.meta = {
	test: async (page: RenderComponentReturnType) => {
		expect(page.videoInput).toBeChecked();
	},
};

machine.states.audio.meta = {
	test: async (page: RenderComponentReturnType) => {
		expect(page.audioInput).toBeChecked();
	},
};

const model = createModel(machine).withEvents({
	ALL: {
		exec: ({ getByText }: any) => {
			userEvent.click(getByText('All'));
		},
	},
	VIDEO: {
		exec: ({ getByText }: any) => {
			userEvent.click(getByText('Video'));
		},
	},
	AUDIO: {
		exec: ({ getByText }: any) => {
			userEvent.click(getByText('Audio'));
		},
	},
});

const testPlans = model.getShortestPathPlans();

testPlans.forEach((plan) => {
	describe(plan.description, () => {
		plan.paths.forEach((path) => {
			it(path.description, async () => {
				const result = await renderComponent();
				await path.test(result);
			});
		});
	});
});

describe('recording list', () => {
	it('renders', async () => {
		await renderComponent();
	});

	it('has image', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('img')).toBeInTheDocument();
	});

	it('sets image src', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('img')).toHaveAttribute('src', 'the_url');
	});

	it('sets alt', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('img')).toHaveAttribute('alt', 'the_title');
	});

	it('includes presenter names', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('link', { name: 'the_person_name' })).toBeInTheDocument();
	});

	it('includes presenter link', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('link', { name: 'the_person_name' })).toHaveAttribute(
			'href',
			'/en/presenters/the_person_id'
		);
	});

	it('includes duration', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('10:00')).toBeInTheDocument();
	});

	it('includes seconds in duration', async () => {
		const { getByText } = await renderComponent({
			duration: 601,
		});

		expect(getByText('10:01')).toBeInTheDocument();
	});

	it('includes hours in duration', async () => {
		const { getByText } = await renderComponent({
			duration: 60 * 60,
		});

		expect(getByText('1:00:00')).toBeInTheDocument();
	});

	it('pads seconds correctly', async () => {
		const { getByText } = await renderComponent({
			duration: 610,
		});

		expect(getByText('10:10')).toBeInTheDocument();
	});

	it('rounds seconds', async () => {
		const { getByText } = await renderComponent({
			duration: 0.7,
		});

		expect(getByText('0:01')).toBeInTheDocument();
	});

	it('has all button', async () => {
		const { allInput } = await renderComponent();

		expect(allInput).toBeInTheDocument();
	});

	it('has video button', async () => {
		const { videoInput } = await renderComponent();

		expect(videoInput).toBeInTheDocument();
	});

	it('has audio button', async () => {
		const { audioInput } = await renderComponent();

		expect(audioInput).toBeInTheDocument();
	});

	it('preselects all', async () => {
		const { allInput } = await renderComponent();

		expect(allInput).toBeChecked();
	});

	it('selecting filter settings works', async () => {
		const { audioInput } = await renderComponent();

		userEvent.click(audioInput);

		expect(audioInput).toBeChecked();
	});

	it('can select video input', async () => {
		const { videoInput } = await renderComponent();

		userEvent.click(videoInput);

		expect(videoInput).toBeChecked();
	});

	it('should have full model coverage', async () => {
		return model.testCoverage();
	});

	it('supports VIDEO > ALL', async () => {
		const { allInput, videoInput } = await renderComponent();

		userEvent.click(videoInput);
		userEvent.click(allInput);

		expect(allInput).toBeChecked();
	});

	it('supports VIDEO > AUDIO', async () => {
		const { videoInput, audioInput } = await renderComponent();

		userEvent.click(videoInput);
		userEvent.click(audioInput);

		expect(audioInput).toBeChecked();
	});

	it('supports AUDIO > ALL', async () => {
		const { allInput, audioInput } = await renderComponent();

		userEvent.click(audioInput);
		userEvent.click(allInput);

		expect(allInput).toBeChecked();
	});

	it('supports AUDIO > VIDEO', async () => {
		const { videoInput, audioInput } = await renderComponent();

		userEvent.click(audioInput);
		userEvent.click(videoInput);

		expect(videoInput).toBeChecked();
	});
});
