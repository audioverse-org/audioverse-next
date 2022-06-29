import Testimonies from '@components/organisms/testimonies';
import { buildRenderer } from '@lib/test/buildRenderer';
import { screen } from '@testing-library/react';

const renderComponent = buildRenderer(Testimonies, {
	defaultProps: {
		testimonies: [
			{
				id: 'the_id',
				body: 'the_body',
				author: 'the_author',
			},
		],
	},
});

describe('testimonies', () => {
	it('renders testimonies', async () => {
		await renderComponent();

		expect(screen.getByText('the_body')).toBeInTheDocument();
	});

	it('renders authors', async () => {
		await renderComponent();

		expect(screen.getByText('the_author')).toBeInTheDocument();
	});

	it('renders in slider', async () => {
		await renderComponent();

		expect(screen.getByLabelText('Next page')).toBeInTheDocument();
	});
});
