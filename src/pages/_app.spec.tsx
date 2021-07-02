import { waitFor } from '@testing-library/dom';
import { act, getByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Player from '@components/molecules/player';
import AndMiniplayer from '@components/templates/andMiniplayer';
import { PlayerFragment } from '@lib/generated/graphql';
import { loadRouter } from '@lib/test/helpers';
import MyApp from '@pages/_app';

jest.mock('react-topbar-progress-indicator');

const renderApp = (component: any, props: any) => {
	return render(<MyApp Component={component} pageProps={props} />);
};

describe('app', () => {
	beforeEach(() => {
		loadRouter({});
	});

	it('sets title', async () => {
		const { getByTestId } = await render(
			<MyApp
				Component={((() => null) as unknown) as typeof React.Component}
				pageProps={{}}
			/>
		);

		const head = getByTestId('head');

		expect(head.innerHTML).toContain('AudioVerse');
	});

	it('rehydrates react-query', async () => {
		await act(async () => {
			const queryClient = new QueryClient();

			await queryClient.prefetchQuery('myQuery', async () => 'myResult');

			const spy = jest.fn();

			const { getByText } = await renderApp(
				() => {
					const { data: myQuery } = useQuery('myQuery', spy);
					return <>{myQuery}</>;
				},
				{
					dehydratedState: dehydrate(queryClient),
				}
			);

			expect(getByText('myResult')).toBeInTheDocument();
		});
	});

	it('includes sidebar', async () => {
		const { getByText } = await renderApp(() => <>h</>, {});

		expect(getByText('Discover')).toBeInTheDocument();
	});

	it('disables sidebar', async () => {
		const { queryByText } = await renderApp(() => <>h</>, {
			disableSidebar: true,
		});

		expect(queryByText('Discover')).not.toBeInTheDocument();
	});

	it('sets title with props', async () => {
		const { getByTestId } = await renderApp(() => <>h</>, {
			title: 'the_prop_title',
		});

		const head = getByTestId('head');

		expect(head.innerHTML).toContain('the_prop_title | AudioVerse');
	});

	it('moves video to and from miniplayer', async () => {
		const recording: Partial<PlayerFragment> = {
			id: 'the_sermon_id',
			title: 'the_sermon_title',
			sequence: {
				title: 'the_sequence_title',
			},
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		};

		const Page = ({ includePlayer }: { includePlayer: boolean }) => (
			<AndMiniplayer>
				{includePlayer && <Player recording={recording as PlayerFragment} />}
			</AndMiniplayer>
		);

		const resultOne = await render(
			<MyApp
				Component={Page as any}
				pageProps={{ includePlayer: true } as any}
			/>
		);

		userEvent.click(resultOne.getByAltText('the_sermon_title'));

		const player = resultOne.getByLabelText('player');

		await waitFor(() => {
			expect(getByTestId(player, 'video-element')).toBeInTheDocument();
		});

		const resultTwo = await render(
			<MyApp
				Component={Page as any}
				pageProps={{ includePlayer: false } as any}
			/>,
			{ container: resultOne.container }
		);

		const miniplayer = resultTwo.getByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByTestId(miniplayer, 'video-element')).toBeInTheDocument();
		});

		const resultThree = await render(
			<MyApp
				Component={Page as any}
				pageProps={{ includePlayer: true } as any}
			/>,
			{ container: resultTwo.container }
		);

		const playerThree = resultThree.getByLabelText('player');

		await waitFor(() => {
			expect(getByTestId(playerThree, 'video-element')).toBeInTheDocument();
		});
	});
});
