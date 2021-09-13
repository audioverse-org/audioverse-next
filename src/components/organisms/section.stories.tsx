import Image from 'next/image';
import React from 'react';

import Button from '@components/molecules/button';
import Section from '@components/organisms/section';
import { BaseColors } from '@lib/constants';

// TODO: use this in Storybook or nix it
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
				<Button type="super" text="Join AudioVerse" href="#" />
			</>
		}
		media={
			<Image src={'/img/unsplash-headphones.jpg'} width={4724} height={3072} />
		}
		theme={BaseColors.DARK}
	/>
);
