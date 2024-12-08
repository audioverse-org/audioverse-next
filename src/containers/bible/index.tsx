import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import IconSearch from '~public/img/icons/icon-search.svg';
import withFailStates from '~src/components/HOCs/withFailStates';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import IconButton from '~src/components/molecules/iconButton';
import Tease from '~src/components/molecules/tease';
import PassageNavigation, {
	Version,
} from '~src/components/organisms/passageNavigation';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';
import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import { GetAudiobibleIndexDataQuery } from './__generated__';
import styles from './index.module.scss';

export type BibleIndexProps = {
	data: Array<Version>;
};

function Bible({ data }: BibleIndexProps): JSX.Element {
	return (
		<Tease>
			<PassageNavigation versions={data} />
		</Tease>
	);
}

export default withFailStates(Bible, {
	useShould404: ({ data }) => !data.length,
});
