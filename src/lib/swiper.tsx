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
		if (!ref.current) {
			console.error('No element');
			return;
		}

		Object.assign(ref.current, props);

		if (!ref.current.initialize) {
			console.error('No initialize');
			return;
		}

		if (!ref.current.swiper) {
			ref.current.initialize();
		}
	}, [ref, props]);

	useEffect(() => {
		ref.current?.swiper?.update();
	}, [ref, children]);

	return (
		<swiper-container ref={ref} init={false}>
			{children}
		</swiper-container>
	);
});

export default Swiper;
