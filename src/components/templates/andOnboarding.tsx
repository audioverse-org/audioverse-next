import React, { ReactNode } from 'react';

import Heading1 from '@components/atoms/heading1';
import Slider from '@components/organisms/slider';
import { getAppFeatures } from '@lib/getAppFeatures';
import useLanguageRoute from '@lib/useLanguageRoute';

import LogoLarge from '../../../public/img/logo-large.svg';

import styles from './andOnboarding.module.scss';

export default function AndOnboarding({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const languageRoute = useLanguageRoute();
	const features = getAppFeatures(languageRoute);

	return (
		// TODO: replace Lipsum
		<div className={styles.page}>
			<div className={styles.form}>
				<div className={styles.logo}>
					<LogoLarge />
				</div>
				<div className={styles.intro}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
					imperdiet purus, sed sagittis dui.
				</div>
				{children}
			</div>
			<div className={styles.promos}>
				<Slider dark grow floatingControls>
					{features.map(({ heading, kicker, backgroundColor, image }) => (
						<div className={styles.slide} key={image}>
							<div
								className={styles.cards}
								style={{ backgroundImage: `url(${image})`, backgroundColor }}
							/>
							<div className={styles.description}>
								<Heading1 className={styles.heading}>{heading}</Heading1>
								<p className={styles.kicker}>{kicker}</p>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}
