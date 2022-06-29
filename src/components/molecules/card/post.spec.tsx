import CardPost from '@components/molecules/card/post';
import { buildRenderer } from '@lib/test/buildRenderer';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __nextLink } from 'next/link';

const renderComponent = buildRenderer(CardPost);

describe('card post', () => {
	it('does not display zero rounded duration', async () => {
		await renderComponent({
			props: {
				post: {
					readingDuration: 10,
					canonicalPath: 'the_path',
				},
			},
		});

		expect(screen.getByText('1m read')).toBeInTheDocument();
	});

	it('links hero', async () => {
		await renderComponent({
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

		const hero = screen.getByAltText('the_title');

		userEvent.click(hero);

		expect(__nextLink).toHaveBeenCalledWith(
			expect.objectContaining({
				props: expect.objectContaining({
					href: 'the_path',
				}),
			})
		);
	});
});
