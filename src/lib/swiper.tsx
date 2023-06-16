import React, { PropsWithChildren, useEffect, useRef } from 'react';
import type { Swiper as _Swiper } from 'swiper';
import type { SwiperProps as _SwiperProps } from 'swiper/react';

export function register() {
	import('swiper/element/bundle').then(({ register }) => {
		register();
	});
}

export type HTMLSwiperElement = HTMLDivElement & {
	swiper?: _Swiper;
	initialize: () => void;
};

export type SwiperProps = PropsWithChildren<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement> & _SwiperProps,
		HTMLElement
	>
> & {
	onInit?: (swiper: _Swiper) => void;
};

const Swiper = React.memo(function Swiper({ children, ...props }: SwiperProps) {
	const ref = useRef<HTMLSwiperElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		Object.assign(ref.current, props);

		if (ref.current.swiper) {
			ref.current.swiper.update();
		} else {
			ref.current.initialize();
		}
	}, [ref, children, props]);

	return (
		<swiper-container ref={ref} init={false}>
			{children}
		</swiper-container>
	);
});

export default Swiper;
