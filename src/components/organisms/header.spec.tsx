import Header from '@components/organisms/header';
import { loadRouter, renderWithIntl } from '@lib/test/helpers';

jest.mock('@lib/api/fetchApi');

const renderHeader = async () => {
	return renderWithIntl(Header, {});
};

describe('header', () => {
	it('has title', async () => {
		const { getByAltText } = await renderHeader();

		expect(getByAltText('AudioVerse')).toBeInTheDocument();
	});

	it('has search box', async () => {
		const { getByPlaceholderText } = await renderHeader();

		expect(getByPlaceholderText('Search')).toBeInTheDocument();
	});

	it('has donate button', async () => {
		const { getByRole } = await renderHeader();

		expect(
			getByRole('link', {
				name: 'Donate Now',
			})
		).toBeInTheDocument();
	});

	it('links donate button', async () => {
		const { getByRole } = await renderHeader();

		const link = getByRole('link', {
			name: 'Donate Now',
		}) as HTMLLinkElement;

		expect(link.href).toContain('/en/give');
	});

	it('localizes donate button', async () => {
		loadRouter({ query: { language: 'ru' } });

		const { getByRole } = await renderHeader();

		const link = getByRole('link', {
			name: 'Donate Now',
		}) as HTMLLinkElement;

		expect(link.href).toContain('/ru/give');
	});

	it('has navigation', async () => {
		const links = [
			'Presentations',
			'Bibles',
			'Books',
			'Stories',
			'Scripture Songs',
			'Conferences',
			'Presenters',
			'Tags',
			'Sponsors',
			'Series',
			'Playlists',
			'Manage Account',
			'My Playlists',
			'Favorites',
			'History',
			'Logout',
		];

		const { getByRole } = await renderHeader();

		links.map((name) => {
			expect(getByRole('link', { name })).toBeInTheDocument();
		});
	});
});
