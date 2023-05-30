import React from 'react';
import * as swiper from 'swiper';
import { SwiperEvents } from 'swiper/types';
import { ValueOf } from 'type-fest';

import { HTMLSwiperElement, SwiperProps } from '~lib/swiper';

declare module '~lib/swiper' {
	export const __eventHandlers: EventHandlers;
	export const __swiper: swiper.Swiper;
	export function __runHandlers(event: keyof SwiperEvents, ...args: any): void;
	export function __resetSwiper(): void;
}

type EventHandlers = NonNullable<
	Partial<Record<keyof SwiperEvents, ValueOf<SwiperEvents>[]>>
>;

export const __eventHandlers: EventHandlers = {};

export function __runHandlers(event: keyof SwiperEvents, ...args: any) {
	const handlers = __eventHandlers[event];
	if (handlers) handlers.forEach((h: any) => h?.(...args));
}

function registerHandler(
	event: keyof SwiperEvents,
	handler: ValueOf<SwiperEvents>
){
	if (__eventHandlers[event] === undefined) __eventHandlers[event] = [];
	(__eventHandlers[event] as any).push(handler);
}

// https://swiperjs.com/swiper-api#methods-and-properties
function makeSwiper(): Partial<swiper.Swiper> {
	return {
		activeIndex: 0,
		slideNext: jest.fn(),
		slidePrev: jest.fn(),
		isBeginning: true,
		isEnd: true,
		on: jest.fn(registerHandler),
	};
}

const __swiper = makeSwiper();

export function __resetSwiper() {
	Object.assign(__swiper, makeSwiper());
}

export { __swiper };

export const register = jest.fn();

const Swiper = function Swiper(
	props: SwiperProps
) {
	return (
		<swiper-container
			data-testid="swiper"
			observer={true}
			{...props}
			ref={(el: HTMLSwiperElement) => {
				if (!el) return;
				Object.entries(props.on || {}).forEach(([event, handler]) => {
					registerHandler(event as keyof SwiperEvents, handler);
				})
				props.on?.init?.(__swiper as swiper.Swiper);
			}}
		/>
	);
};

export default Swiper;
