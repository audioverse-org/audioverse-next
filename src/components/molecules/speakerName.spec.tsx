import SpeakerName from '@components/molecules/speakerName';
import { renderWithIntl } from '@lib/test/helpers';

describe('speaker name component', () => {
	it('renders', async () => {
		await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});
	});

	it('renders speaker name', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		expect(getByText('the_name')).toBeInTheDocument();
	});

	it('renders speaker summary', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
				summary: 'the_summary',
			},
		});

		expect(getByText('the_summary')).toBeInTheDocument();
	});

	it('renders speaker image', async () => {
		const { getByAltText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
				imageWithFallback: {
					url: 'the_url',
				},
			},
		});

		const image = getByAltText('the_name') as HTMLImageElement;

		expect(image.src).toContain('the_url');
	});
});
