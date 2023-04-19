import { useIntl } from 'react-intl';

// TODO: use more robust localization strategy
// https://github.com/formatjs/formatjs/issues/77
// https://github.com/tc39/ecma402/issues/47
// https://github.com/younies/proposal-intl-duration-format

const divideWithRunoff = (
	total: number,
	divisors: number[],
	results: number[] = []
): number[] => {
	if (!divisors.length) {
		return [...results, total];
	}

	const result = Math.floor(total / divisors[0]);
	const newTotal = total % divisors[0];

	return divideWithRunoff(newTotal, divisors.slice(1), [...results, result]);
};

export const useFormattedDuration = (seconds: number): string => {
	const intl = useIntl();
	const [hours, minutes] = divideWithRunoff(Math.round(seconds), [3600, 60]);

	if (hours && minutes) {
		return intl.formatMessage(
			{
				id: 'duration__hoursAndMinutes',
				defaultMessage: '{hours}h {minutes}m',
				description: 'duration hours and minutes',
			},
			{ hours, minutes }
		);
	}

	if (hours) {
		return intl.formatMessage(
			{
				id: 'duration__hours',
				defaultMessage: '{hours}h',
				description: 'duration hours',
			},
			{ hours }
		);
	}

	return intl.formatMessage(
		{
			id: 'duration__minutes',
			defaultMessage: '{minutes}m',
			description: 'duration minutes',
		},
		{ minutes: minutes || 1 }
	);
};

const pad = (s: string): string => (s.length < 2 ? pad(`0${s}`) : s);

export const useFormattedTime = (seconds: number): string => {
	const intl = useIntl();
	const [h, m, s] = divideWithRunoff(Math.round(seconds), [3600, 60]);

	return h
		? intl.formatMessage(
				{
					id: 'time__hoursMinutesAndSeconds',
					defaultMessage: '{h}:{m}:{s}',
					description: 'time hours, minutes and seconds',
				},
				{
					h,
					m: pad(m.toString()),
					s: pad(s.toString()),
				}
		  )
		: intl.formatMessage(
				{
					id: 'time__minutesAndSeconds',
					defaultMessage: '{m}:{s}',
					description: 'time minutes and seconds',
				},
				{ m, s: pad(s.toString()) }
		  );
};
