import React, { PropsWithChildren, useEffect, useRef } from 'react';
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

const Swiper = React.memo(function Swiper(
	{children, ...props}: SwiperProps
) {
	const ref = useRef<HTMLSwiperElement>(null);
	console.log('swiper render')
	
	// useEffect(() => {
	// 	// console.log('props change');
	// 	// console.dir(props,{
	// 	// 	depth: null,
	// 	// })
	// }, [props])

	// useEffect(() => {
	// 	// console.log('children change');
	// }, [children])

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
			console.log('initializing')
			ref.current.initialize();
		}
	}, [ref, props])

	useEffect(() => {
		ref.current?.swiper?.update();
	}, [ref, children])

	return <swiper-container ref={ref} init={false}>{children}</swiper-container>;
});

export default Swiper;
