import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading3 from '~components/atoms/heading3';
import isServerSide from '~lib/isServerSide';

import styles from './footer.module.scss';

export default function Footer({
	scrollRef,
}: {
	scrollRef: React.RefObject<HTMLDivElement>;
}): JSX.Element {
	const footerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		const currentFooterRef = footerRef.current;
		const currentScrollRef = scrollRef.current;

		if (!currentFooterRef || !currentScrollRef || isServerSide()) {
			return;
		}

		const fn = () => {
			const scrollHeight = currentScrollRef.scrollHeight;
			const scrollTop = currentScrollRef.scrollTop;
			const distanceFromBottom = scrollHeight - scrollTop - window.innerHeight;
			const maxDistance = 60;
			const opacityFactor = Math.min(distanceFromBottom / maxDistance, 1);
			const opacity = 1 - opacityFactor;

			currentFooterRef.style.opacity = opacity.toString();
		};

		const observer = new MutationObserver(fn);

		observer.observe(currentScrollRef, {
			subtree: true,
			childList: true,
			attributes: true,
			characterData: true,
		});

		currentScrollRef.addEventListener('scroll', fn);
		router.events.on('routeChangeComplete', fn);

		return () => {
			currentScrollRef.removeEventListener('scroll', fn);
			router.events.off('routeChangeComplete', fn);
			observer.disconnect();
		};
	}, [scrollRef, router]);

	return (
		<div className={styles.footerWrapper} ref={footerRef}>
			<div className={styles.footer}>
				<span className={styles.logo}>
					<Image src="/img/logo.svg" width={161} height={23} />
				</span>
				<Heading3 sans unpadded>
					<FormattedMessage
						id="homePage__tagline"
						defaultMessage="Sound Doctrine"
					/>
				</Heading3>
			</div>
		</div>
	);
}
