import { useIntl } from 'react-intl';
import styles from '@components/organisms/miniplayer.module.scss';
import IconVolumeLow from '@public/img/icons/icon-volume-low.svg';
import Slider from '@material-ui/core/Slider';
import IconVolumeHigh from '@public/img/icons/icon-volume-high.svg';
import React, { useContext, useEffect } from 'react';
import { PlaybackContext } from '@components/templates/andPlaybackContext';

export function Volume() {
	const intl = useIntl();
	const playbackContext = useContext(PlaybackContext);
	const [volume, setVolume] = React.useState(playbackContext.getVolume());

	useEffect(() => {
		setVolume(playbackContext.getVolume());
		const callback = () => {
			setVolume(playbackContext.getVolume());
		};
		playbackContext.on('volumechange', callback);
		return () => {
			playbackContext.off('volumechange', callback);
		};
	}, [playbackContext]);

	const publishVolume = (value: number) => {
		const v = Math.max(0, Math.min(100, value)) as Percent;
		playbackContext.setVolume(v);
	};

	return (
		<div className={styles.volume}>
			<button
				aria-label={intl.formatMessage({
					id: 'miniplayer__reduceVolume',
					defaultMessage: 'Reduce volume',
				})}
				onClick={() => publishVolume(volume - 10)}
			>
				<IconVolumeLow />
			</button>
			<Slider
				className={styles.slider}
				value={volume}
				onChange={(e, val) => publishVolume(val as number)}
				aria-label={intl.formatMessage({
					id: 'miniplayer__volume',
					defaultMessage: 'Volume',
				})}
			/>
			<button
				aria-label={intl.formatMessage({
					id: 'miniplayer__increaseVolume',
					defaultMessage: 'Increase volume',
				})}
				onClick={() => publishVolume(volume + 10)}
			>
				<IconVolumeHigh />
			</button>
		</div>
	);
}
