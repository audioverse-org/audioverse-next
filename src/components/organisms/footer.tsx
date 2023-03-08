import Heading3 from '@components/atoms/heading3';
import { FormattedMessage } from 'react-intl';
import Image from 'next/legacy/image';
import { useEffect, useRef } from 'react';
import isServerSide from '@lib/isServerSide';
import React from 'react';
import styles from './footer.module.scss';

export default function Footer({
	scrollRef,
}: {
	scrollRef: React.RefObject<HTMLDivElement>;
}): JSX.Element {
	const footerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const currentFooterRef = footerRef.current;
		const currentScrollRef = scrollRef.current;

		if (!currentFooterRef || !currentScrollRef || isServerSide()) {
			return;
		}

		const onScroll = () => {
			const scrollHeight = currentScrollRef.scrollHeight;
			const scrollTop = currentScrollRef.scrollTop;
			const opacity =
				1 - Math.min((scrollHeight - scrollTop - window.innerHeight) / 60, 1);
			currentFooterRef.style.opacity = opacity.toString();
		};

		currentScrollRef.addEventListener('scroll', onScroll);
		() => currentScrollRef.removeEventListener('scroll', onScroll);
	}, [scrollRef]);

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