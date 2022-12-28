import CardPost from '@components/molecules/card/post';
import { buildRenderer } from '@lib/test/buildRenderer';

const renderComponent = buildRenderer(CardPost);

describe('card post', () => {
	it('does not display zero rounded duration', async () => {
		const { getByText } = await renderComponent({
			props: {
				post: {
					readingDuration: 10,
					canonicalPath: 'the_path',
				},
			},
		});

		expect(getByText('1m read')).toBeInTheDocument();
	});

	it('links hero', async () => {
		const { getByAltText } = await renderComponent({
			props: {
				post: {
					title: 'the_title',
					canonicalPath: 'the_path',
					image: {
						url: 'the_image_url',
					},
				},
			},
		});

		expect(
			getByAltText('the_title').parentElement?.parentElement
		).toHaveAttribute('href', 'the_path');
	});
});
