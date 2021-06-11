import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LanguageSwitcher from '@components/molecules/languageSwitcher';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(LanguageSwitcher, {
	defaultParams: {
		language: 'en',
	},
});

describe('language switcher', () => {
	it('renders', async () => {
		await renderComponent();
	});

	it('displays language name', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('English')).toBeInTheDocument();
	});

	it('displays different language name', async () => {
		const { getByText } = await renderComponent({
			language: 'es',
		});

		expect(getByText('Español')).toBeInTheDocument();
	});

	it('displays language list when clicked', async () => {
		const { getByText } = await renderComponent();

		userEvent.click(getByText('English'));

		expect(getByText('Español')).toBeInTheDocument();
	});

	it('closes list when user clicks outside', async () => {
		const { getByText, queryByText, baseElement } = await renderComponent();

		userEvent.click(getByText('English'));

		const hiddenElements = baseElement.querySelectorAll('[aria-hidden="true"]');

		if (!hiddenElements) throw new Error('unable to find click trap');

		hiddenElements.forEach((el) => userEvent.click(el));

		await waitFor(() => {
			expect(queryByText('Español')).not.toBeInTheDocument();
		});
	});

	it('links languages', async () => {
		const { getByText } = await renderComponent();

		userEvent.click(getByText('English'));

		expect(getByText('Español')).toHaveAttribute('href', '/es');
	});
});
