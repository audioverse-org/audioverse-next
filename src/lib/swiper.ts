export function register() {
	import('swiper/element/bundle').then(({ register }) => {
		register();
	});
}
