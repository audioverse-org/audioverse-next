import { RecordingFragment } from '~components/organisms/__generated__/recording';

export default function hasVideo(
	recording: Pick<RecordingFragment, 'videoStreams' | 'videoFiles'>
): boolean {
	const { videoStreams = [], videoFiles = [] } = recording;

	return videoStreams.length > 0 || videoFiles.length > 0;
}
