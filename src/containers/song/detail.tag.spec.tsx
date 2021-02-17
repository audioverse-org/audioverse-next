import { buildRenderer } from '@lib/test/helpers';
import SongDetail, { getStaticProps } from '@pages/[language]/songs/tag/[tag]';

const renderPage = buildRenderer(SongDetail, getStaticProps, {
	language: 'en',
	tag: 'the_tag_name',
});

describe('song tag detail page', () => {
	it('renders', async () => {
		await renderPage();
	});
});
