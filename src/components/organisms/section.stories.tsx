import React from 'react';

import Section from '@components/organisms/section';
import styles from '@containers/home.module.scss';

export const DarkBleed = (): JSX.Element => (
	<Section
		text={
			<>
				<h2>Sound Doctrine</h2>
				<p>
					AudioVerse is a platform curating the best in Adventist audio content.
					Be challenged and inspired to grow in your relationship with Jesus
					through songs, sermons, audiobooks, and Bible readings.
				</p>
				<a href="#" className={styles.button}>
					Join AudioVerse
				</a>
			</>
		}
		media={
			<img src={'/img/unsplash-headphones.jpg'} width={4724} height={3072} />
		}
		theme={'dark'}
	/>
);
