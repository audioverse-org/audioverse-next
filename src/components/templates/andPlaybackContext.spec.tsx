import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';

import ButtonPlay from '~components/molecules/buttonPlay';
import { Recording } from '~components/organisms/recording';
import { SequenceContentType } from '~src/__generated__/graphql';
import { analytics } from '~src/lib/analytics';
import { BaseColors } from '~src/lib/constants';
import { buildRenderer } from '~src/lib/test/buildRenderer';

import { RecordingFragment } from '../organisms/__generated__/recording';
import AndMiniplayer from './andMiniplayer';
import AndPlaybackContext, { PlaybackContext } from './andPlaybackContext';

jest.mock('../../lib/analytics');

const recordingFixture: RecordingFragment = {
	id: 1,
	title: 'the_title',
	canonicalPath: '/the_path',
	duration: 100,
	sequence: {
		id: 1,
		title: 'the_title',
		contentType: SequenceContentType.Series,
		canonicalPath: '/the_path',
		recordings: { aggregate: { count: 0 }, nodes: [] },
	},
	collection: {
		title: 'the_title',
		canonicalPath: '/the_path',
	},
	audioFiles: [],
	videoFiles: [
		{
			url: 'the_url',
			filesize: '100',
			mimeType: 'video/mp4',
			duration: 100,
		},
	],
	videoStreams: [],
	isDownloadAllowed: false,
	shareUrl: '',
	videoDownloads: [],
	audioDownloads: [],
	speakers: [],
	contentType: 'AUDIOBOOK_TRACK',
	description: null,
	recordingDate: null,
	sequenceIndex: null,
	canonicalUrl: '',
	copyrightYear: null,
	writers: [],
	attachments: [],
	imageWithFallback: {
		__typename: undefined,
		url: '',
	},
	recordingTags: {
		__typename: undefined,
		nodes: null,
	},
	sponsor: null,
	transcript: null,
	sequencePreviousRecording: null,
	sequenceNextRecording: null,
	distributionAgreement: null,
};

function TestComponent() {
	const context = useContext(PlaybackContext);

	return (
		<AndMiniplayer>
			<p>content</p>
			<Recording recording={recordingFixture} />
			<ButtonPlay
				recording={recordingFixture}
				backgroundColor={BaseColors.WHITE}
			/>
			<button
				onClick={() => {
					context.unsetVideoHandler(1);
				}}
			>
				send to miniplayer
			</button>
		</AndMiniplayer>
	);
}

function BasePage() {
	return (
		<AndPlaybackContext>
			<TestComponent />
		</AndPlaybackContext>
	);
}
const renderComponent = buildRenderer(BasePage);

describe('AndPlaybackContext', () => {
	it('moves player from detail to miniplayer', async () => {
		jest.unmock('video.js');
		jest.unmock('@silvermine/videojs-airplay');
		jest.unmock('@silvermine/videojs-chromecast');

		renderComponent();

		await screen.findByText('content');

		const playButtons = await screen.findAllByLabelText('play');

		await userEvent.click(playButtons[0]);

		const detailPortal = await screen.findByTestId('portal');

		await waitFor(() => {
			expect(analytics.track).toBeCalled();
		});

		await within(detailPortal).findAllByTestId('video-element');

		await screen.findAllByLabelText('pause');

		const sendToMiniplayerButton = await screen.findByText(
			'send to miniplayer'
		);

		await userEvent.click(sendToMiniplayerButton);

		const miniplayer = await screen.findByLabelText('miniplayer');

		await within(miniplayer).findAllByTestId('video-element');

		await screen.findAllByLabelText('pause');
	});
});
