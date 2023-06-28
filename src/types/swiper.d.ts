import type { SwiperProps, SwiperSlideProps } from 'swiper/react';

declare global {
	namespace JSX {
		// WORKAROUND: https://github.com/nolimits4web/swiper/issues/6466
		interface IntrinsicElements {
			'swiper-container': React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & SwiperProps,
				HTMLElement
			>;
			'swiper-slide': React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
				HTMLElement
			>;
		}
	}
}
