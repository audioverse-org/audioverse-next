import CardSermon from '@components/molecules/card/sermon';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(CardSermon);

describe('card sermon', () => {
	it('links card', async () => {
		const { getByText } = await renderComponent({
			props: {
				recording: {
					id: 'the_id',
					title: 'the_title',
					canonicalPath: 'the_path',
					persons: [],
				},
			},
		});

		expect(
			getByText('the_title').parentElement?.parentElement?.parentElement
		).toHaveAttribute('href', '/the_path');
	});
});
