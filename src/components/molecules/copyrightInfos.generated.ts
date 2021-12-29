import * as Types from '../../lib/generated/graphql';

import { CopyrightInfoFragmentDoc } from './copyrightInfo.generated';
export type CopyrightInfosFragment = {
	__typename?: 'Recording';
	id: string | number;
	copyrightYear: number | null | undefined;
	distributionAgreement:
		| {
				__typename?: 'DistributionAgreement';
				id: string | number;
				sponsor: { __typename?: 'Sponsor'; title: string } | null | undefined;
				license:
					| {
							__typename?: 'License';
							summary: string;
							image: { __typename?: 'Image'; url: string } | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
	sponsor:
		| { __typename?: 'Sponsor'; id: string | number; title: string }
		| null
		| undefined;
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
    ${CopyrightInfoFragmentDoc}`;
