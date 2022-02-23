import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import Slider from '@components/organisms/slider';
import { TestimoniesFragment } from '@lib/generated/graphql';
import { makeTestimoniesRoute, makeTestimonySubmitRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './testimonies.module.scss';

interface TestimoniesProps {
	testimonies: TestimoniesFragment[];
}

const Testimonies = ({ testimonies }: TestimoniesProps): JSX.Element => {
	const languageRoute = useLanguageRoute();

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
			<div className={styles.ctas}>
				<Button
					type="super"
					text={
						<FormattedMessage
							id="testimonies__seeAll"
							defaultMessage="See all Testimonials"
						/>
					}
					href={makeTestimoniesRoute(languageRoute)}
				/>
				<Button
					type="secondary"
					text={
						<FormattedMessage
							id="testimonies__submitTestimonial"
							defaultMessage="Submit a Testimonial"
						/>
					}
					href={makeTestimonySubmitRoute(languageRoute)}
				/>
			</div>
		</Slider>
	);
};

export default Testimonies;
