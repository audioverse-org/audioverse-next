import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import RoundImage from '~components/atoms/roundImage';

import HatIcon from '../../../../../public/img/icons/fa-list-alt.svg';
import { CardRecordingFragment } from '../__generated__/recording';
import CardRecordingSequenceHat from '../recordingSequenceHat';
import CardHat from '.';
import styles from './sermon.module.scss';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatSermon({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			label={
				<FormattedMessage
					id="cardSermon_sequenceLabel"
					defaultMessage="Series"
				/>
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
		>
			<CardRecordingSequenceHat sequence={sequence}>
				<Heading2 className={styles.title}>
					{sequence.image && (
						<div className={styles.image}>
							<RoundImage image={sequence.image.url} alt={sequence.title} />
						</div>
					)}
					{sequence.title}
				</Heading2>
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
