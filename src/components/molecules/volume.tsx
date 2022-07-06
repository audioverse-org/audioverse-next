import { useIntl } from 'react-intl';
import styles from '@components/organisms/miniplayer.module.scss';
import IconVolumeLow from '@public/img/icons/icon-volume-low.svg';
import Slider from '@material-ui/core/Slider';
import IconVolumeHigh from '@public/img/icons/icon-volume-high.svg';
import React from 'react';
import useVolume from '@lib/hooks/useVolume';

export function Volume() {
	const intl = useIntl();
	const [volume, setVolume] = useVolume();

	return (
		<div className={styles.volume}>
			<button
				aria-label={intl.formatMessage({
					id: 'miniplayer__reduceVolume',
					defaultMessage: 'Reduce volume',
				})}
				onClick={() => setVolume(volume - 10)}
			>
				<IconVolumeLow />
			</button>
			<Slider
				className={styles.slider}
				value={volume}
				onChange={(e, val) => setVolume(val as number)}
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
				onClick={() => setVolume(volume + 10)}
			>
				<IconVolumeHigh />
			</button>
		</div>
	);
}
