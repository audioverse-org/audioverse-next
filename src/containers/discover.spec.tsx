import { storeRequest } from '@lib/api';
import { buildServerRenderer } from '@lib/test/helpers';
import Discover, { getServerSideProps } from '@pages/[language]/discover';

const renderPage = buildServerRenderer(Discover, getServerSideProps);

describe('discover page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en' },
		} as any);

		expect(storeRequest).toBeCalledWith('the_request');
	});
});
