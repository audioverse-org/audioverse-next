import React from 'react';

import Slider from '~components/organisms/slider';

import { TestimoniesFragment } from './__generated__/testimonies';
import styles from './testimonies.module.scss';

interface TestimoniesProps {
	testimonies: TestimoniesFragment[];
}

const Testimonies = ({ testimonies }: TestimoniesProps): JSX.Element => {
	return (
		<Slider>
			{testimonies.map((t) => (
				<blockquote className={styles.testimony} key={t.id}>
					<p
						className={styles.body}
						dangerouslySetInnerHTML={{ __html: t.body.replace(/<[^>]+>/g, '') }}
					></p>
					<footer>
						<cite className={styles.author}>{t.author}</cite>
					</footer>
				</blockquote>
			))}
		</Slider>
	);
};

export default Testimonies;
