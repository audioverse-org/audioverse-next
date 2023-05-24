import React, { forwardRef } from 'react';
import * as swiper from 'swiper';
import { SwiperEvents } from 'swiper/types';
import { ValueOf } from 'type-fest';

import { HTMLSwiperElement, SwiperProps } from '~lib/swiper';

declare module '~lib/swiper' {
	export const __eventHandlers: EventHandlers;
	export const __swiper: swiper.Swiper;
	export function __runHandlers(event: keyof SwiperEvents, ...args: any): void;
}

type EventHandlers = NonNullable<
	Partial<Record<keyof SwiperEvents, ValueOf<SwiperEvents>[]>>
>;

export const __eventHandlers: EventHandlers = {};

export function __runHandlers(event: keyof SwiperEvents, ...args: any) {
	const handlers = __eventHandlers[event];
	if (handlers) handlers.forEach((h: any) => h?.(...args));
}

// https://swiperjs.com/swiper-api#methods-and-properties
function makeSwiper(): Partial<swiper.Swiper> {
	return {
		activeIndex: 0,
		slideNext: jest.fn(),
		slidePrev: jest.fn(),
		isBeginning: true,
		isEnd: true,
		on: jest.fn((event, handler) => {
			if (__eventHandlers[event] === undefined) __eventHandlers[event] = [];
			(__eventHandlers[event] as any).push(handler);
		}),
	};
}

const __swiper = makeSwiper();

beforeEach(() => {
	__swiper.activeIndex = 0;
	__swiper.isBeginning = true;
	__swiper.isEnd = true;
});

export { __swiper };

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
