// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CopyrightInfoFragmentDoc } from './copyrightInfo.gql';
export type CopyrightInfosFragment = {
	__typename?: 'Recording';
	id: string;
	copyrightYear?: number | null;
	contentType: Types.RecordingContentType;
	distributionAgreement?: {
		__typename?: 'DistributionAgreement';
		id: string;
		sponsor?: { __typename?: 'Sponsor'; title: string } | null;
		license?: {
			__typename?: 'License';
			summary: string;
			image?: { __typename?: 'Image'; url: any } | null;
		} | null;
	} | null;
	sponsor?: { __typename?: 'Sponsor'; id: string; title: string } | null;
	collection?: { __typename?: 'Collection'; title: string } | null;
};

export const CopyrightInfosFragmentDoc = `
    fragment copyrightInfos on Recording {
  id
  copyrightYear
  distributionAgreement {
    id
  }
  sponsor {
    id
  }
  ...copyrightInfo
}
    `;
