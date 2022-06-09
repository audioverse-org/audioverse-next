// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type CopyrightInfoFragment = {
	__typename?: 'Recording';
	copyrightYear?: number | null;
	contentType: Types.RecordingContentType;
	distributionAgreement?: {
		__typename?: 'DistributionAgreement';
		sponsor?: { __typename?: 'Sponsor'; title: string } | null;
		license?: {
			__typename?: 'License';
			summary: string;
			image?: { __typename?: 'Image'; url: any } | null;
		} | null;
	} | null;
	collection?: { __typename?: 'Collection'; title: string } | null;
	sponsor?: { __typename?: 'Sponsor'; title: string } | null;
};

export const CopyrightInfoFragmentDoc = `
    fragment copyrightInfo on Recording {
  copyrightYear
  contentType
  distributionAgreement {
    sponsor {
      title
    }
    license {
      summary
      image {
        url(size: 100, cropMode: MAX_SIZE)
      }
    }
  }
  collection {
    title
  }
  sponsor {
    title
  }
}
    `;
