type ExactAlt<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

// WORKAROUND: https://github.com/sindresorhus/type-fest/issues/117
type Must<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

// Source: https://gist.github.com/alexrqs/a6db03bade4dc405a61c63294a64f97a?permalink_comment_id=4312389#gistcomment-4312389
type VideoJsEvent =
	// HTMLMediaElement events
	| 'abort'
	| 'canplay'
	| 'canplaythrough'
	| 'durationchange'
	| 'emptied'
	| 'ended'
	| 'error'
	| 'loadeddata'
	| 'loadedmetadata'
	| 'loadstart'
	| 'pause'
	| 'play'
	| 'playing'
	| 'progress'
	| 'ratechange'
	| 'seeked'
	| 'seeking'
	| 'stalled'
	| 'suspend'
	| 'timeupdate'
	| 'volumechange'
	| 'waiting'
	// HTMLVideoElement events
	| 'enterpictureinpicture'
	| 'leavepictureinpicture'
	// Element events
	| 'fullscreenchange'
	| 'resize'
	// Video.js events
	| 'audioonlymodechange'
	| 'audiopostermodechange'
	| 'controlsdisabled'
	| 'controlsenabled'
	| 'debugon'
	| 'debugoff'
	| 'disablepictureinpicturechanged'
	| 'dispose'
	| 'enterFullWindow'
	| 'error'
	| 'exitFullWindow'
	| 'firstplay'
	| 'fullscreenerror'
	| 'languagechange'
	| 'loadedmetadata'
	| 'loadstart'
	| 'playerreset'
	| 'playerresize'
	| 'posterchange'
	| 'ready'
	| 'textdata'
	| 'useractive'
	| 'userinactive'
	| 'usingcustomcontrols'
	| 'usingnativecontrols';
