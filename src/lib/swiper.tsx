import { useRouter } from 'next/router';
import { memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import type { Swiper as _Swiper } from 'swiper';
import type { SwiperProps as _SwiperProps } from 'swiper/react';

export function register() {
	import('swiper/element/bundle').then(({ register }) => {
		register();
	});
}

export type HTMLSwiperElement = HTMLDivElement & {
	swiper?: _Swiper;
	initialize?: () => void;
};

export type SwiperProps = PropsWithChildren<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement> & _SwiperProps,
		HTMLElement
	>
> & {
	onInit?: (swiper: _Swiper) => void;
};

function updateSwiper(el: HTMLSwiperElement): boolean {
	if (el.swiper) {
		el.swiper.update();
		return true;
	} else if (el.initialize) {
		el.initialize();
		return true;
	} else {
		console.warn('Swiper is not initialized');
		return false;
	}
}

const Swiper = memo(function Swiper(props: SwiperProps) {
	const ref = useRef<HTMLSwiperElement>(null);
	const [retry, setRetry] = useState(0);
	const router = useRouter();

	useEffect(() => {
		if (!ref.current) return;
		const { children: _, ...rest } = props;
		Object.assign(ref.current, rest);
		setRetry(1);
	}, [ref, props]);

	useEffect(() => {
		const fn = () => setRetry(1);
		router.events.on('routeChangeComplete', fn);
		return () => router.events.off('routeChangeComplete', fn);
	}, [router]);

	useEffect(() => {
		if (!ref.current) return;
		if (retry === 0) return;

		const timeout = setTimeout(() => {
			const success = ref.current && updateSwiper(ref.current);
			setRetry(success ? 0 : retry * 2);
		}, retry * 100);

		return () => clearTimeout(timeout);
	}, [ref, retry]);

	return (
		<swiper-container ref={ref} init={false}>
			{props.children}
		</swiper-container>
	);
});

export default Swiper;
