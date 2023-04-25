import * as Types from '../../../__generated__/graphql';

export type CopyrightInfoFragment = { __typename?: 'Recording', copyrightYear: number | null, contentType: Types.RecordingContentType, distributionAgreement: { __typename?: 'DistributionAgreement', sponsor: { __typename?: 'Sponsor', title: string } | null, license: { __typename?: 'License', summary: string } | null } | null, collection: { __typename?: 'Collection', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null };

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