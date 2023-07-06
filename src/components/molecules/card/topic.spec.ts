import { screen } from '@testing-library/react';
import { PartialDeep } from 'type-fest';

import { TopicItem } from '~src/__generated__/graphql';
import { buildRenderer } from '~src/lib/test/buildRenderer';

import CardTopic from './topic';

const recording: PartialDeep<TopicItem> = {
	entity: {
		__typename: 'Recording',
	},
};

const sequence: PartialDeep<TopicItem> = {
	entity: {
		__typename: 'Sequence',
	},
};

const r = buildRenderer(CardTopic);

const renderWithItems = (nodes: any[] = []) => {
	return r({
		props: {
			topic: {
				title: 'the_title',
				canonicalPath: 'the_path',
				items: {
					nodes,
					aggregate: {
						count: nodes.length,
					},
				},
			},
		},
	});
};

describe('topic card', () => {
	it('uses "items" label when count is 0', async () => {
		await renderWithItems();

		expect(screen.getByText(/items/)).toBeInTheDocument();
	});

	it('uses "items" label when topic contains both recordings and series', async () => {
		await renderWithItems([recording, sequence]);

		expect(screen.getByText(/items/)).toBeInTheDocument();
	});

	it('uses "teachings" label when topic contains only recordings', async () => {
		await renderWithItems([recording]);

		expect(screen.getByText(/teaching/)).toBeInTheDocument();
	});

	it('includes number of series', async () => {
		await renderWithItems([sequence]);

		expect(screen.getByText('1 series')).toBeInTheDocument();
	});
});
