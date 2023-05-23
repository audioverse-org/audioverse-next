import React, { forwardRef, PropsWithChildren } from 'react';
import * as swiper from 'swiper';
import { SwiperProps as _SwiperProps } from 'swiper/react';

export function register() {
	import('swiper/element/bundle').then(({ register }) => {
		register();
	});
}

export type HTMLSwiperElement = HTMLDivElement & {
	swiper?: swiper.Swiper;
};

export type SwiperProps = PropsWithChildren<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement> & _SwiperProps,
		HTMLElement
	>
>;

const Swiper = forwardRef<HTMLSwiperElement, SwiperProps>(function Swiper(
	props: SwiperProps,
	ref
) {
	return <swiper-container {...props} ref={ref} />;
});

export default Swiper;
