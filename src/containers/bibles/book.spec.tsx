import { mockedFetchApi, renderWithIntl } from '@lib/test/helpers';
import Book, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles/[id]/[book]';
import {
	GetBibleBookDetailPageDataDocument,
	GetBibleBookDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { when } from 'jest-when';

async function renderPage() {
	const { props } = await getStaticProps({
		params: { id: 'the_version_id', book: 'the_book_shortname' },
	});
	return renderWithIntl(Book, props);
}

function loadPageData() {
	when(mockedFetchApi)
		.calledWith(GetBibleBookDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			audiobible: {
				title: 'the_version_title',
				book: {
					title: 'the_book_title',
					chapters: [
						{
							id: 'the_chapter_id',
							title: 'the_chapter_title',
						},
					],
				},
			},
		});
}

describe('Bible book detail page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetBibleBookDetailPageDataDocument, {
			variables: {
				versionId: 'the_version_id',
				bookId: 'the_version_id-the_book_shortname',
			},
		});
	});

	it('generates paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetBibleBookDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				audiobibles: {
					nodes: [
						{
							books: [
								{
									id: 'ENGESVC-Gen',
								},
							],
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/bibles/ENGESVC/Gen');
	});

	it('displays book title', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_book_title')).toBeInTheDocument();
	});

	it('displays version title', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_version_title')).toBeInTheDocument();
	});

	it('includes chapter selector', async () => {
		loadPageData();

		const { getByLabelText } = await renderPage();

		const select = getByLabelText('Chapter') as HTMLSelectElement;
		const optionLabels = Array.from(select.options).map((opt) => opt.value);

		expect(optionLabels).toContain('the_chapter_title');
	});
});
