import React, { forwardRef } from 'react';
import * as swiper from 'swiper';

import { HTMLSwiperElement, SwiperProps } from '~lib/swiper';

declare module '~lib/swiper' {
	export const __swiper: swiper.Swiper;
}

// https://swiperjs.com/swiper-api#methods-and-properties
export const __swiper: Partial<swiper.Swiper> = {
	activeIndex: 0,
	slideNext: jest.fn(),
	slidePrev: jest.fn(),
};

export const register = jest.fn();

const Swiper = forwardRef<HTMLSwiperElement, SwiperProps>(function Swiper(
	props: SwiperProps,
	ref
) {
	return (
		<swiper-container
			observer={true}
			{...props}
			ref={(el) => {
				if (el) (el as HTMLSwiperElement).swiper = __swiper as swiper.Swiper;
				const r = props.forwardedRef ?? ref;
				if (r) (r as any).current = el;
			}}
		/>
	);
});

export default Swiper;
