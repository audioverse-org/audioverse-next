import uniqBy from 'lodash/uniqBy';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CopyrightInfo from '@components/molecules/copyrightInfo';
import { CopyrightInfosFragment } from '@components/molecules/copyrightInfos.gql';

export default function CopyrightInfos({
	recordings,
}: {
	recordings: CopyrightInfosFragment[];
}): JSX.Element {
	const uniques = uniqBy(
		recordings,
		({ copyrightYear, distributionAgreement, sponsor }) =>
			`${copyrightYear}-${distributionAgreement?.id}-${sponsor?.id}`
	);

	return (
		<>
			{uniques.length > 1 && (
				<p>
					<FormattedMessage
						id="copyrightInfos__multipleCopyrightExplanation"
						defaultMessage="Portions of this production are covered under the following license terms:"
						description="Copyright infos component multiple copyright explanation"
					/>
				</p>
			)}
			{uniques.map((r) => (
				<CopyrightInfo key={r.id} recording={r} />
			))}
		</>
	);
}
