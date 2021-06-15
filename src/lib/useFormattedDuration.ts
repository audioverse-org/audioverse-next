import { useIntl } from 'react-intl';

// TODO: use more robust localization strategy
// https://github.com/formatjs/formatjs/issues/77
// https://github.com/tc39/ecma402/issues/47
// https://github.com/younies/proposal-intl-duration-format

const useFormattedDuration = (seconds: number): string => {
	const intl = useIntl();
	const s = Math.round(seconds);
	const h = Math.floor(s / 3600);
	const m = Math.round((s - h * 3600) / 60);

	if (h) {
		return intl.formatMessage(
			{
				id: 'duration__hoursAndMinutes',
				defaultMessage: '{h}h {m}m',
				description: 'duration hours and minutes',
			},
			{ h, m }
		);
	}

	return intl.formatMessage(
		{
			id: 'duration__minutes',
			defaultMessage: '{m}m',
			description: 'duration minutes',
		},
		{ m }
	);
};

export default useFormattedDuration;
