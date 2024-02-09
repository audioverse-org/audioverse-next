import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading3 from '~components/atoms/heading3';
import isServerSide from '~lib/isServerSide';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import styles from './footer.module.scss';

export default function Footer({
	scrollRef,
}: {
	scrollRef: React.RefObject<HTMLDivElement>;
}): JSX.Element {
	const footerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const intl = useIntl();
	const languageRoute = useLanguageRoute();

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
			<div className={styles.linksFooter}>
				<Link href={root.lang(languageRoute).about.id(4).get()} legacyBehavior>
					<a className={styles.footerLinks}>
						{intl.formatMessage({
							id: 'privacy_footer',
							defaultMessage: 'Privacy Policy',
						})}
					</a>
				</Link>

				<Link href={root.lang(languageRoute).about.id(5).get()} legacyBehavior>
					<a className={styles.footerLinks}>
						{intl.formatMessage({
							id: 'terms_footer',
							defaultMessage: 'Terms of Use',
						})}
					</a>
				</Link>

				<Link href={root.lang(languageRoute).about.id(3).get()} legacyBehavior>
					<a className={styles.footerLinks}>
						{intl.formatMessage({
							id: 'legal_footer',
							defaultMessage: 'Legal',
						})}
					</a>
				</Link>

				<Link href={root.lang(languageRoute).contact.get()} legacyBehavior>
					<a className={styles.footerLinks}>
						{intl.formatMessage({
							id: 'contact_footer',
							defaultMessage: 'Contact',
						})}
					</a>
				</Link>
			</div>
		</div>
	);
}
