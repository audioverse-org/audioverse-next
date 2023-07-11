import { screen } from '@testing-library/react';

import { buildRenderer } from '~src/lib/test/buildRenderer';

import CardTopic from './topic';

const recording: {
	entity: {
		__typename: 'Recording';
	};
} = {
	entity: {
		__typename: 'Recording',
	},
};

const sequence: {
	entity: {
		__typename: 'Sequence';
	};
} = {
	entity: {
		__typename: 'Sequence',
	},
};

const render = buildRenderer(CardTopic, {
	defaultProps: {
		topic: {
			title: 'the_title',
			items: {
				aggregate: null,
			},
		},
	},
});

describe('topic card', () => {
	it('uses "items" label when count is 0', async () => {
		await render();

		expect(screen.getByText(/items/)).toBeInTheDocument();
	});

	it('uses "items" label when topic contains both recordings and series', async () => {
		await render({
			props: {
				topic: {
					title: 'the_title',
					items: {
						nodes: [recording, sequence],
						aggregate: {
							count: 2,
						},
					},
				},
			},
		});

		expect(screen.getByText(/items/)).toBeInTheDocument();
	});

	it('uses "teachings" label when topic contains only recordings', async () => {
		await render({
			props: {
				topic: {
					title: 'the_title',
					items: {
						nodes: [recording],
						aggregate: {
							count: 1,
						},
					},
				},
			},
		});

		expect(screen.getByText(/teaching/)).toBeInTheDocument();
	});

	it('uses "series" label when topic contains only series', async () => {
		await render({
			props: {
				topic: {
					title: 'the_title',
					items: {
						nodes: [sequence],
						aggregate: {
							count: 1,
						},
					},
				},
			},
		});

		expect(screen.getByText(/series/)).toBeInTheDocument();
	});

	it('includes number of series', async () => {
		await render({
			props: {
				topic: {
					title: 'the_title',
					items: {
						nodes: [sequence],
						aggregate: {
							count: 1,
						},
					},
				},
			},
		});

		expect(screen.getByText('1 series')).toBeInTheDocument();
	});
});
