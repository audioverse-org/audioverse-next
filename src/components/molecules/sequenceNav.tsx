import styles from './sequenceNav.module.scss';
import Link from 'next/link';
import { makeSermonRoute } from '@lib/routes';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import React from 'react';
import useLanguageRoute from '@lib/useLanguageRoute';
import ArrowLeft from '../../../public/img/icon-arrow-left.svg';
import ArrowRight from '../../../public/img/icon-arrow-right.svg';
import { SequenceNavFragment } from '@lib/generated/graphql';

function getSiblingByIndexOffset(
	recording: SequenceNavFragment,
	offset: number
) {
	const nodes = recording.sequence?.recordings?.nodes;

	if (!nodes || recording.sequenceIndex === null) return;

	const zeroBasedIndex = recording.sequenceIndex - 1;
	const targetIndex = zeroBasedIndex + offset;

	return nodes[targetIndex];
}

export default function SequenceNav({
	recording,
}: {
	recording: SequenceNavFragment;
}): JSX.Element {
	const langRoute = useLanguageRoute();
	const intl = useIntl();
	const previousRecording = getSiblingByIndexOffset(recording, -1);
	const nextRecording = getSiblingByIndexOffset(recording, 1);

	const labelPrevious = intl.formatMessage({
		id: 'organism-recording__buttonLabelPrevious',
		defaultMessage: 'Previous',
		description: 'recording previous button label',
	});

	const labelNext = intl.formatMessage({
		id: 'organism-recording__buttonLabelNext',
		defaultMessage: 'Next',
		description: 'recording next button label',
	});

	return (
		<div className={styles.sequenceNav}>
			{previousRecording && (
				<Link href={makeSermonRoute(langRoute, previousRecording.id)} passHref>
					<Button
						aria-label={labelPrevious}
						className={styles.previous}
						variant={'outlined'}
						startIcon={<ArrowLeft />}
					>
						{labelPrevious}
					</Button>
				</Link>
			)}
			{nextRecording && (
				<Link href={makeSermonRoute(langRoute, nextRecording.id)} passHref>
					<Button
						aria-label={labelNext}
						className={styles.next}
						variant={'outlined'}
						endIcon={<ArrowRight />}
					>
						{labelNext}
					</Button>
				</Link>
			)}
		</div>
	);
}
