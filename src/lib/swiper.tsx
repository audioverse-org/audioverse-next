import React, { ForwardedRef, forwardRef, PropsWithChildren, useEffect, useState } from 'react';
import * as swiper from 'swiper';
import { SwiperProps as _SwiperProps } from 'swiper/react';

export function register() {
	import('swiper/element/bundle').then(({ register }) => {
		register();
	});
}

export type HTMLSwiperElement = HTMLDivElement & {
	swiper?: swiper.Swiper;
	initialize: () => void;
};

export type SwiperProps = PropsWithChildren<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement> & _SwiperProps,
		HTMLElement
	>
> & {
	onInit?: (swiper: swiper.Swiper) => void;
};

const Swiper = function Swiper(
	{children, ...props}: SwiperProps
) {
	return <swiper-container ref={(el: HTMLSwiperElement) => {
		if (!el) return;
		Object.assign(el, props);
		el.initialize();
	}} init={false}>{children}</swiper-container>;
};

export default Swiper;

type HTMLSwiperInitEvent = CustomEvent<[swiper.Swiper]>;

function isSwiperInitEvent(
	event: Event
): event is HTMLSwiperInitEvent {
	return event.type === 'init';
}

export function useSwiper(el: HTMLSwiperElement | null) {
	const [swiper, setSwiper] = useState<swiper.Swiper | null>(null);

	useEffect(() => {
		if (!el) return;

		const swiper = el.swiper;
		if (swiper) {
			setSwiper(swiper);
			return;
		}

		const handler = (event: Event) => {
			if (isSwiperInitEvent(event)) {
				setSwiper(event.detail[0]);
			}
		};

		el.addEventListener('init', handler);

		return () => {
			el.removeEventListener('init', handler);
		};
	}, [el]);

	return swiper;
}