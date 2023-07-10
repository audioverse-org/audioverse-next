export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  RelativeDateTime: { input: string; output: string; }
  URL: { input: string; output: string; }
  Upload: { input: unknown; output: unknown; }
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int']['output'];
};

export type Attachment = Node & {
  __typename?: 'Attachment';
  /** Whether the current viewer may delete the file. */
  canDelete: Maybe<Scalars['Boolean']['output']>;
  filename: Scalars['String']['output'];
  /** In bytes */
  filesize: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  recording: Recording;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['URL']['output'];
};


export type AttachmentUrlArgs = {
  skipAnalytics: InputMaybe<Scalars['Boolean']['input']>;
};

export type AudioFile = Node & {
  __typename?: 'AudioFile';
  /** Bitrate of the audio file in kbps. */
  bitrate: Scalars['Int']['output'];
  /** Whether the current viewer may delete the file. */
  canDelete: Maybe<Scalars['Boolean']['output']>;
  /** The duration of the audio file in seconds. */
  duration: Scalars['Float']['output'];
  filename: Scalars['String']['output'];
  /** In bytes */
  filesize: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  recording: Recording;
  transcodingStatus: MediaFileTranscodingStatus;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['URL']['output'];
};


export type AudioFileUrlArgs = {
  requestType?: InputMaybe<MediaFileRequestType>;
  skipAnalytics: InputMaybe<Scalars['Boolean']['input']>;
};

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  sessionToken: Scalars['String']['output'];
  user: User;
};

export type AuthenticatedUserPayload = {
  __typename?: 'AuthenticatedUserPayload';
  authenticatedUser: Maybe<AuthenticatedUser>;
  errors: Array<InputValidationError>;
};

export type Bible = Node & {
  __typename?: 'Bible';
  abbreviation: Scalars['String']['output'];
  book: BibleBook;
  books: Array<BibleBook>;
  copyrightText: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDramatized: Scalars['Boolean']['output'];
  sponsor: BibleSponsor;
  title: Scalars['String']['output'];
};


export type BibleBookArgs = {
  id: Scalars['ID']['input'];
};

export type BibleBook = Node & {
  __typename?: 'BibleBook';
  bible: Bible;
  chapter: BibleChapter;
  chapterCount: Scalars['Int']['output'];
  chapters: Array<BibleChapter>;
  id: Scalars['ID']['output'];
  isDramatized: Scalars['Boolean']['output'];
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type BibleBookChapterArgs = {
  id: Scalars['ID']['input'];
};

export type BibleChapter = Node & {
  __typename?: 'BibleChapter';
  book: BibleBook;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['URL']['output'];
  verseCount: Scalars['Int']['output'];
  verses: Array<BibleVerse>;
};

export type BibleConnection = {
  __typename?: 'BibleConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<BibleEdge>>;
  nodes: Maybe<Array<Bible>>;
  pageInfo: PageInfo;
};

export type BibleEdge = {
  __typename?: 'BibleEdge';
  cursor: Scalars['String']['output'];
  node: Bible;
};

export type BibleReference = {
  __typename?: 'BibleReference';
  book: BibleReferenceBook;
  chapter: Maybe<Scalars['Int']['output']>;
  verse: Maybe<Scalars['Int']['output']>;
};

export const BibleReferenceBook = {
  Acts: 'ACTS',
  Amos: 'AMOS',
  Colossians: 'COLOSSIANS',
  Daniel: 'DANIEL',
  Deuteronomy: 'DEUTERONOMY',
  Ecclesiastes: 'ECCLESIASTES',
  Ephesians: 'EPHESIANS',
  Esther: 'ESTHER',
  Exodus: 'EXODUS',
  Ezekiel: 'EZEKIEL',
  Ezra: 'EZRA',
  FirstChronicles: 'FIRST_CHRONICLES',
  FirstCorinthians: 'FIRST_CORINTHIANS',
  FirstJohn: 'FIRST_JOHN',
  FirstKings: 'FIRST_KINGS',
  FirstPeter: 'FIRST_PETER',
  FirstSamuel: 'FIRST_SAMUEL',
  FirstThessalonians: 'FIRST_THESSALONIANS',
  FirstTimothy: 'FIRST_TIMOTHY',
  Galatians: 'GALATIANS',
  Genesis: 'GENESIS',
  Habakkuk: 'HABAKKUK',
  Haggai: 'HAGGAI',
  Hebrews: 'HEBREWS',
  Hosea: 'HOSEA',
  Isaiah: 'ISAIAH',
  James: 'JAMES',
  Jeremiah: 'JEREMIAH',
  Job: 'JOB',
  Joel: 'JOEL',
  John: 'JOHN',
  Jonah: 'JONAH',
  Joshua: 'JOSHUA',
  Jude: 'JUDE',
  Judges: 'JUDGES',
  Lamentations: 'LAMENTATIONS',
  Leviticus: 'LEVITICUS',
  Luke: 'LUKE',
  Malachi: 'MALACHI',
  Mark: 'MARK',
  Matthew: 'MATTHEW',
  Micah: 'MICAH',
  Nahum: 'NAHUM',
  Nehemiah: 'NEHEMIAH',
  Numbers: 'NUMBERS',
  Obadiah: 'OBADIAH',
  Philemon: 'PHILEMON',
  Philippians: 'PHILIPPIANS',
  Proverbs: 'PROVERBS',
  Psalms: 'PSALMS',
  Revelation: 'REVELATION',
  Romans: 'ROMANS',
  Ruth: 'RUTH',
  SecondChronicles: 'SECOND_CHRONICLES',
  SecondCorinthians: 'SECOND_CORINTHIANS',
  SecondJohn: 'SECOND_JOHN',
  SecondKings: 'SECOND_KINGS',
  SecondPeter: 'SECOND_PETER',
  SecondSamuel: 'SECOND_SAMUEL',
  SecondThessalonians: 'SECOND_THESSALONIANS',
  SecondTimothy: 'SECOND_TIMOTHY',
  SongOfSolomon: 'SONG_OF_SOLOMON',
  ThirdJohn: 'THIRD_JOHN',
  Titus: 'TITUS',
  Zechariah: 'ZECHARIAH',
  Zephaniah: 'ZEPHANIAH'
} as const;

export type BibleReferenceBook = typeof BibleReferenceBook[keyof typeof BibleReferenceBook];
/** A Bible reference. */
export type BibleReferenceInput = {
  book: BibleReferenceBook;
  chapter: InputMaybe<Scalars['Int']['input']>;
  verse: InputMaybe<Scalars['Int']['input']>;
};

/** The Bible reference range applicable to an item. */
export type BibleReferenceRange = Node & {
  __typename?: 'BibleReferenceRange';
  /** The end reference. */
  endReference: BibleReference;
  id: Scalars['ID']['output'];
  /** The start reference. */
  startReference: BibleReference;
};

export type BibleReferenceRangeConnection = {
  __typename?: 'BibleReferenceRangeConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<BibleReferenceRangeEdge>>;
  nodes: Maybe<Array<BibleReferenceRange>>;
  pageInfo: PageInfo;
};

export type BibleReferenceRangeEdge = {
  __typename?: 'BibleReferenceRangeEdge';
  cursor: Scalars['String']['output'];
  node: BibleReferenceRange;
};

/** The Bible reference range the items must fall in to be applicable. */
export type BibleReferenceRangeInput = {
  /** The end reference. */
  endReference: InputMaybe<BibleReferenceInput>;
  /** The start reference. */
  startReference: BibleReferenceInput;
};

export type BibleSponsor = {
  __typename?: 'BibleSponsor';
  name: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type BibleVerse = {
  __typename?: 'BibleVerse';
  number: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type BlogPost = Node & UniformResourceLocatable & {
  __typename?: 'BlogPost';
  body: Scalars['String']['output'];
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  /** The number of days to feature blog post. */
  featuredDuration: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  image: Maybe<Image>;
  isHidden: Scalars['Boolean']['output'];
  language: Language;
  publishDate: Scalars['DateTime']['output'];
  /** The estimated number of seconds to read the blog post. */
  readingDuration: Maybe<Scalars['Float']['output']>;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  teaser: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type BlogPostCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BlogPostCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BlogPostConnection = {
  __typename?: 'BlogPostConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<BlogPostEdge>>;
  nodes: Maybe<Array<BlogPost>>;
  pageInfo: PageInfo;
};

export type BlogPostCreateInput = {
  body: Scalars['String']['input'];
  /** The number of days to feature blog post. */
  featuredDuration: InputMaybe<Scalars['Int']['input']>;
  image: InputMaybe<ImageInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  teaser: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type BlogPostEdge = {
  __typename?: 'BlogPostEdge';
  cursor: Scalars['String']['output'];
  node: BlogPost;
};

export type BlogPostOrder = {
  direction: OrderByDirection;
  field: BlogPostSortableField;
};

export type BlogPostPayload = {
  __typename?: 'BlogPostPayload';
  blogPost: Maybe<BlogPost>;
  errors: Array<InputValidationError>;
};

/** Properties by which blog post connections can be ordered. */
export const BlogPostSortableField = {
  PublishedAt: 'PUBLISHED_AT'
} as const;

export type BlogPostSortableField = typeof BlogPostSortableField[keyof typeof BlogPostSortableField];
export type BlogPostUpdateInput = {
  body: InputMaybe<Scalars['String']['input']>;
  /** The number of days to feature blog post. */
  featuredDuration: InputMaybe<Scalars['Int']['input']>;
  image: InputMaybe<ImageInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  teaser: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

/** The types of catalog entities. */
export const CatalogEntityType = {
  Collection: 'COLLECTION',
  DistributionAgreement: 'DISTRIBUTION_AGREEMENT',
  License: 'LICENSE',
  Person: 'PERSON',
  Recording: 'RECORDING',
  Sequence: 'SEQUENCE',
  Sponsor: 'SPONSOR'
} as const;

export type CatalogEntityType = typeof CatalogEntityType[keyof typeof CatalogEntityType];
export type CatalogHistoryComment = {
  __typename?: 'CatalogHistoryComment';
  isSticky: Scalars['Boolean']['output'];
  mentions: Array<User>;
  /** Includes mentions in the format of @user:[id] (e.g., `@user:123`). */
  message: Scalars['String']['output'];
};

export type CatalogHistoryCommentCreateInput = {
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  /** Can include mentions in the format of @user:[id] (e.g., `@user:123`). */
  message: Scalars['String']['input'];
};

export type CatalogHistoryCommentUpdateInput = {
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  /** Can include mentions in the format of @user:[id] (e.g., `@user:123`). */
  message: Scalars['String']['input'];
};

export type CatalogHistoryEntityUnion = Collection | DistributionAgreement | License | MediaRelease | Person | Recording | Sequence | Sponsor;

export type CatalogHistoryItem = Node & {
  __typename?: 'CatalogHistoryItem';
  comment: Maybe<CatalogHistoryComment>;
  createdAt: Scalars['DateTime']['output'];
  entity: Maybe<CatalogHistoryEntityUnion>;
  id: Scalars['ID']['output'];
  performer: Maybe<User>;
  type: CatalogHistoryItemType;
};

export type CatalogHistoryItemConnection = {
  __typename?: 'CatalogHistoryItemConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<CatalogHistoryItemEdge>>;
  nodes: Maybe<Array<CatalogHistoryItem>>;
  pageInfo: PageInfo;
};

export type CatalogHistoryItemEdge = {
  __typename?: 'CatalogHistoryItemEdge';
  cursor: Scalars['String']['output'];
  node: CatalogHistoryItem;
};

export type CatalogHistoryItemOrder = {
  direction: OrderByDirection;
  field: CatalogHistoryItemSortableField;
};

export type CatalogHistoryItemPayload = {
  __typename?: 'CatalogHistoryItemPayload';
  catalogHistoryItem: Maybe<CatalogHistoryItem>;
  errors: Array<InputValidationError>;
};

/** Properties by which history item connections can be ordered. */
export const CatalogHistoryItemSortableField = {
  CreatedAt: 'CREATED_AT'
} as const;

export type CatalogHistoryItemSortableField = typeof CatalogHistoryItemSortableField[keyof typeof CatalogHistoryItemSortableField];
/** The supported types of catalog history items. */
export const CatalogHistoryItemType = {
  Archive: 'ARCHIVE',
  CheckoutContent: 'CHECKOUT_CONTENT',
  CheckoutLegal: 'CHECKOUT_LEGAL',
  CheckoutTechnical: 'CHECKOUT_TECHNICAL',
  Created: 'CREATED',
  Deleted: 'DELETED',
  EncodingError: 'ENCODING_ERROR',
  FileUploaded: 'FILE_UPLOADED',
  Hidden: 'HIDDEN',
  InternalComment: 'INTERNAL_COMMENT',
  MediaReleaseSubmit: 'MEDIA_RELEASE_SUBMIT',
  RecordingScreeningCleared: 'RECORDING_SCREENING_CLEARED',
  ScreeningContentAvailable: 'SCREENING_CONTENT_AVAILABLE',
  ScreeningContentFlag: 'SCREENING_CONTENT_FLAG',
  ScreeningLegalAvailable: 'SCREENING_LEGAL_AVAILABLE',
  ScreeningLegalFlag: 'SCREENING_LEGAL_FLAG',
  ScreeningTechnicalAvailable: 'SCREENING_TECHNICAL_AVAILABLE',
  ScreeningTechnicalFlag: 'SCREENING_TECHNICAL_FLAG',
  SystemError: 'SYSTEM_ERROR',
  Unarchive: 'UNARCHIVE',
  Updated: 'UPDATED'
} as const;

export type CatalogHistoryItemType = typeof CatalogHistoryItemType[keyof typeof CatalogHistoryItemType];
/** The supported view filter of catalog history items. */
export const CatalogHistoryItemViewFilter = {
  Comments: 'COMMENTS',
  Logs: 'LOGS',
  Mentions: 'MENTIONS',
  Stickies: 'STICKIES'
} as const;

export type CatalogHistoryItemViewFilter = typeof CatalogHistoryItemViewFilter[keyof typeof CatalogHistoryItemViewFilter];
export type Collection = Node & UniformResourceLocatable & {
  __typename?: 'Collection';
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  contentType: CollectionContentType;
  description: Scalars['String']['output'];
  /** The combined duration of the collection's recordings in seconds. */
  duration: Scalars['Float']['output'];
  endDate: Maybe<Scalars['Date']['output']>;
  hidingReason: Maybe<Scalars['String']['output']>;
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  image: Maybe<Image>;
  imageWithFallback: Image;
  isHidden: Maybe<Scalars['Boolean']['output']>;
  language: Language;
  location: Maybe<Scalars['String']['output']>;
  /** @deprecated Collection.logoImage is replaced with Collection.image */
  logoImage: Maybe<Image>;
  /** @deprecated Collection.logoImageWithFallback is replaced with Collection.imageWithFallback */
  logoImageWithFallback: Image;
  mediaReleaseForm: Maybe<MediaReleaseForm>;
  persons: PersonConnection;
  recordings: RecordingConnection;
  sequences: SequenceConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: Maybe<Scalars['Boolean']['output']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: Maybe<Scalars['Boolean']['output']>;
  sponsor: Maybe<Sponsor>;
  startDate: Maybe<Scalars['Date']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  viewerHasFavorited: Scalars['Boolean']['output'];
  /** The percentage of the associated recordings the viewer has finished playing. */
  viewerPlaybackCompletedPercentage: Scalars['Float']['output'];
};


export type CollectionCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CollectionCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CollectionHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type CollectionPersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<PersonsOrder>>;
  role: InputMaybe<PersonsRoleField>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};


export type CollectionRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type CollectionSequencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<CollectionEdge>>;
  nodes: Maybe<Array<Collection>>;
  pageInfo: PageInfo;
};

/** The available types of collections. */
export const CollectionContentType = {
  AudiobookSeries: 'AUDIOBOOK_SERIES',
  BibleVersion: 'BIBLE_VERSION',
  Conference: 'CONFERENCE',
  MusicSeries: 'MUSIC_SERIES',
  StoryProgram: 'STORY_PROGRAM'
} as const;

export type CollectionContentType = typeof CollectionContentType[keyof typeof CollectionContentType];
export type CollectionCreateInput = {
  contentType: CollectionContentType;
  description: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  location: InputMaybe<Scalars['String']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  sponsorId: Scalars['ID']['input'];
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String']['output'];
  node: Collection;
};

export type CollectionPayload = {
  __typename?: 'CollectionPayload';
  collection: Maybe<Collection>;
  errors: Array<InputValidationError>;
};

export type CollectionUpdateInput = {
  description: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  location: InputMaybe<Scalars['String']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type CollectionsOrder = {
  direction: OrderByDirection;
  field: CollectionsSortableField;
};

/** Properties by which collection connections can be ordered. */
export const CollectionsSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  RecordingCount: 'RECORDING_COUNT',
  RecordingPublishedAt: 'RECORDING_PUBLISHED_AT',
  Title: 'TITLE'
} as const;

export type CollectionsSortableField = typeof CollectionsSortableField[keyof typeof CollectionsSortableField];
/** The date range the items must fall in to be applicable. */
export type DateRangeInput = {
  /** The lower bound of the date range. */
  greaterThan: InputMaybe<Scalars['Date']['input']>;
  /** The lower or equal bound of the date range. */
  greaterThanOrEqualTo: InputMaybe<Scalars['Date']['input']>;
  /** The upper bound of the date range. */
  lessThan: InputMaybe<Scalars['Date']['input']>;
  /** The upper or equal bound of the date range. */
  lessThanOrEqualTo: InputMaybe<Scalars['Date']['input']>;
};

export type DistributionAgreement = Node & {
  __typename?: 'DistributionAgreement';
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  isHidden: Maybe<Scalars['Boolean']['output']>;
  isRetired: Scalars['Boolean']['output'];
  license: Maybe<License>;
  recordings: RecordingConnection;
  sponsor: Maybe<Sponsor>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type DistributionAgreementHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type DistributionAgreementRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type DistributionAgreementConnection = {
  __typename?: 'DistributionAgreementConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<DistributionAgreementEdge>>;
  nodes: Maybe<Array<DistributionAgreement>>;
  pageInfo: PageInfo;
};

export type DistributionAgreementCreateInput = {
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  isRetired: InputMaybe<Scalars['Boolean']['input']>;
  licenseId: Scalars['ID']['input'];
  sponsorId: Scalars['ID']['input'];
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DistributionAgreementEdge = {
  __typename?: 'DistributionAgreementEdge';
  cursor: Scalars['String']['output'];
  node: DistributionAgreement;
};

export type DistributionAgreementPayload = {
  __typename?: 'DistributionAgreementPayload';
  distributionAgreement: Maybe<DistributionAgreement>;
  errors: Array<InputValidationError>;
};

export type DistributionAgreementUpdateInput = {
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  isRetired: InputMaybe<Scalars['Boolean']['input']>;
  licenseId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type DistributionAgreementsOrder = {
  direction: OrderByDirection;
  field: DistributionAgreementsSortableField;
};

/** Properties by which distribution agreement connections can be ordered. */
export const DistributionAgreementsSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  Title: 'TITLE'
} as const;

export type DistributionAgreementsSortableField = typeof DistributionAgreementsSortableField[keyof typeof DistributionAgreementsSortableField];
export type Faq = Node & {
  __typename?: 'Faq';
  body: Scalars['String']['output'];
  faqCategory: FaqCategory;
  id: Scalars['ID']['output'];
  /** The index of the FAQ within its category. */
  index: Scalars['Int']['output'];
  isHidden: Scalars['Boolean']['output'];
  publishDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type FaqCategory = Node & {
  __typename?: 'FaqCategory';
  id: Scalars['ID']['output'];
  /** The index of the category within all categories. */
  index: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type FaqCategoryConnection = {
  __typename?: 'FaqCategoryConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<FaqCategoryEdge>>;
  nodes: Maybe<Array<FaqCategory>>;
  pageInfo: PageInfo;
};

export type FaqCategoryEdge = {
  __typename?: 'FaqCategoryEdge';
  cursor: Scalars['String']['output'];
  node: FaqCategory;
};

export type FaqConnection = {
  __typename?: 'FaqConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<FaqEdge>>;
  nodes: Maybe<Array<Faq>>;
  pageInfo: PageInfo;
};

export type FaqCreateInput = {
  body: Scalars['String']['input'];
  faqCategoryId: Scalars['ID']['input'];
  /** The index of the FAQ within its category. */
  index: Scalars['Int']['input'];
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
};

export type FaqEdge = {
  __typename?: 'FaqEdge';
  cursor: Scalars['String']['output'];
  node: Faq;
};

export type FaqPayload = {
  __typename?: 'FaqPayload';
  errors: Array<InputValidationError>;
  faq: Maybe<Faq>;
};

export type FaqUpdateInput = {
  body: InputMaybe<Scalars['String']['input']>;
  faqCategoryId: InputMaybe<Scalars['ID']['input']>;
  /** The index of the FAQ within its category. */
  index: InputMaybe<Scalars['Int']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type FaqsOrder = {
  direction: OrderByDirection;
  field: FaqsSortableField;
};

/** Properties by which FAQ connections can be ordered. */
export const FaqsSortableField = {
  CreatedAt: 'CREATED_AT',
  Index: 'INDEX',
  Title: 'TITLE'
} as const;

export type FaqsSortableField = typeof FaqsSortableField[keyof typeof FaqsSortableField];
/** The types of catalog entities that may be favorited. */
export const FavoritableCatalogEntityType = {
  Collection: 'COLLECTION',
  Person: 'PERSON',
  Recording: 'RECORDING',
  Sequence: 'SEQUENCE',
  Sponsor: 'SPONSOR'
} as const;

export type FavoritableCatalogEntityType = typeof FavoritableCatalogEntityType[keyof typeof FavoritableCatalogEntityType];
export type FavoriteEntityUnion = Collection | Person | Recording | Sequence | Sponsor;

export type FavoritesOrder = {
  direction: OrderByDirection;
  field: FavoritesSortableField;
};

/** Properties by which user favorites connections can be ordered. */
export const FavoritesSortableField = {
  EntityTitle: 'ENTITY_TITLE',
  FavoritedAt: 'FAVORITED_AT'
} as const;

export type FavoritesSortableField = typeof FavoritesSortableField[keyof typeof FavoritesSortableField];
export type Image = Node & {
  __typename?: 'Image';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['URL']['output'];
};


export type ImageUrlArgs = {
  cropMode?: InputMaybe<ImageCropMode>;
  size: Scalars['Int']['input'];
  skipCache: InputMaybe<Scalars['Boolean']['input']>;
};

/** The underlying API doesn't support offset-based pagination or count requests. As a result this connection doesn't include `pageInfo` or `aggregate` fields. */
export type ImageConnectionSlim = {
  __typename?: 'ImageConnectionSlim';
  edges: Maybe<Array<ImageEdge>>;
};

/** The available image type containers. */
export const ImageContainer = {
  Avatar: 'AVATAR',
  Collection: 'COLLECTION',
  License: 'LICENSE',
  News: 'NEWS',
  Person: 'PERSON',
  Sequence: 'SEQUENCE',
  Site: 'SITE',
  Sponsor: 'SPONSOR'
} as const;

export type ImageContainer = typeof ImageContainer[keyof typeof ImageContainer];
/** Aavailable crop modes for images. */
export const ImageCropMode = {
  /** Resizes the image to the requested size and in the process crops parts from the original image. */
  Default: 'DEFAULT',
  /** Scales the whole image content (no cropping) at the original aspect ratio to fit within the output size. */
  MaxSize: 'MAX_SIZE'
} as const;

export type ImageCropMode = typeof ImageCropMode[keyof typeof ImageCropMode];
export type ImageEdge = {
  __typename?: 'ImageEdge';
  cursor: Scalars['String']['output'];
  node: Image;
};

export type ImageInput = {
  name: Scalars['String']['input'];
};

export type ImagePayload = {
  __typename?: 'ImagePayload';
  errors: Array<InputValidationError>;
  image: Maybe<Image>;
};

export type InputValidationError = {
  __typename?: 'InputValidationError';
  message: Scalars['String']['output'];
};

/** The range the items must fall in to be applicable. */
export type IntegerRangeInput = {
  /** The lower bound of the range. */
  greaterThan: InputMaybe<Scalars['Int']['input']>;
  /** The lower or equal bound of the range. */
  greaterThanOrEqualTo: InputMaybe<Scalars['Int']['input']>;
  /** The upper bound of the range. */
  lessThan: InputMaybe<Scalars['Int']['input']>;
  /** The upper or equal bound of the range. */
  lessThanOrEqualTo: InputMaybe<Scalars['Int']['input']>;
};

export type InternalContact = {
  __typename?: 'InternalContact';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type InternalContactInput = {
  address: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
};

/** Supported languages */
export const Language = {
  Chinese: 'CHINESE',
  English: 'ENGLISH',
  French: 'FRENCH',
  German: 'GERMAN',
  Japanese: 'JAPANESE',
  Nordic: 'NORDIC',
  Portuguese: 'PORTUGUESE',
  Russian: 'RUSSIAN',
  Spanish: 'SPANISH'
} as const;

export type Language = typeof Language[keyof typeof Language];
export type LetterCount = {
  __typename?: 'LetterCount';
  count: Scalars['Int']['output'];
  letter: Scalars['String']['output'];
};

export type License = Node & {
  __typename?: 'License';
  description: Scalars['String']['output'];
  distributionAgreements: DistributionAgreementConnection;
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  image: Maybe<Image>;
  isDefault: Scalars['Boolean']['output'];
  isHidden: Maybe<Scalars['Boolean']['output']>;
  permitsSales: Maybe<Scalars['Boolean']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type LicenseDistributionAgreementsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isRetired: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DistributionAgreementsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type LicenseHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type LicenseConnection = {
  __typename?: 'LicenseConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<LicenseEdge>>;
  nodes: Maybe<Array<License>>;
  pageInfo: PageInfo;
};

export type LicenseCreateInput = {
  description: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  permitsSales: InputMaybe<Scalars['Boolean']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type LicenseEdge = {
  __typename?: 'LicenseEdge';
  cursor: Scalars['String']['output'];
  node: License;
};

export type LicensePayload = {
  __typename?: 'LicensePayload';
  errors: Array<InputValidationError>;
  license: Maybe<License>;
};

export type LicenseUpdateInput = {
  description: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  permitsSales: InputMaybe<Scalars['Boolean']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type LicensesOrder = {
  direction: OrderByDirection;
  field: LicensesSortableField;
};

/** Properties by which license connections can be ordered. */
export const LicensesSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  Title: 'TITLE'
} as const;

export type LicensesSortableField = typeof LicensesSortableField[keyof typeof LicensesSortableField];
/** The media file container types. */
export const MediaFileContainer = {
  Doc: 'DOC',
  Docx: 'DOCX',
  Flv: 'FLV',
  Jpg: 'JPG',
  Key: 'KEY',
  M3U8Ios: 'M3U8_IOS',
  M3U8Web: 'M3U8_WEB',
  M4A: 'M4A',
  M4V: 'M4V',
  Mov: 'MOV',
  Mp3: 'MP3',
  Mp4: 'MP4',
  Odp: 'ODP',
  Odt: 'ODT',
  Pages: 'PAGES',
  Pdf: 'PDF',
  Png: 'PNG',
  Ppt: 'PPT',
  Pptx: 'PPTX',
  Wav: 'WAV',
  Wma: 'WMA',
  Wmv: 'WMV'
} as const;

export type MediaFileContainer = typeof MediaFileContainer[keyof typeof MediaFileContainer];
/** The media file request types. */
export const MediaFileRequestType = {
  Download: 'DOWNLOAD',
  Rss: 'RSS',
  Stream: 'STREAM'
} as const;

export type MediaFileRequestType = typeof MediaFileRequestType[keyof typeof MediaFileRequestType];
export type MediaFileResult = Attachment | AudioFile | VideoFile;

export type MediaFileResultConnection = {
  __typename?: 'MediaFileResultConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<MediaFileResultEdge>>;
  nodes: Maybe<Array<MediaFileResult>>;
  pageInfo: PageInfo;
};

export type MediaFileResultEdge = {
  __typename?: 'MediaFileResultEdge';
  cursor: Scalars['String']['output'];
  node: MediaFileResult;
};

/** The transcoding status of a media file upload. */
export const MediaFileTranscodingStatus = {
  /** Transcoding completed. */
  Complete: 'COMPLETE',
  /** Transcoding failed. */
  Failed: 'FAILED',
  /** Transcoding in process. */
  Processing: 'PROCESSING',
  /** Waiting for transcoding slot. */
  Queued: 'QUEUED',
  /** Not Yet Begun */
  Unstarted: 'UNSTARTED'
} as const;

export type MediaFileTranscodingStatus = typeof MediaFileTranscodingStatus[keyof typeof MediaFileTranscodingStatus];
export type MediaFileUpload = Node & {
  __typename?: 'MediaFileUpload';
  /** Whether the current viewer may delete the file. */
  canDelete: Maybe<Scalars['Boolean']['output']>;
  filename: Scalars['String']['output'];
  /** In bytes */
  filesize: Scalars['String']['output'];
  hasUploaded: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  /** The presigned part upload URLs. Unavailable after the upload has completed. */
  partUploadUrls: Maybe<Array<Scalars['String']['output']>>;
  recording: Maybe<Recording>;
  transcodingStatus: MediaFileTranscodingStatus;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Maybe<Scalars['URL']['output']>;
};


export type MediaFileUploadPartUploadUrlsArgs = {
  count: Scalars['Int']['input'];
};

export type MediaFileUploadConnection = {
  __typename?: 'MediaFileUploadConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<MediaFileUploadEdge>>;
  nodes: Maybe<Array<MediaFileUpload>>;
  pageInfo: PageInfo;
};

export type MediaFileUploadEdge = {
  __typename?: 'MediaFileUploadEdge';
  cursor: Scalars['String']['output'];
  node: MediaFileUpload;
};

export type MediaFileUploadFinishInput = {
  /** The list of entity tags returned from the part upload API calls. */
  uploadPartEtags: Array<Scalars['String']['input']>;
};

export type MediaFileUploadPayload = {
  __typename?: 'MediaFileUploadPayload';
  errors: Array<InputValidationError>;
  mediaFileUpload: Maybe<MediaFileUpload>;
};

export type MediaFileUploadStartInput = {
  filename: Scalars['String']['input'];
  filesize: Scalars['String']['input'];
  recordingId: InputMaybe<Scalars['ID']['input']>;
};

export type MediaFileUploadsOrder = {
  direction: OrderByDirection;
  field: MediaFileUploadsSortableField;
};

/** Properties by which media file uploads connections can be ordered. */
export const MediaFileUploadsSortableField = {
  CreatedAt: 'CREATED_AT',
  Filename: 'FILENAME'
} as const;

export type MediaFileUploadsSortableField = typeof MediaFileUploadsSortableField[keyof typeof MediaFileUploadsSortableField];
export type MediaFilesOrder = {
  direction: OrderByDirection;
  field: MediaFilesSortableField;
};

/** Properties by which media files connections can be ordered. */
export const MediaFilesSortableField = {
  CreatedAt: 'CREATED_AT',
  Filename: 'FILENAME',
  Filesize: 'FILESIZE'
} as const;

export type MediaFilesSortableField = typeof MediaFilesSortableField[keyof typeof MediaFilesSortableField];
export type MediaRelease = Node & {
  __typename?: 'MediaRelease';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mediaReleaseForm: MediaReleaseForm;
  /** The personal information collected with the media release. */
  mediaReleasePerson: MediaReleasePerson;
  notes: Maybe<Scalars['String']['output']>;
  /** The catalog person associated with the media release. */
  person: Maybe<Person>;
};

export type MediaReleaseConnection = {
  __typename?: 'MediaReleaseConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<MediaReleaseEdge>>;
  nodes: Maybe<Array<MediaRelease>>;
  pageInfo: PageInfo;
};

export type MediaReleaseCreateInput = {
  mediaReleaseFormId: Scalars['ID']['input'];
  /** The personal information collected with the media release. */
  mediaReleasePerson: MediaReleasePersonCreateInput;
  notes: InputMaybe<Scalars['String']['input']>;
  /** The catalog person associated with the media release. */
  personId: InputMaybe<Scalars['ID']['input']>;
};

export type MediaReleaseEdge = {
  __typename?: 'MediaReleaseEdge';
  cursor: Scalars['String']['output'];
  node: MediaRelease;
};

export type MediaReleaseForm = Node & {
  __typename?: 'MediaReleaseForm';
  collection: Maybe<Collection>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isClosed: Scalars['Boolean']['output'];
  mediaReleases: MediaReleaseConnection;
  recording: Maybe<Recording>;
  sequence: Maybe<Sequence>;
  sponsor: Maybe<Sponsor>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: MediaReleaseFormType;
  /** The URL for media release form. */
  url: Maybe<Scalars['URL']['output']>;
};


export type MediaReleaseFormMediaReleasesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<MediaReleaseOrder>>;
  personId: InputMaybe<Scalars['ID']['input']>;
  recordingId: InputMaybe<Scalars['ID']['input']>;
  search: InputMaybe<Scalars['String']['input']>;
  seriesId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type MediaReleaseFormConnection = {
  __typename?: 'MediaReleaseFormConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<MediaReleaseFormEdge>>;
  nodes: Maybe<Array<MediaReleaseForm>>;
  pageInfo: PageInfo;
};

export type MediaReleaseFormCreateInput = {
  /** Required if `type` is `COLLECTION`. */
  collectionId: InputMaybe<Scalars['ID']['input']>;
  isClosed: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  /** Required if `type` is `RECORDING`. */
  recordingId: InputMaybe<Scalars['ID']['input']>;
  /** Required if `type` is `SEQUENCE`. */
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  /** Required if `type` is `SPONSOR`. */
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  summary: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: MediaReleaseFormType;
};

export type MediaReleaseFormEdge = {
  __typename?: 'MediaReleaseFormEdge';
  cursor: Scalars['String']['output'];
  node: MediaReleaseForm;
};

/** Content types of the media release form entities with content types. */
export const MediaReleaseFormEntityContentType = {
  Audiobook: 'AUDIOBOOK',
  AudiobookSeries: 'AUDIOBOOK_SERIES',
  AudiobookTrack: 'AUDIOBOOK_TRACK',
  Conference: 'CONFERENCE',
  MusicAlbum: 'MUSIC_ALBUM',
  MusicSeries: 'MUSIC_SERIES',
  MusicTrack: 'MUSIC_TRACK',
  Series: 'SERIES',
  Sermon: 'SERMON',
  Story: 'STORY',
  StoryProgram: 'STORY_PROGRAM',
  StorySeason: 'STORY_SEASON'
} as const;

export type MediaReleaseFormEntityContentType = typeof MediaReleaseFormEntityContentType[keyof typeof MediaReleaseFormEntityContentType];
export type MediaReleaseFormOrder = {
  direction: OrderByDirection;
  field: MediaReleaseFormSortableField;
};

export type MediaReleaseFormPayload = {
  __typename?: 'MediaReleaseFormPayload';
  errors: Array<InputValidationError>;
  mediaReleaseForm: Maybe<MediaReleaseForm>;
};

/** Properties by which media release form connections can be ordered. */
export const MediaReleaseFormSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  Title: 'TITLE',
  Type: 'TYPE'
} as const;

export type MediaReleaseFormSortableField = typeof MediaReleaseFormSortableField[keyof typeof MediaReleaseFormSortableField];
export type MediaReleaseFormTemplate = {
  __typename?: 'MediaReleaseFormTemplate';
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: MediaReleaseFormType;
};

/** Supported types of media release forms. */
export const MediaReleaseFormType = {
  Collection: 'COLLECTION',
  Master: 'MASTER',
  Recording: 'RECORDING',
  Sequence: 'SEQUENCE',
  Sponsor: 'SPONSOR'
} as const;

export type MediaReleaseFormType = typeof MediaReleaseFormType[keyof typeof MediaReleaseFormType];
export type MediaReleaseFormUpdateInput = {
  /** Required if `type` is `COLLECTION`. */
  collectionId: InputMaybe<Scalars['ID']['input']>;
  isClosed: InputMaybe<Scalars['Boolean']['input']>;
  /** Required if `type` is `RECORDING`. */
  recordingId: InputMaybe<Scalars['ID']['input']>;
  /** Required if `type` is `SEQUENCE`. */
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  /** Required if `type` is `SPONSOR`. */
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  type: InputMaybe<MediaReleaseFormType>;
};

export type MediaReleaseOrder = {
  direction: OrderByDirection;
  field: MediaReleaseSortableField;
};

export type MediaReleasePayload = {
  __typename?: 'MediaReleasePayload';
  errors: Array<InputValidationError>;
  mediaRelease: Maybe<MediaRelease>;
};

export type MediaReleasePerson = {
  __typename?: 'MediaReleasePerson';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  country: Maybe<Scalars['String']['output']>;
  /** The person's email address. */
  email: Scalars['String']['output'];
  /** The person's first name. */
  givenName: Scalars['String']['output'];
  /** The full name of the person, based on the values for givenName and surname. */
  name: Scalars['String']['output'];
  /** The person's phone number. */
  phone: Scalars['String']['output'];
  /** The postal or zip code. */
  postalCode: Maybe<Scalars['String']['output']>;
  /** The name of the region, such as the province, state, or district. */
  province: Maybe<Scalars['String']['output']>;
  /** The person's last name. */
  surname: Scalars['String']['output'];
};

export type MediaReleasePersonCreateInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Scalars['String']['input'];
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: InputMaybe<Scalars['String']['input']>;
  /** The name of the city, district, village, or town. */
  city: Scalars['String']['input'];
  /** The name of the country. */
  country: Scalars['String']['input'];
  /** The person's email address. */
  email: Scalars['String']['input'];
  /** The person's first name. */
  givenName: Scalars['String']['input'];
  /** The person's phone number. */
  phone: Scalars['String']['input'];
  /** The postal or zip code. */
  postalCode: Scalars['String']['input'];
  /** The name of the region, such as the province, state, or district. */
  province: Scalars['String']['input'];
  /** The person's last name. */
  surname: Scalars['String']['input'];
};

export type MediaReleasePersonUpdateInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: InputMaybe<Scalars['String']['input']>;
  /** The name of the city, district, village, or town. */
  city: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  country: InputMaybe<Scalars['String']['input']>;
  /** The person's email address. */
  email: InputMaybe<Scalars['String']['input']>;
  /** The person's first name. */
  givenName: InputMaybe<Scalars['String']['input']>;
  /** The person's phone number. */
  phone: InputMaybe<Scalars['String']['input']>;
  /** The postal or zip code. */
  postalCode: InputMaybe<Scalars['String']['input']>;
  /** The name of the region, such as the province, state, or district. */
  province: InputMaybe<Scalars['String']['input']>;
  /** The person's last name. */
  surname: InputMaybe<Scalars['String']['input']>;
};

/** Properties by which media release connections can be ordered. */
export const MediaReleaseSortableField = {
  CreatedAt: 'CREATED_AT',
  GivenName: 'GIVEN_NAME',
  Id: 'ID',
  Surname: 'SURNAME'
} as const;

export type MediaReleaseSortableField = typeof MediaReleaseSortableField[keyof typeof MediaReleaseSortableField];
export type MediaReleaseUpdateInput = {
  /** The personal information collected with the media release. */
  mediaReleasePerson: InputMaybe<MediaReleasePersonUpdateInput>;
  notes: InputMaybe<Scalars['String']['input']>;
  /** The catalog person associated with the media release. */
  personId: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  blogPostCreate: BlogPostPayload;
  blogPostDelete: SuccessPayload;
  blogPostUpdate: BlogPostPayload;
  catalogHistoryCommentDelete: SuccessPayload;
  catalogHistoryCommentUpdate: CatalogHistoryItemPayload;
  collectionCreate: CollectionPayload;
  collectionDelete: SuccessPayload;
  collectionFavorite: SuccessPayload;
  collectionHistoryCommentCreate: CatalogHistoryItemPayload;
  /** Approve all recordings in collection through legal screening. */
  collectionScreeningLegalOverride: SuccessPayload;
  collectionUnfavorite: SuccessPayload;
  collectionUpdate: CollectionPayload;
  distributionAgreementCreate: DistributionAgreementPayload;
  distributionAgreementDelete: SuccessPayload;
  distributionAgreementHistoryCommentCreate: CatalogHistoryItemPayload;
  distributionAgreementUpdate: DistributionAgreementPayload;
  faqCreate: FaqPayload;
  faqDelete: SuccessPayload;
  faqUpdate: FaqPayload;
  /** @deprecated favoriteRecording is replaced with recordingFavorite */
  favoriteRecording: Scalars['Boolean']['output'];
  /** Upload an image to an image type container. */
  imageUpload: ImagePayload;
  licenseCreate: LicensePayload;
  licenseDelete: SuccessPayload;
  licenseHistoryCommentCreate: CatalogHistoryItemPayload;
  licenseUpdate: LicensePayload;
  login: AuthenticatedUserPayload;
  loginSocial: AuthenticatedUserPayload;
  mediaFileDelete: SuccessPayload;
  mediaFileUploadAbort: SuccessPayload;
  mediaFileUploadAssign: SuccessPayload;
  mediaFileUploadFinish: MediaFileUploadPayload;
  mediaFileUploadStart: MediaFileUploadPayload;
  mediaReleaseCreate: MediaReleasePayload;
  mediaReleaseDelete: SuccessPayload;
  mediaReleaseFormCreate: MediaReleaseFormPayload;
  mediaReleaseFormDelete: SuccessPayload;
  mediaReleaseFormTemplateUpdate: SuccessPayload;
  mediaReleaseFormUpdate: MediaReleaseFormPayload;
  mediaReleaseUpdate: MediaReleasePayload;
  pageContactSubmit: SuccessPayload;
  pageCreate: PagePayload;
  pageDelete: SuccessPayload;
  pageUpdate: PagePayload;
  personCreate: PersonPayload;
  personDelete: SuccessPayload;
  personFavorite: SuccessPayload;
  personHistoryCommentCreate: CatalogHistoryItemPayload;
  personUnfavorite: SuccessPayload;
  personUpdate: PersonPayload;
  playlistAdd: UserPlaylist;
  playlistDelete: Scalars['Boolean']['output'];
  playlistRecordingAdd: Scalars['Boolean']['output'];
  playlistRecordingRemove: Scalars['Boolean']['output'];
  playlistUpdate: UserPlaylist;
  recordingArchive: SuccessPayload;
  recordingCreate: RecordingPayload;
  recordingDelete: SuccessPayload;
  /** Advances a recording from or withdraws a recording to draft stage. */
  recordingDrafting: RecordingPayload;
  recordingFavorite: SuccessPayload;
  recordingHistoryCommentCreate: CatalogHistoryItemPayload;
  recordingPlaybackSessionAdvance: RecordingPayload;
  recordingPlaybackSessionBegin: RecordingPayload;
  recordingPlaybackSessionFinish: RecordingPayload;
  recordingScreeningContentCheckoutCreate: RecordingScreeningCheckoutPayload;
  recordingScreeningContentCheckoutDelete: SuccessPayload;
  recordingScreeningContentEvaluate: RecordingPayload;
  recordingScreeningContentEvaluationsClear: RecordingPayload;
  /** Sets the methods used in evaluating the recording. */
  recordingScreeningContentMethodsSet: RecordingContentScreeningEvaluationPayload;
  /** Requires `ADMINISTRATION` role. */
  recordingScreeningContentUnevaluate: RecordingPayload;
  recordingScreeningIssueCreate: RecordingScreeningIssuePayload;
  recordingScreeningIssueDelete: SuccessPayload;
  recordingScreeningIssueUpdate: RecordingScreeningIssuePayload;
  recordingScreeningLegalCheckoutCreate: RecordingScreeningCheckoutPayload;
  recordingScreeningLegalCheckoutDelete: SuccessPayload;
  recordingScreeningLegalEvaluate: RecordingPayload;
  recordingScreeningTechnicalCheckoutCreate: RecordingScreeningCheckoutPayload;
  recordingScreeningTechnicalCheckoutDelete: SuccessPayload;
  recordingScreeningTechnicalEvaluate: RecordingPayload;
  /** Deletes a recording's transcript, if extant. */
  recordingTranscriptDelete: SuccessPayload;
  /** Update a recording's transcript. */
  recordingTranscriptUpdate: RecordingPayload;
  /** Requests a recording be enqueued for automated transcription. */
  recordingTranscriptionRequest: SuccessPayload;
  recordingUnarchive: SuccessPayload;
  recordingUnfavorite: SuccessPayload;
  recordingUpdate: RecordingPayload;
  sequenceCreate: SequencePayload;
  sequenceDelete: SuccessPayload;
  sequenceFavorite: SuccessPayload;
  sequenceHistoryCommentCreate: CatalogHistoryItemPayload;
  /** Approve all recordings in sequence through legal screening. */
  sequenceScreeningLegalOverride: SuccessPayload;
  sequenceUnfavorite: SuccessPayload;
  sequenceUpdate: SequencePayload;
  signup: AuthenticatedUserPayload;
  sponsorCreate: SponsorPayload;
  sponsorDelete: SuccessPayload;
  sponsorFavorite: SuccessPayload;
  sponsorHistoryCommentCreate: CatalogHistoryItemPayload;
  sponsorUnfavorite: SuccessPayload;
  sponsorUpdate: SponsorPayload;
  testimonyCreate: TestimonyPayload;
  testimonyDelete: SuccessPayload;
  testimonyUpdate: TestimonyPayload;
  /** @deprecated unfavoriteRecording is replaced with recordingUnfavorite */
  unfavoriteRecording: Scalars['Boolean']['output'];
  updateMyProfile: AuthenticatedUserPayload;
  userCreate: UserPayload;
  userDelete: SuccessPayload;
  /** Mark all notifications read for the current viewer. */
  userNotificationsRead: UserPayload;
  /** Sends a reset password email to the user, as the first step in the reset password process. */
  userRecover: SuccessPayload;
  /** Resets a user's password with a token received from `userRecover`. */
  userReset: SuccessPayload;
  userUpdate: UserPayload;
};


export type MutationBlogPostCreateArgs = {
  input: BlogPostCreateInput;
};


export type MutationBlogPostDeleteArgs = {
  blogPostId: Scalars['ID']['input'];
};


export type MutationBlogPostUpdateArgs = {
  blogPostId: Scalars['ID']['input'];
  input: BlogPostUpdateInput;
};


export type MutationCatalogHistoryCommentDeleteArgs = {
  catalogHistoryCommentId: Scalars['ID']['input'];
};


export type MutationCatalogHistoryCommentUpdateArgs = {
  catalogHistoryCommentId: Scalars['ID']['input'];
  input: CatalogHistoryCommentUpdateInput;
};


export type MutationCollectionCreateArgs = {
  input: CollectionCreateInput;
};


export type MutationCollectionDeleteArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationCollectionFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCollectionHistoryCommentCreateArgs = {
  collectionId: Scalars['ID']['input'];
  input: CatalogHistoryCommentCreateInput;
};


export type MutationCollectionScreeningLegalOverrideArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationCollectionUnfavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCollectionUpdateArgs = {
  collectionId: Scalars['ID']['input'];
  input: CollectionUpdateInput;
};


export type MutationDistributionAgreementCreateArgs = {
  input: DistributionAgreementCreateInput;
};


export type MutationDistributionAgreementDeleteArgs = {
  distributionAgreementId: Scalars['ID']['input'];
};


export type MutationDistributionAgreementHistoryCommentCreateArgs = {
  distributionAgreementId: Scalars['ID']['input'];
  input: CatalogHistoryCommentCreateInput;
};


export type MutationDistributionAgreementUpdateArgs = {
  distributionAgreementId: Scalars['ID']['input'];
  input: DistributionAgreementUpdateInput;
};


export type MutationFaqCreateArgs = {
  input: FaqCreateInput;
};


export type MutationFaqDeleteArgs = {
  faqId: Scalars['ID']['input'];
};


export type MutationFaqUpdateArgs = {
  faqId: Scalars['ID']['input'];
  input: FaqUpdateInput;
};


export type MutationFavoriteRecordingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationImageUploadArgs = {
  image: Scalars['Upload']['input'];
  imageType: ImageContainer;
};


export type MutationLicenseCreateArgs = {
  input: LicenseCreateInput;
};


export type MutationLicenseDeleteArgs = {
  licenseId: Scalars['ID']['input'];
};


export type MutationLicenseHistoryCommentCreateArgs = {
  input: CatalogHistoryCommentCreateInput;
  licenseId: Scalars['ID']['input'];
};


export type MutationLicenseUpdateArgs = {
  input: LicenseUpdateInput;
  licenseId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationLoginSocialArgs = {
  input: UserLoginSocialInput;
};


export type MutationMediaFileDeleteArgs = {
  mediaFileId: Scalars['ID']['input'];
};


export type MutationMediaFileUploadAbortArgs = {
  mediaFileUploadId: Scalars['ID']['input'];
};


export type MutationMediaFileUploadAssignArgs = {
  mediaFileUploadId: Scalars['ID']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationMediaFileUploadFinishArgs = {
  input: MediaFileUploadFinishInput;
  mediaFileUploadId: Scalars['ID']['input'];
};


export type MutationMediaFileUploadStartArgs = {
  input: MediaFileUploadStartInput;
};


export type MutationMediaReleaseCreateArgs = {
  input: MediaReleaseCreateInput;
};


export type MutationMediaReleaseDeleteArgs = {
  mediaReleaseId: Scalars['ID']['input'];
};


export type MutationMediaReleaseFormCreateArgs = {
  input: MediaReleaseFormCreateInput;
};


export type MutationMediaReleaseFormDeleteArgs = {
  mediaReleaseFormId: Scalars['ID']['input'];
};


export type MutationMediaReleaseFormTemplateUpdateArgs = {
  input: MediaReleaseFormUpdateInput;
  language: Language;
  type: MediaReleaseFormType;
};


export type MutationMediaReleaseFormUpdateArgs = {
  input: MediaReleaseFormUpdateInput;
  mediaReleaseFormId: Scalars['ID']['input'];
};


export type MutationMediaReleaseUpdateArgs = {
  input: MediaReleaseUpdateInput;
  mediaReleaseId: Scalars['ID']['input'];
};


export type MutationPageContactSubmitArgs = {
  input: PageContactSubmitInput;
};


export type MutationPageCreateArgs = {
  input: PageCreateInput;
};


export type MutationPageDeleteArgs = {
  pageId: Scalars['ID']['input'];
};


export type MutationPageUpdateArgs = {
  input: PageUpdateInput;
  pageId: Scalars['ID']['input'];
};


export type MutationPersonCreateArgs = {
  input: PersonCreateInput;
};


export type MutationPersonDeleteArgs = {
  personId: Scalars['ID']['input'];
};


export type MutationPersonFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPersonHistoryCommentCreateArgs = {
  input: CatalogHistoryCommentCreateInput;
  personId: Scalars['ID']['input'];
};


export type MutationPersonUnfavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPersonUpdateArgs = {
  input: PersonUpdateInput;
  personId: Scalars['ID']['input'];
};


export type MutationPlaylistAddArgs = {
  input: UserPlaylistAddInput;
};


export type MutationPlaylistDeleteArgs = {
  playlistId: Scalars['ID']['input'];
};


export type MutationPlaylistRecordingAddArgs = {
  playlistId: Scalars['ID']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationPlaylistRecordingRemoveArgs = {
  playlistId: Scalars['ID']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationPlaylistUpdateArgs = {
  input: UserPlaylistUpdateInput;
  playlistId: Scalars['ID']['input'];
};


export type MutationRecordingArchiveArgs = {
  reason: Scalars['String']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingCreateArgs = {
  input: RecordingCreateInput;
};


export type MutationRecordingDeleteArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingDraftingArgs = {
  finished: Scalars['Boolean']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRecordingHistoryCommentCreateArgs = {
  input: CatalogHistoryCommentCreateInput;
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingPlaybackSessionAdvanceArgs = {
  input: PlaybackSessionAdvanceInput;
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingPlaybackSessionBeginArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingPlaybackSessionFinishArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningContentCheckoutCreateArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningContentCheckoutDeleteArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningContentEvaluateArgs = {
  approve: Scalars['Boolean']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningContentEvaluationsClearArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningContentMethodsSetArgs = {
  methods: Array<RecordingScreeningMethod>;
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningContentUnevaluateArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningIssueCreateArgs = {
  input: RecordingScreeningIssueInput;
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningIssueDeleteArgs = {
  issueId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningIssueUpdateArgs = {
  input: RecordingScreeningIssueInput;
  issueId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningLegalCheckoutCreateArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningLegalCheckoutDeleteArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningLegalEvaluateArgs = {
  approve: Scalars['Boolean']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingScreeningTechnicalCheckoutCreateArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningTechnicalCheckoutDeleteArgs = {
  recordingId: Scalars['ID']['input'];
  userId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRecordingScreeningTechnicalEvaluateArgs = {
  approve: Scalars['Boolean']['input'];
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingTranscriptDeleteArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingTranscriptUpdateArgs = {
  input: TranscriptUpdateInput;
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingTranscriptionRequestArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingUnarchiveArgs = {
  recordingId: Scalars['ID']['input'];
};


export type MutationRecordingUnfavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRecordingUpdateArgs = {
  input: RecordingUpdateInput;
  recordingId: Scalars['ID']['input'];
};


export type MutationSequenceCreateArgs = {
  input: SequenceCreateInput;
};


export type MutationSequenceDeleteArgs = {
  sequenceId: Scalars['ID']['input'];
};


export type MutationSequenceFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSequenceHistoryCommentCreateArgs = {
  input: CatalogHistoryCommentCreateInput;
  sequenceId: Scalars['ID']['input'];
};


export type MutationSequenceScreeningLegalOverrideArgs = {
  sequenceId: Scalars['ID']['input'];
};


export type MutationSequenceUnfavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSequenceUpdateArgs = {
  input: SequenceUpdateInput;
  sequenceId: Scalars['ID']['input'];
};


export type MutationSignupArgs = {
  input: UserSignupInput;
};


export type MutationSponsorCreateArgs = {
  input: SponsorCreateInput;
};


export type MutationSponsorDeleteArgs = {
  sponsorId: Scalars['ID']['input'];
};


export type MutationSponsorFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSponsorHistoryCommentCreateArgs = {
  input: CatalogHistoryCommentCreateInput;
  sponsorId: Scalars['ID']['input'];
};


export type MutationSponsorUnfavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSponsorUpdateArgs = {
  input: SponsorUpdateInput;
  sponsorId: Scalars['ID']['input'];
};


export type MutationTestimonyCreateArgs = {
  input: TestimonyCreateInput;
};


export type MutationTestimonyDeleteArgs = {
  testimonyId: Scalars['ID']['input'];
};


export type MutationTestimonyUpdateArgs = {
  input: TestimonyUpdateInput;
  testimonyId: Scalars['ID']['input'];
};


export type MutationUnfavoriteRecordingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateMyProfileArgs = {
  input: UserUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  destroyData: InputMaybe<Scalars['Boolean']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationUserRecoverArgs = {
  email: Scalars['String']['input'];
};


export type MutationUserResetArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
  userId: Scalars['ID']['input'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type NotificationChannel = Node & {
  __typename?: 'NotificationChannel';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type NotificationChannelConnection = {
  __typename?: 'NotificationChannelConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<NotificationChannelEdge>>;
  nodes: Maybe<Array<NotificationChannel>>;
  pageInfo: PageInfo;
};

export type NotificationChannelEdge = {
  __typename?: 'NotificationChannelEdge';
  cursor: Scalars['String']['output'];
  node: NotificationChannel;
};

/** The periods notifications can be sent on. */
export const NotificationFrequency = {
  /** Notifications will be sent in a daily digest. */
  Daily: 'DAILY',
  /** Notifications will be sent immediately. */
  Immediate: 'IMMEDIATE',
  /** Notifications will be sent in a monthly digest. */
  Monthly: 'MONTHLY',
  /** Notifications will be sent in a weekly digest. */
  Weekly: 'WEEKLY'
} as const;

export type NotificationFrequency = typeof NotificationFrequency[keyof typeof NotificationFrequency];
export type NotificationSubscription = {
  __typename?: 'NotificationSubscription';
  frequency: NotificationFrequency;
  notificationChannel: NotificationChannel;
};

export type NotificationSubscriptionConnection = {
  __typename?: 'NotificationSubscriptionConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<NotificationSubscriptionEdge>>;
  nodes: Maybe<Array<NotificationSubscription>>;
  pageInfo: PageInfo;
};

export type NotificationSubscriptionEdge = {
  __typename?: 'NotificationSubscriptionEdge';
  cursor: Scalars['String']['output'];
  node: NotificationSubscription;
};

export type NotificationSubscriptionInput = {
  frequency: NotificationFrequency;
  notificationChannelId: Scalars['ID']['input'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export const OrderByDirection = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderByDirection = typeof OrderByDirection[keyof typeof OrderByDirection];
export type Page = Node & {
  __typename?: 'Page';
  body: Scalars['String']['output'];
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  id: Scalars['ID']['output'];
  isHidden: Scalars['Boolean']['output'];
  pageMenu: Maybe<PageMenu>;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: PageType;
};


export type PageCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageConnection = {
  __typename?: 'PageConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<PageEdge>>;
  nodes: Maybe<Array<Page>>;
  pageInfo: PageInfo;
};

/** The available contact page recipients. */
export const PageContactRecipient = {
  General: 'GENERAL',
  Technical: 'TECHNICAL',
  Testimony: 'TESTIMONY'
} as const;

export type PageContactRecipient = typeof PageContactRecipient[keyof typeof PageContactRecipient];
export type PageContactSubmitInput = {
  body: Scalars['String']['input'];
  email: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  language: Language;
  recipient: PageContactRecipient;
  surname: Scalars['String']['input'];
};

export type PageCreateInput = {
  body: Scalars['String']['input'];
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  pageMenuId: InputMaybe<Scalars['ID']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: PageType;
};

export type PageEdge = {
  __typename?: 'PageEdge';
  cursor: Scalars['String']['output'];
  node: Page;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type PageMenu = Node & {
  __typename?: 'PageMenu';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PageMenuConnection = {
  __typename?: 'PageMenuConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<PageMenuEdge>>;
  nodes: Maybe<Array<PageMenu>>;
  pageInfo: PageInfo;
};

export type PageMenuEdge = {
  __typename?: 'PageMenuEdge';
  cursor: Scalars['String']['output'];
  node: PageMenu;
};

export type PagePayload = {
  __typename?: 'PagePayload';
  errors: Array<InputValidationError>;
  page: Maybe<Page>;
};

/** The available page types. Only the `CUSTOM` type may have more than one `Page` per language. */
export const PageType = {
  About: 'ABOUT',
  Blog: 'BLOG',
  Custom: 'CUSTOM',
  Legal: 'LEGAL',
  Privacy: 'PRIVACY',
  SpiritOfAv: 'SPIRIT_OF_AV',
  Team: 'TEAM',
  TermsOfUse: 'TERMS_OF_USE',
  Testimonials: 'TESTIMONIALS'
} as const;

export type PageType = typeof PageType[keyof typeof PageType];
export type PageUpdateInput = {
  body: InputMaybe<Scalars['String']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  pageMenuId: InputMaybe<Scalars['ID']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type PagesOrder = {
  direction: OrderByDirection;
  field: PagesSortableField;
};

/** Properties by which page connections can be ordered. */
export const PagesSortableField = {
  CreatedAt: 'CREATED_AT',
  Slug: 'SLUG',
  Title: 'TITLE'
} as const;

export type PagesSortableField = typeof PagesSortableField[keyof typeof PagesSortableField];
export type Person = Node & UniformResourceLocatable & {
  __typename?: 'Person';
  address: Maybe<Scalars['String']['output']>;
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  collections: CollectionConnection;
  description: Scalars['String']['output'];
  designations: Scalars['String']['output'];
  email: Maybe<Scalars['String']['output']>;
  givenName: Scalars['String']['output'];
  hidingReason: Maybe<Scalars['String']['output']>;
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  image: Maybe<Image>;
  imageWithFallback: Image;
  internalContact: Maybe<InternalContact>;
  isHidden: Scalars['Boolean']['output'];
  /** @deprecated Person.isPreapproved is replaced with Person.skipContentScreening */
  isPreapproved: Maybe<Scalars['Boolean']['output']>;
  language: Language;
  name: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
  /** @deprecated Person.photo is replaced with Person.image */
  photo: Maybe<Image>;
  /** @deprecated Person.photoWithFallback is replaced with Person.imageWithFallback */
  photoWithFallback: Image;
  recordings: RecordingConnection;
  sequences: SequenceConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: Maybe<Scalars['Boolean']['output']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: Maybe<Scalars['Boolean']['output']>;
  suffix: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  title: Scalars['String']['output'];
  viewerHasFavorited: Scalars['Boolean']['output'];
  website: Maybe<Scalars['URL']['output']>;
};


export type PersonCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PersonCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PersonCollectionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  withRole: InputMaybe<PersonsRoleField>;
};


export type PersonHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type PersonRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  contentType: InputMaybe<RecordingContentType>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
  withRole: InputMaybe<PersonsRoleField>;
};


export type PersonSequencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  withRole: InputMaybe<PersonsRoleField>;
};

export type PersonConnection = {
  __typename?: 'PersonConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<PersonEdge>>;
  nodes: Maybe<Array<Person>>;
  pageInfo: PageInfo;
};

export type PersonCreateInput = {
  address: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  designations: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  givenName: Scalars['String']['input'];
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  internalContact: InputMaybe<InternalContactInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  /** Deprecated: isPreapproved is replaced with skipContentScreening. */
  isPreapproved: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  phone: InputMaybe<Scalars['String']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  suffix: InputMaybe<Scalars['String']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  surname: Scalars['String']['input'];
  title: InputMaybe<Scalars['String']['input']>;
  website: InputMaybe<Scalars['URL']['input']>;
};

export type PersonEdge = {
  __typename?: 'PersonEdge';
  cursor: Scalars['String']['output'];
  node: Person;
};

export type PersonPayload = {
  __typename?: 'PersonPayload';
  errors: Array<InputValidationError>;
  person: Maybe<Person>;
};

export type PersonUpdateInput = {
  address: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  designations: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  givenName: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  internalContact: InputMaybe<InternalContactInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  /** Deprecated: isPreapproved is replaced with skipContentScreening. */
  isPreapproved: InputMaybe<Scalars['Boolean']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  suffix: InputMaybe<Scalars['String']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  surname: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  website: InputMaybe<Scalars['URL']['input']>;
};

export type PersonsOrder = {
  direction: OrderByDirection;
  field: PersonsSortableField;
};

/** The roles a Person can hold. */
export const PersonsRoleField = {
  Artist: 'ARTIST',
  Author: 'AUTHOR',
  Composer: 'COMPOSER',
  Narrator: 'NARRATOR',
  Speaker: 'SPEAKER',
  Translator: 'TRANSLATOR',
  Writer: 'WRITER'
} as const;

export type PersonsRoleField = typeof PersonsRoleField[keyof typeof PersonsRoleField];
/** Properties by which person connections can be ordered. */
export const PersonsSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  Name: 'NAME',
  RecordingCount: 'RECORDING_COUNT',
  RecordingDownloadsAllTime: 'RECORDING_DOWNLOADS_ALL_TIME',
  RecordingPublishedAt: 'RECORDING_PUBLISHED_AT'
} as const;

export type PersonsSortableField = typeof PersonsSortableField[keyof typeof PersonsSortableField];
export type PlaybackSessionAdvanceInput = {
  /** The playback position as a percentage of the recording duration. */
  positionPercentage: Scalars['Float']['input'];
};

export type PopularPerson = {
  __typename?: 'PopularPerson';
  person: Person;
  weight: Scalars['Float']['output'];
};

export type PopularPersonConnection = {
  __typename?: 'PopularPersonConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<PopularPersonEdge>>;
  nodes: Maybe<Array<PopularPerson>>;
  pageInfo: PageInfo;
};

export type PopularPersonEdge = {
  __typename?: 'PopularPersonEdge';
  cursor: Scalars['String']['output'];
  node: PopularPerson;
};

export type PopularRecording = {
  __typename?: 'PopularRecording';
  recording: Recording;
  weight: Scalars['Float']['output'];
};

export type PopularRecordingConnection = {
  __typename?: 'PopularRecordingConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<PopularRecordingEdge>>;
  nodes: Maybe<Array<PopularRecording>>;
  pageInfo: PageInfo;
};

export type PopularRecordingEdge = {
  __typename?: 'PopularRecordingEdge';
  cursor: Scalars['String']['output'];
  node: PopularRecording;
};

export type Query = {
  __typename?: 'Query';
  adminImage: Maybe<Image>;
  adminImages: ImageConnectionSlim;
  audiobible: Maybe<Bible>;
  audiobibleChapter: Maybe<BibleChapter>;
  audiobibles: BibleConnection;
  audiobook: Maybe<Sequence>;
  /** Alias for `collection(id: ID)` */
  audiobookSeries: Maybe<Collection>;
  audiobookSerieses: CollectionConnection;
  audiobookTrack: Maybe<Recording>;
  audiobookTracks: RecordingConnection;
  audiobooks: SequenceConnection;
  blogPost: Maybe<BlogPost>;
  blogPosts: BlogPostConnection;
  collection: Maybe<Collection>;
  collections: CollectionConnection;
  /** Alias for `collection(id: ID)` */
  conference: Maybe<Collection>;
  conferences: CollectionConnection;
  distributionAgreement: Maybe<DistributionAgreement>;
  distributionAgreements: DistributionAgreementConnection;
  faq: Maybe<Faq>;
  faqCategories: Maybe<FaqCategoryConnection>;
  faqs: FaqConnection;
  featuredBlogPosts: BlogPostConnection;
  featuredPersons: PersonConnection;
  featuredRecordings: RecordingConnection;
  featuredSequences: SequenceConnection;
  featuredSponsors: SponsorConnection;
  license: Maybe<License>;
  licenses: LicenseConnection;
  me: Maybe<AuthenticatedUser>;
  mediaFileUploads: MediaFileUploadConnection;
  mediaFiles: MediaFileResultConnection;
  mediaRelease: Maybe<MediaRelease>;
  mediaReleaseForm: Maybe<MediaReleaseForm>;
  mediaReleaseFormTemplates: Array<MediaReleaseFormTemplate>;
  mediaReleaseForms: MediaReleaseFormConnection;
  mediaReleases: MediaReleaseConnection;
  musicAlbum: Maybe<Sequence>;
  musicAlbums: SequenceConnection;
  /** @deprecated Query.musicBookTags will be replaced with a scriptural reference type. */
  musicBookTags: TagConnection;
  musicMoodTags: TagConnection;
  musicSerieses: CollectionConnection;
  musicTrack: Maybe<Recording>;
  musicTracks: RecordingConnection;
  notificationChannels: Maybe<NotificationChannelConnection>;
  page: Maybe<Page>;
  pageMenus: Maybe<PageMenuConnection>;
  pages: PageConnection;
  person: Maybe<Person>;
  /** Returns the number of persons beginning with each letter. */
  personLetterCounts: Array<LetterCount>;
  persons: PersonConnection;
  popularPersons: PopularPersonConnection;
  popularRecordings: PopularRecordingConnection;
  recording: Maybe<Recording>;
  recordingScreeningIssueType: Maybe<RecordingScreeningIssueType>;
  recordingScreeningIssueTypes: RecordingScreeningIssueTypeConnection;
  recordings: RecordingConnection;
  sequence: Maybe<Sequence>;
  sequences: SequenceConnection;
  series: Maybe<Sequence>;
  /** Series is both a singular and plural form. `series` returns a single sequence. `serieses` is an archaic plural form of series used here to avoid `seriess` or some other ugly solution. */
  serieses: SequenceConnection;
  sermon: Maybe<Recording>;
  sermons: RecordingConnection;
  sponsor: Maybe<Sponsor>;
  /** Returns the number of sponsors beginning with each letter. */
  sponsorLetterCounts: Array<LetterCount>;
  sponsors: SponsorConnection;
  stories: RecordingConnection;
  story: Maybe<Recording>;
  /** Alias for `collection(id: ID)` */
  storyProgram: Maybe<Collection>;
  storyPrograms: CollectionConnection;
  storySeason: Maybe<Sequence>;
  storySeasons: SequenceConnection;
  tags: TagConnection;
  testimonies: TestimonyConnection;
  testimony: Maybe<Testimony>;
  topic: Maybe<Topic>;
  topics: TopicConnection;
  user: Maybe<User>;
  users: UserConnection;
  websiteFeaturedCollection: Maybe<FavoriteEntityUnion>;
  websiteRecentRecordings: RecordingConnection;
  websites: WebsiteConnection;
};


export type QueryAdminImageArgs = {
  imageType: ImageContainer;
  name: Scalars['String']['input'];
};


export type QueryAdminImagesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  imageType: ImageContainer;
};


export type QueryAudiobibleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAudiobibleChapterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAudiobiblesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAudiobookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAudiobookSeriesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAudiobookSeriesesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryAudiobookTrackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAudiobookTracksArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryAudiobooksArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryBlogPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBlogPostsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<BlogPostOrder>>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollectionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  contentType: InputMaybe<CollectionContentType>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryConferenceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryConferencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryDistributionAgreementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDistributionAgreementsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isRetired: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  licenseId: InputMaybe<Scalars['ID']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DistributionAgreementsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryFaqArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFaqCategoriesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFaqsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  faqCategoryId: InputMaybe<Scalars['Int']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<FaqsOrder>>;
};


export type QueryFeaturedBlogPostsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFeaturedPersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  role: InputMaybe<PersonsRoleField>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
  withContentTypes: InputMaybe<Array<RecordingContentType>>;
};


export type QueryFeaturedRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  contentType?: InputMaybe<RecordingContentType>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryFeaturedSequencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentType: InputMaybe<SequenceContentType>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryFeaturedSponsorsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  search: InputMaybe<Scalars['String']['input']>;
  startsWith: InputMaybe<Scalars['String']['input']>;
  withMusic: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLicenseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLicensesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<LicensesOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
};


export type QueryMediaFileUploadsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasUploaded: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<MediaFileUploadsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
};


export type QueryMediaFilesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<MediaFilesOrder>>;
  transcodingStatuses: InputMaybe<Array<MediaFileTranscodingStatus>>;
};


export type QueryMediaReleaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMediaReleaseFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMediaReleaseFormTemplatesArgs = {
  language: Language;
};


export type QueryMediaReleaseFormsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  entityContentType: InputMaybe<MediaReleaseFormEntityContentType>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<MediaReleaseFormOrder>>;
  recordingId: InputMaybe<Scalars['ID']['input']>;
  search: InputMaybe<Scalars['String']['input']>;
  seriesId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  type: InputMaybe<MediaReleaseFormType>;
};


export type QueryMediaReleasesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  mediaReleaseFormId: InputMaybe<Scalars['ID']['input']>;
  mediaReleaseFormType: InputMaybe<MediaReleaseFormType>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<MediaReleaseOrder>>;
  personId: InputMaybe<Scalars['ID']['input']>;
  recordingId: InputMaybe<Scalars['ID']['input']>;
  search: InputMaybe<Scalars['String']['input']>;
  seriesId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryMusicAlbumArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicAlbumsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryMusicBookTagsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMusicMoodTagsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMusicSeriesesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryMusicTrackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicTracksArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryNotificationChannelsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPageMenusArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPagesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<PagesOrder>>;
  pageMenuId: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonLetterCountsArgs = {
  language: Language;
};


export type QueryPersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<PersonsOrder>>;
  role: InputMaybe<PersonsRoleField>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
  withContentTypes: InputMaybe<Array<RecordingContentType>>;
};


export type QueryPopularPersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  role: InputMaybe<PersonsRoleField>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
  withContentTypes: InputMaybe<Array<RecordingContentType>>;
};


export type QueryPopularRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  contentType: InputMaybe<RecordingContentType>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryRecordingArgs = {
  allowArchived: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryRecordingScreeningIssueTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecordingScreeningIssueTypesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  contentType: InputMaybe<RecordingContentType>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QuerySequenceArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySequencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentType: InputMaybe<SequenceContentType>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QuerySeriesArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeriesesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QuerySermonArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySermonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QuerySponsorArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySponsorLetterCountsArgs = {
  language: Language;
};


export type QuerySponsorsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SponsorsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  startsWith: InputMaybe<Scalars['String']['input']>;
  withMusic: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryStoriesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryStoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStoryProgramArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStoryProgramsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryStorySeasonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStorySeasonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryTagsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<TagsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
};


export type QueryTestimoniesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<TestimoniesOrder>>;
};


export type QueryTestimonyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopicsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<TopicsOrder>>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasAnyRoles: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<UsersOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  withReadAccess: InputMaybe<UserLanguageEntityInput>;
  withRole: InputMaybe<UserLanguageRoleInput>;
};


export type QueryWebsiteRecentRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWebsitesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};

export type Recording = Node & UniformResourceLocatable & {
  __typename?: 'Recording';
  /** Requires `ADMINISTRATION` role. */
  archiveDate: Maybe<Scalars['DateTime']['output']>;
  /** Requires `ADMINISTRATION` role. */
  archiveReason: Maybe<Scalars['String']['output']>;
  /** Requires `ADMINISTRATION` role. */
  archiveUser: Maybe<User>;
  attachments: Array<Attachment>;
  audioFiles: Array<AudioFile>;
  bibleReferences: BibleReferenceRangeConnection;
  /** Whether the current viewer may archive the recording. */
  canArchive: Maybe<Scalars['Boolean']['output']>;
  /** Whether the current viewer may delete the recording. */
  canDelete: Maybe<Scalars['Boolean']['output']>;
  /** Whether the recording can be manually enqueued for transcribing. */
  canRequestTranscription: Maybe<Scalars['Boolean']['output']>;
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  collection: Maybe<Collection>;
  contentScreeningCheckouts: Maybe<Array<RecordingScreeningCheckout>>;
  contentScreeningEvaluations: Maybe<Array<RecordingContentScreeningEvaluation>>;
  contentScreeningStatus: Maybe<RecordingContentScreeningStatus>;
  contentType: RecordingContentType;
  copyrightYear: Maybe<Scalars['Int']['output']>;
  coverImage: Maybe<Image>;
  description: Maybe<Scalars['String']['output']>;
  distributionAgreement: Maybe<DistributionAgreement>;
  /** @deprecated Recording.downloadDisabled is replaced with Recording.isDownloadAllowed */
  downloadDisabled: Scalars['Boolean']['output'];
  /** The duration of the primary audio source in seconds. */
  duration: Scalars['Float']['output'];
  hasAudio: Scalars['Boolean']['output'];
  hasVideo: Scalars['Boolean']['output'];
  hidingReason: Maybe<Scalars['String']['output']>;
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  imageWithFallback: Image;
  isDownloadAllowed: Scalars['Boolean']['output'];
  isFeatured: Scalars['Boolean']['output'];
  /** Whether the recording has been hidden. `isHidden` being `false` does not indicate the recording is published. Use `stage` to determine published status. */
  isHidden: Scalars['Boolean']['output'];
  language: Language;
  legalScreeningCheckouts: Maybe<Array<RecordingScreeningCheckout>>;
  legalScreeningStatus: Maybe<RecordingLegalScreeningStatus>;
  mediaReleaseForm: Maybe<MediaReleaseForm>;
  persons: Array<Person>;
  publishDate: Maybe<Scalars['DateTime']['output']>;
  recordingDate: Maybe<Scalars['RelativeDateTime']['output']>;
  recordingTagSuggestions: RecordingTagSuggestionConnection;
  recordingTags: RecordingTagConnection;
  screeningIssues: Maybe<RecordingScreeningIssueConnection>;
  sequence: Maybe<Sequence>;
  /** The index of the recording within its sequence. */
  sequenceIndex: Maybe<Scalars['Int']['output']>;
  /** The next recording within this recording's sequence. */
  sequenceNextRecording: Maybe<Recording>;
  /** The previous recording within this recording's sequence. */
  sequencePreviousRecording: Maybe<Recording>;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  sponsor: Maybe<Sponsor>;
  stage: RecordingStage;
  technicalScreeningCheckouts: Maybe<Array<RecordingScreeningCheckout>>;
  technicalScreeningStatus: Maybe<RecordingTechnicalScreeningStatus>;
  title: Scalars['String']['output'];
  transcript: Maybe<Transcript>;
  transcriptionStatus: Maybe<RecordingTranscriptionStatus>;
  videoFiles: Array<VideoFile>;
  viewerHasFavorited: Scalars['Boolean']['output'];
  viewerPlaybackSession: Maybe<RecordingPlaybackSession>;
  websites: Array<Website>;
};


export type RecordingAttachmentsArgs = {
  allowedContainers: InputMaybe<Array<MediaFileContainer>>;
};


export type RecordingAudioFilesArgs = {
  allowedContainers: InputMaybe<Array<MediaFileContainer>>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
};


export type RecordingBibleReferencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type RecordingCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RecordingCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RecordingHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type RecordingPersonsArgs = {
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  role: InputMaybe<PersonsRoleField>;
};


export type RecordingRecordingTagSuggestionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type RecordingRecordingTagsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type RecordingScreeningIssuesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  category: InputMaybe<RecordingScreeningIssueCategory>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<RecordingScreeningIssueOrder>>;
};


export type RecordingVideoFilesArgs = {
  allowedContainers: InputMaybe<Array<MediaFileContainer>>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecordingConnection = {
  __typename?: 'RecordingConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<RecordingEdge>>;
  nodes: Maybe<Array<Recording>>;
  pageInfo: PageInfo;
};

export type RecordingContentScreeningEvaluation = {
  __typename?: 'RecordingContentScreeningEvaluation';
  /** The methods used in evaluating the recording. */
  methods: Array<RecordingScreeningMethod>;
  /** The screener's overall recommendation for the recording. */
  recommendation: RecordingContentScreeningEvaluationRecommendation;
  /** The screener user. */
  screener: User;
};

export type RecordingContentScreeningEvaluationPayload = {
  __typename?: 'RecordingContentScreeningEvaluationPayload';
  errors: Array<InputValidationError>;
  recordingContentScreeningEvaluation: Maybe<RecordingContentScreeningEvaluation>;
};

/** The content screening evaluation recommendations for a recording. */
export const RecordingContentScreeningEvaluationRecommendation = {
  Approve: 'APPROVE',
  NeedsEditing: 'NEEDS_EDITING',
  Pending: 'PENDING',
  Reject: 'REJECT'
} as const;

export type RecordingContentScreeningEvaluationRecommendation = typeof RecordingContentScreeningEvaluationRecommendation[keyof typeof RecordingContentScreeningEvaluationRecommendation];
/** The content screening statuses of a recording. */
export const RecordingContentScreeningStatus = {
  /** Approved by admin override */
  AdminOverride: 'ADMIN_OVERRIDE',
  /** Approved by screener consensus */
  Approved: 'APPROVED',
  /** Awaiting final authorization (Screener consensus) */
  ApprovedPendingAuthorization: 'APPROVED_PENDING_AUTHORIZATION',
  /** Awaiting screener consensus */
  PendingConsensus: 'PENDING_CONSENSUS',
  /** Awaiting more evaluations */
  PendingEvaluations: 'PENDING_EVALUATIONS',
  /** Awaiting re-evaluation */
  PendingReevaluation: 'PENDING_REEVALUATION',
  /** Approved by pre-approval */
  Preapproved: 'PREAPPROVED',
  /** Awaiting final authorization (Pre-approved) */
  PreapprovedPendingAuthorization: 'PREAPPROVED_PENDING_AUTHORIZATION',
  /** Rejected by screener consensus */
  Rejected: 'REJECTED',
  /** Screening not yet begun */
  Unevaluated: 'UNEVALUATED'
} as const;

export type RecordingContentScreeningStatus = typeof RecordingContentScreeningStatus[keyof typeof RecordingContentScreeningStatus];
/** The available types of recordings. */
export const RecordingContentType = {
  AudiobookTrack: 'AUDIOBOOK_TRACK',
  BibleChapter: 'BIBLE_CHAPTER',
  MusicTrack: 'MUSIC_TRACK',
  Sermon: 'SERMON',
  Story: 'STORY'
} as const;

export type RecordingContentType = typeof RecordingContentType[keyof typeof RecordingContentType];
export type RecordingCreateInput = {
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  contentScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
  contentType: RecordingContentType;
  copyrightYear: InputMaybe<Scalars['Int']['input']>;
  coverImage: InputMaybe<ImageInput>;
  description: InputMaybe<Scalars['String']['input']>;
  distributionAgreementId: Scalars['ID']['input'];
  hidingReason: InputMaybe<Scalars['String']['input']>;
  isDownloadAllowed: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
  /** Requires `ADMINISTRATION` role. */
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  recordingDate: InputMaybe<Scalars['RelativeDateTime']['input']>;
  recordingPersons: InputMaybe<Array<RecordingPersonRoleInput>>;
  recordingTags: InputMaybe<Array<RecordingTagInput>>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipTechnicalScreening: InputMaybe<Scalars['Boolean']['input']>;
  sponsorId: Scalars['ID']['input'];
  technicalScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
  title: Scalars['String']['input'];
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type RecordingEdge = {
  __typename?: 'RecordingEdge';
  cursor: Scalars['String']['output'];
  node: Recording;
};

/** The legal screening statuses of a recording. */
export const RecordingLegalScreeningStatus = {
  AdminOverride: 'ADMIN_OVERRIDE',
  Approved: 'APPROVED',
  Pending: 'PENDING',
  /** Awaiting re-evaluation */
  PendingReevaluation: 'PENDING_REEVALUATION',
  Preapproved: 'PREAPPROVED',
  Rejected: 'REJECTED',
  /** Not Yet Begun */
  Unevaluated: 'UNEVALUATED'
} as const;

export type RecordingLegalScreeningStatus = typeof RecordingLegalScreeningStatus[keyof typeof RecordingLegalScreeningStatus];
export type RecordingPayload = {
  __typename?: 'RecordingPayload';
  errors: Array<InputValidationError>;
  recording: Maybe<Recording>;
};

export type RecordingPersonInput = {
  /** The ID of a person associated with the recording. */
  personId: Scalars['ID']['input'];
  /** The role a person has with the recording. */
  role: InputMaybe<PersonsRoleField>;
};

export type RecordingPersonRoleInput = {
  /** The ID of a person associated with the recording. */
  personId: Scalars['ID']['input'];
  /** The role a person has with the recording. */
  role: PersonsRoleField;
};

export type RecordingPlaybackSession = {
  __typename?: 'RecordingPlaybackSession';
  createdAt: Scalars['DateTime']['output'];
  /** The playback position as a percentage of the recording duration. */
  positionPercentage: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** The playback session status for a recording. */
export const RecordingPlaybackSessionStatus = {
  /** The viewer has never started playing the recording. */
  Unstarted: 'UNSTARTED'
} as const;

export type RecordingPlaybackSessionStatus = typeof RecordingPlaybackSessionStatus[keyof typeof RecordingPlaybackSessionStatus];
/** The available bitrates of recordings. */
export const RecordingQuality = {
  Highest: 'HIGHEST',
  Low: 'LOW',
  Lowest: 'LOWEST'
} as const;

export type RecordingQuality = typeof RecordingQuality[keyof typeof RecordingQuality];
export type RecordingScreeningCheckout = {
  __typename?: 'RecordingScreeningCheckout';
  /** The user who assigned the screener. */
  assigner: User;
  createdAt: Scalars['DateTime']['output'];
  /** The screener user. */
  screener: User;
};

export type RecordingScreeningCheckoutInput = {
  userId: Scalars['ID']['input'];
};

export type RecordingScreeningCheckoutPayload = {
  __typename?: 'RecordingScreeningCheckoutPayload';
  errors: Array<InputValidationError>;
  recordingScreeningCheckout: Maybe<RecordingScreeningCheckout>;
};

/** The recording content screening view filters. */
export const RecordingScreeningContentViewFilter = {
  /** Limits recordings to those assigned to users other than the viewer. */
  AssignedNonViewer: 'ASSIGNED_NON_VIEWER',
  /** Limits recordings to those assigned to the viewer. */
  AssignedViewer: 'ASSIGNED_VIEWER',
  /** Limits to unassigned recordings. */
  Unassigned: 'UNASSIGNED'
} as const;

export type RecordingScreeningContentViewFilter = typeof RecordingScreeningContentViewFilter[keyof typeof RecordingScreeningContentViewFilter];
export type RecordingScreeningIssue = Node & {
  __typename?: 'RecordingScreeningIssue';
  /** In HH:mm:ss format. */
  endTime: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
  screener: User;
  /** In HH:mm:ss format. */
  startTime: Maybe<Scalars['String']['output']>;
  target: RecordingScreeningIssueTarget;
  type: RecordingScreeningIssueType;
};

/** The recording screening issue categories. */
export const RecordingScreeningIssueCategory = {
  /** General Issues */
  General: 'GENERAL',
  /** Spirit of AudioVerse */
  SpiritOfAudioverse: 'SPIRIT_OF_AUDIOVERSE',
  /** Technical Issues */
  Technical: 'TECHNICAL'
} as const;

export type RecordingScreeningIssueCategory = typeof RecordingScreeningIssueCategory[keyof typeof RecordingScreeningIssueCategory];
export type RecordingScreeningIssueConnection = {
  __typename?: 'RecordingScreeningIssueConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<RecordingScreeningIssueEdge>>;
  nodes: Maybe<Array<RecordingScreeningIssue>>;
  pageInfo: PageInfo;
};

export type RecordingScreeningIssueEdge = {
  __typename?: 'RecordingScreeningIssueEdge';
  cursor: Scalars['String']['output'];
  node: RecordingScreeningIssue;
};

export type RecordingScreeningIssueInput = {
  /** In HH:mm:ss format. */
  endTime: InputMaybe<Scalars['String']['input']>;
  notes: InputMaybe<Scalars['String']['input']>;
  recordingScreeningIssueTypeId: Scalars['ID']['input'];
  /** In HH:mm:ss format. */
  startTime: InputMaybe<Scalars['String']['input']>;
  target: RecordingScreeningIssueTarget;
};

export type RecordingScreeningIssueOrder = {
  direction: OrderByDirection;
  field: RecordingScreeningIssuesSortableField;
};

export type RecordingScreeningIssuePayload = {
  __typename?: 'RecordingScreeningIssuePayload';
  errors: Array<InputValidationError>;
  recordingScreeningIssue: Maybe<RecordingScreeningIssue>;
};

/** The applicable recording format for the screening issue. */
export const RecordingScreeningIssueTarget = {
  Audio: 'AUDIO',
  Video: 'VIDEO'
} as const;

export type RecordingScreeningIssueTarget = typeof RecordingScreeningIssueTarget[keyof typeof RecordingScreeningIssueTarget];
export type RecordingScreeningIssueType = Node & {
  __typename?: 'RecordingScreeningIssueType';
  category: RecordingScreeningIssueCategory;
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type RecordingScreeningIssueTypeConnection = {
  __typename?: 'RecordingScreeningIssueTypeConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<RecordingScreeningIssueTypeEdge>>;
  nodes: Maybe<Array<RecordingScreeningIssueType>>;
  pageInfo: PageInfo;
};

export type RecordingScreeningIssueTypeEdge = {
  __typename?: 'RecordingScreeningIssueTypeEdge';
  cursor: Scalars['String']['output'];
  node: RecordingScreeningIssueType;
};

/** Properties by which recording screening issue connections can be ordered. */
export const RecordingScreeningIssuesSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID'
} as const;

export type RecordingScreeningIssuesSortableField = typeof RecordingScreeningIssuesSortableField[keyof typeof RecordingScreeningIssuesSortableField];
/** The supported screening evaluation methods. */
export const RecordingScreeningMethod = {
  Live: 'LIVE',
  Recording: 'RECORDING',
  ThirdPartyInfo: 'THIRD_PARTY_INFO',
  Transcript: 'TRANSCRIPT'
} as const;

export type RecordingScreeningMethod = typeof RecordingScreeningMethod[keyof typeof RecordingScreeningMethod];
/** The stages a recording may be in. */
export const RecordingStage = {
  Draft: 'DRAFT',
  Published: 'PUBLISHED',
  Scheduling: 'SCHEDULING',
  Screening: 'SCREENING',
  Withdrawn: 'WITHDRAWN'
} as const;

export type RecordingStage = typeof RecordingStage[keyof typeof RecordingStage];
export type RecordingTag = {
  __typename?: 'RecordingTag';
  tag: Tag;
};

export type RecordingTagConnection = {
  __typename?: 'RecordingTagConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<RecordingTagEdge>>;
  nodes: Maybe<Array<RecordingTag>>;
  pageInfo: PageInfo;
};

export type RecordingTagEdge = {
  __typename?: 'RecordingTagEdge';
  cursor: Scalars['String']['output'];
  node: RecordingTag;
};

export type RecordingTagInput = {
  /** The name of a tag. */
  tagName: Scalars['String']['input'];
};

export type RecordingTagSuggestion = {
  __typename?: 'RecordingTagSuggestion';
  name: Scalars['String']['output'];
};

export type RecordingTagSuggestionConnection = {
  __typename?: 'RecordingTagSuggestionConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<RecordingTagSuggestionEdge>>;
  nodes: Maybe<Array<RecordingTagSuggestion>>;
  pageInfo: PageInfo;
};

export type RecordingTagSuggestionEdge = {
  __typename?: 'RecordingTagSuggestionEdge';
  cursor: Scalars['String']['output'];
  node: RecordingTagSuggestion;
};

/** The technical screening statuses of a recording. */
export const RecordingTechnicalScreeningStatus = {
  AdminOverride: 'ADMIN_OVERRIDE',
  Approved: 'APPROVED',
  Pending: 'PENDING',
  /** Awaiting re-evaluation */
  PendingReevaluation: 'PENDING_REEVALUATION',
  Rejected: 'REJECTED',
  /** Not Yet Begun */
  Unevaluated: 'UNEVALUATED'
} as const;

export type RecordingTechnicalScreeningStatus = typeof RecordingTechnicalScreeningStatus[keyof typeof RecordingTechnicalScreeningStatus];
/** The status of a recording's transcript. */
export const RecordingTranscriptionStatus = {
  /** Transcription completed. */
  Complete: 'COMPLETE',
  /** Transcription failed. */
  Failed: 'FAILED',
  /** Transcription in process. */
  Processing: 'PROCESSING',
  /** Transcription has been requested. */
  Requested: 'REQUESTED',
  /** Not Yet Begun */
  Unstarted: 'UNSTARTED'
} as const;

export type RecordingTranscriptionStatus = typeof RecordingTranscriptionStatus[keyof typeof RecordingTranscriptionStatus];
export type RecordingUpdateInput = {
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  contentScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
  copyrightYear: InputMaybe<Scalars['Int']['input']>;
  coverImage: InputMaybe<ImageInput>;
  description: InputMaybe<Scalars['String']['input']>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  isDownloadAllowed: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
  /** Requires `ADMINISTRATION` role. */
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  recordingDate: InputMaybe<Scalars['RelativeDateTime']['input']>;
  recordingPersons: InputMaybe<Array<RecordingPersonRoleInput>>;
  recordingTags: InputMaybe<Array<RecordingTagInput>>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipTechnicalScreening: InputMaybe<Scalars['Boolean']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  technicalScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
  title: InputMaybe<Scalars['String']['input']>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Whether a viewer has played a recording or sequence. */
export const RecordingViewerPlaybackStatus = {
  Finished: 'FINISHED',
  Started: 'STARTED',
  Unstarted: 'UNSTARTED'
} as const;

export type RecordingViewerPlaybackStatus = typeof RecordingViewerPlaybackStatus[keyof typeof RecordingViewerPlaybackStatus];
export type RecordingsOrder = {
  direction: OrderByDirection;
  field: RecordingsSortableField;
};

/** Properties by which recording connections can be ordered. */
export const RecordingsSortableField = {
  CollectionTitle: 'COLLECTION_TITLE',
  CreatedAt: 'CREATED_AT',
  DownloadsAllTime: 'DOWNLOADS_ALL_TIME',
  Id: 'ID',
  PublishedAt: 'PUBLISHED_AT',
  RecordedAt: 'RECORDED_AT',
  SequenceTitle: 'SEQUENCE_TITLE',
  SponsorTitle: 'SPONSOR_TITLE',
  Title: 'TITLE',
  UpdatedAt: 'UPDATED_AT'
} as const;

export type RecordingsSortableField = typeof RecordingsSortableField[keyof typeof RecordingsSortableField];
export type Sequence = Node & UniformResourceLocatable & {
  __typename?: 'Sequence';
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  collection: Maybe<Collection>;
  contentType: SequenceContentType;
  description: Scalars['String']['output'];
  /** The combined duration of the sequence's recordings in seconds. */
  duration: Scalars['Float']['output'];
  endDate: Maybe<Scalars['Date']['output']>;
  hidingReason: Maybe<Scalars['String']['output']>;
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  image: Maybe<Image>;
  imageWithFallback: Image;
  isHidden: Maybe<Scalars['Boolean']['output']>;
  language: Language;
  /** @deprecated Sequence.logoImage is replaced with Sequence.image */
  logoImage: Maybe<Image>;
  /** @deprecated Sequence.logoImageWithFallback is replaced with Sequence.imageWithFallback */
  logoImageWithFallback: Image;
  mediaReleaseForm: Maybe<MediaReleaseForm>;
  persons: PersonConnection;
  recordings: RecordingConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: Maybe<Scalars['Boolean']['output']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: Maybe<Scalars['Boolean']['output']>;
  sponsor: Maybe<Sponsor>;
  startDate: Maybe<Scalars['Date']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  viewerHasFavorited: Scalars['Boolean']['output'];
  /** The percentage of the associated recordings the viewer has finished playing. */
  viewerPlaybackCompletedPercentage: Scalars['Float']['output'];
};


export type SequenceCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SequenceCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SequenceHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type SequencePersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<PersonsOrder>>;
  role: InputMaybe<PersonsRoleField>;
  search: InputMaybe<Scalars['String']['input']>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};


export type SequenceRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type SequenceConnection = {
  __typename?: 'SequenceConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<SequenceEdge>>;
  nodes: Maybe<Array<Sequence>>;
  pageInfo: PageInfo;
};

/** The available types of sequence. */
export const SequenceContentType = {
  Audiobook: 'AUDIOBOOK',
  BibleBook: 'BIBLE_BOOK',
  MusicAlbum: 'MUSIC_ALBUM',
  Series: 'SERIES',
  StorySeason: 'STORY_SEASON'
} as const;

export type SequenceContentType = typeof SequenceContentType[keyof typeof SequenceContentType];
export type SequenceCreateInput = {
  collectionId: InputMaybe<Scalars['ID']['input']>;
  contentType: SequenceContentType;
  description: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  sponsorId: Scalars['ID']['input'];
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type SequenceEdge = {
  __typename?: 'SequenceEdge';
  cursor: Scalars['String']['output'];
  node: Sequence;
};

export type SequenceOrder = {
  direction: OrderByDirection;
  field: SequenceSortableField;
};

export type SequencePayload = {
  __typename?: 'SequencePayload';
  errors: Array<InputValidationError>;
  sequence: Maybe<Sequence>;
};

/** Properties by which sequence connections can be ordered. */
export const SequenceSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  RecordingCount: 'RECORDING_COUNT',
  RecordingPublishedAt: 'RECORDING_PUBLISHED_AT',
  Title: 'TITLE'
} as const;

export type SequenceSortableField = typeof SequenceSortableField[keyof typeof SequenceSortableField];
export type SequenceUpdateInput = {
  collectionId: InputMaybe<Scalars['ID']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type Sponsor = Node & UniformResourceLocatable & {
  __typename?: 'Sponsor';
  address: Maybe<Scalars['String']['output']>;
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  collections: CollectionConnection;
  defaultDistributionAgreement: Maybe<DistributionAgreement>;
  description: Scalars['String']['output'];
  distributionAgreements: Maybe<DistributionAgreementConnection>;
  email: Maybe<Scalars['String']['output']>;
  hidingReason: Maybe<Scalars['String']['output']>;
  history: Maybe<CatalogHistoryItemConnection>;
  id: Scalars['ID']['output'];
  image: Maybe<Image>;
  imageWithFallback: Image;
  internalContact: Maybe<InternalContact>;
  isHidden: Scalars['Boolean']['output'];
  language: Language;
  location: Maybe<Scalars['String']['output']>;
  /** @deprecated Sponsor.logoImage is replaced with Sponsor.image */
  logoImage: Maybe<Image>;
  /** @deprecated Sponsor.logoImageWithFallback is replaced with Sponsor.imageWithFallback */
  logoImageWithFallback: Image;
  mediaReleaseForm: Maybe<MediaReleaseForm>;
  phone: Maybe<Scalars['String']['output']>;
  recordings: RecordingConnection;
  sequences: SequenceConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: Maybe<Scalars['Boolean']['output']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: Maybe<Scalars['Boolean']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  viewerHasFavorited: Scalars['Boolean']['output'];
  website: Maybe<Scalars['URL']['output']>;
};


export type SponsorCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SponsorCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SponsorCollectionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  contentType: InputMaybe<CollectionContentType>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CollectionsOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type SponsorDistributionAgreementsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isRetired: InputMaybe<Scalars['Boolean']['input']>;
  licenseId: InputMaybe<Scalars['ID']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DistributionAgreementsOrder>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type SponsorHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type SponsorRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  contentType: InputMaybe<RecordingContentType>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type SponsorSequencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentType?: InputMaybe<SequenceContentType>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<SequenceOrder>>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  search: InputMaybe<Scalars['String']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type SponsorConnection = {
  __typename?: 'SponsorConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<SponsorEdge>>;
  nodes: Maybe<Array<Sponsor>>;
  pageInfo: PageInfo;
};

export type SponsorCreateInput = {
  address: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  distributionAgreements: InputMaybe<Array<SponsorDistributionAgreementInput>>;
  email: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  internalContact: InputMaybe<InternalContactInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  location: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  website: InputMaybe<Scalars['URL']['input']>;
};

export type SponsorDistributionAgreementInput = {
  isDefault: InputMaybe<Scalars['Boolean']['input']>;
  isRetired: InputMaybe<Scalars['Boolean']['input']>;
  licenseId: Scalars['ID']['input'];
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type SponsorEdge = {
  __typename?: 'SponsorEdge';
  cursor: Scalars['String']['output'];
  node: Sponsor;
};

export type SponsorPayload = {
  __typename?: 'SponsorPayload';
  errors: Array<InputValidationError>;
  sponsor: Maybe<Sponsor>;
};

export type SponsorUpdateInput = {
  address: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  distributionAgreements: InputMaybe<Array<SponsorDistributionAgreementInput>>;
  email: InputMaybe<Scalars['String']['input']>;
  hidingReason: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<ImageInput>;
  internalContact: InputMaybe<InternalContactInput>;
  isHidden: InputMaybe<Scalars['Boolean']['input']>;
  location: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipContentScreening: InputMaybe<Scalars['Boolean']['input']>;
  /** Requires `ADMINISTRATION` role. */
  skipLegalScreening: InputMaybe<Scalars['Boolean']['input']>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  website: InputMaybe<Scalars['URL']['input']>;
};

export type SponsorsOrder = {
  direction: OrderByDirection;
  field: SponsorsSortableField;
};

/** Properties by which sponsor connections can be ordered. */
export const SponsorsSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  RecordingCount: 'RECORDING_COUNT',
  RecordingPublishedAt: 'RECORDING_PUBLISHED_AT',
  Title: 'TITLE'
} as const;

export type SponsorsSortableField = typeof SponsorsSortableField[keyof typeof SponsorsSortableField];
export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  errors: Array<InputValidationError>;
  success: Scalars['Boolean']['output'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  recordings: RecordingConnection;
};


export type TagRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  contentType: InputMaybe<RecordingContentType>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<TagEdge>>;
  nodes: Maybe<Array<Tag>>;
  pageInfo: PageInfo;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type TagsOrder = {
  direction: OrderByDirection;
  field: TagsSortableField;
};

/** Properties by which tags connections can be ordered. */
export const TagsSortableField = {
  Name: 'NAME',
  RecordingCount: 'RECORDING_COUNT',
  SermonCount: 'SERMON_COUNT'
} as const;

export type TagsSortableField = typeof TagsSortableField[keyof typeof TagsSortableField];
export type TestimoniesOrder = {
  direction: OrderByDirection;
  field: TestimoniesSortableField;
};

/** Properties by which testimony connections can be ordered. */
export const TestimoniesSortableField = {
  WrittenDate: 'WRITTEN_DATE'
} as const;

export type TestimoniesSortableField = typeof TestimoniesSortableField[keyof typeof TestimoniesSortableField];
/** A user testimony. */
export type Testimony = Node & {
  __typename?: 'Testimony';
  author: Scalars['String']['output'];
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publishDate: Scalars['DateTime']['output'];
  writtenDate: Scalars['DateTime']['output'];
};

export type TestimonyConnection = {
  __typename?: 'TestimonyConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<TestimonyEdge>>;
  nodes: Maybe<Array<Testimony>>;
  pageInfo: PageInfo;
};

export type TestimonyCreateInput = {
  author: Scalars['String']['input'];
  body: Scalars['String']['input'];
  language: Language;
  publishDate: Scalars['DateTime']['input'];
  writtenDate: Scalars['DateTime']['input'];
};

export type TestimonyEdge = {
  __typename?: 'TestimonyEdge';
  cursor: Scalars['String']['output'];
  node: Testimony;
};

export type TestimonyPayload = {
  __typename?: 'TestimonyPayload';
  errors: Array<InputValidationError>;
  testimony: Maybe<Testimony>;
};

export type TestimonyUpdateInput = {
  author: InputMaybe<Scalars['String']['input']>;
  body: InputMaybe<Scalars['String']['input']>;
  publishDate: InputMaybe<Scalars['DateTime']['input']>;
  writtenDate: InputMaybe<Scalars['DateTime']['input']>;
};

/** The supported timezones. */
export const Timezone = {
  AfricaAbidjan: 'AFRICA_ABIDJAN',
  AfricaAccra: 'AFRICA_ACCRA',
  AfricaAddisAbaba: 'AFRICA_ADDIS_ABABA',
  AfricaAlgiers: 'AFRICA_ALGIERS',
  AfricaAsmara: 'AFRICA_ASMARA',
  AfricaAsmera: 'AFRICA_ASMERA',
  AfricaBamako: 'AFRICA_BAMAKO',
  AfricaBangui: 'AFRICA_BANGUI',
  AfricaBanjul: 'AFRICA_BANJUL',
  AfricaBissau: 'AFRICA_BISSAU',
  AfricaBlantyre: 'AFRICA_BLANTYRE',
  AfricaBrazzaville: 'AFRICA_BRAZZAVILLE',
  AfricaBujumbura: 'AFRICA_BUJUMBURA',
  AfricaCairo: 'AFRICA_CAIRO',
  AfricaCasablanca: 'AFRICA_CASABLANCA',
  AfricaCeuta: 'AFRICA_CEUTA',
  AfricaConakry: 'AFRICA_CONAKRY',
  AfricaDakar: 'AFRICA_DAKAR',
  AfricaDarEsSalaam: 'AFRICA_DAR_ES_SALAAM',
  AfricaDjibouti: 'AFRICA_DJIBOUTI',
  AfricaDouala: 'AFRICA_DOUALA',
  AfricaElAaiun: 'AFRICA_EL_AAIUN',
  AfricaFreetown: 'AFRICA_FREETOWN',
  AfricaGaborone: 'AFRICA_GABORONE',
  AfricaHarare: 'AFRICA_HARARE',
  AfricaJohannesburg: 'AFRICA_JOHANNESBURG',
  AfricaJuba: 'AFRICA_JUBA',
  AfricaKampala: 'AFRICA_KAMPALA',
  AfricaKhartoum: 'AFRICA_KHARTOUM',
  AfricaKigali: 'AFRICA_KIGALI',
  AfricaKinshasa: 'AFRICA_KINSHASA',
  AfricaLagos: 'AFRICA_LAGOS',
  AfricaLibreville: 'AFRICA_LIBREVILLE',
  AfricaLome: 'AFRICA_LOME',
  AfricaLuanda: 'AFRICA_LUANDA',
  AfricaLubumbashi: 'AFRICA_LUBUMBASHI',
  AfricaLusaka: 'AFRICA_LUSAKA',
  AfricaMalabo: 'AFRICA_MALABO',
  AfricaMaputo: 'AFRICA_MAPUTO',
  AfricaMaseru: 'AFRICA_MASERU',
  AfricaMbabane: 'AFRICA_MBABANE',
  AfricaMogadishu: 'AFRICA_MOGADISHU',
  AfricaMonrovia: 'AFRICA_MONROVIA',
  AfricaNairobi: 'AFRICA_NAIROBI',
  AfricaNdjamena: 'AFRICA_NDJAMENA',
  AfricaNiamey: 'AFRICA_NIAMEY',
  AfricaNouakchott: 'AFRICA_NOUAKCHOTT',
  AfricaOuagadougou: 'AFRICA_OUAGADOUGOU',
  AfricaPortoNovo: 'AFRICA_PORTO_NOVO',
  AfricaSaoTome: 'AFRICA_SAO_TOME',
  AfricaTimbuktu: 'AFRICA_TIMBUKTU',
  AfricaTripoli: 'AFRICA_TRIPOLI',
  AfricaTunis: 'AFRICA_TUNIS',
  AfricaWindhoek: 'AFRICA_WINDHOEK',
  AmericaAdak: 'AMERICA_ADAK',
  AmericaAnchorage: 'AMERICA_ANCHORAGE',
  AmericaAnguilla: 'AMERICA_ANGUILLA',
  AmericaAntigua: 'AMERICA_ANTIGUA',
  AmericaAraguaina: 'AMERICA_ARAGUAINA',
  AmericaArgentinaBuenosAires: 'AMERICA_ARGENTINA_BUENOS_AIRES',
  AmericaArgentinaCatamarca: 'AMERICA_ARGENTINA_CATAMARCA',
  AmericaArgentinaComodrivadavia: 'AMERICA_ARGENTINA_COMODRIVADAVIA',
  AmericaArgentinaCordoba: 'AMERICA_ARGENTINA_CORDOBA',
  AmericaArgentinaJujuy: 'AMERICA_ARGENTINA_JUJUY',
  AmericaArgentinaLaRioja: 'AMERICA_ARGENTINA_LA_RIOJA',
  AmericaArgentinaMendoza: 'AMERICA_ARGENTINA_MENDOZA',
  AmericaArgentinaRioGallegos: 'AMERICA_ARGENTINA_RIO_GALLEGOS',
  AmericaArgentinaSalta: 'AMERICA_ARGENTINA_SALTA',
  AmericaArgentinaSanJuan: 'AMERICA_ARGENTINA_SAN_JUAN',
  AmericaArgentinaSanLuis: 'AMERICA_ARGENTINA_SAN_LUIS',
  AmericaArgentinaTucuman: 'AMERICA_ARGENTINA_TUCUMAN',
  AmericaArgentinaUshuaia: 'AMERICA_ARGENTINA_USHUAIA',
  AmericaAruba: 'AMERICA_ARUBA',
  AmericaAsuncion: 'AMERICA_ASUNCION',
  AmericaAtikokan: 'AMERICA_ATIKOKAN',
  AmericaAtka: 'AMERICA_ATKA',
  AmericaBahia: 'AMERICA_BAHIA',
  AmericaBahiaBanderas: 'AMERICA_BAHIA_BANDERAS',
  AmericaBarbados: 'AMERICA_BARBADOS',
  AmericaBelem: 'AMERICA_BELEM',
  AmericaBelize: 'AMERICA_BELIZE',
  AmericaBlancSablon: 'AMERICA_BLANC_SABLON',
  AmericaBoaVista: 'AMERICA_BOA_VISTA',
  AmericaBogota: 'AMERICA_BOGOTA',
  AmericaBoise: 'AMERICA_BOISE',
  AmericaBuenosAires: 'AMERICA_BUENOS_AIRES',
  AmericaCambridgeBay: 'AMERICA_CAMBRIDGE_BAY',
  AmericaCampoGrande: 'AMERICA_CAMPO_GRANDE',
  AmericaCancun: 'AMERICA_CANCUN',
  AmericaCaracas: 'AMERICA_CARACAS',
  AmericaCatamarca: 'AMERICA_CATAMARCA',
  AmericaCayenne: 'AMERICA_CAYENNE',
  AmericaCayman: 'AMERICA_CAYMAN',
  AmericaChicago: 'AMERICA_CHICAGO',
  AmericaChihuahua: 'AMERICA_CHIHUAHUA',
  AmericaCoralHarbour: 'AMERICA_CORAL_HARBOUR',
  AmericaCordoba: 'AMERICA_CORDOBA',
  AmericaCostaRica: 'AMERICA_COSTA_RICA',
  AmericaCreston: 'AMERICA_CRESTON',
  AmericaCuiaba: 'AMERICA_CUIABA',
  AmericaCuracao: 'AMERICA_CURACAO',
  AmericaDanmarkshavn: 'AMERICA_DANMARKSHAVN',
  AmericaDawson: 'AMERICA_DAWSON',
  AmericaDawsonCreek: 'AMERICA_DAWSON_CREEK',
  AmericaDenver: 'AMERICA_DENVER',
  AmericaDetroit: 'AMERICA_DETROIT',
  AmericaDominica: 'AMERICA_DOMINICA',
  AmericaEdmonton: 'AMERICA_EDMONTON',
  AmericaEirunepe: 'AMERICA_EIRUNEPE',
  AmericaElSalvador: 'AMERICA_EL_SALVADOR',
  AmericaEnsenada: 'AMERICA_ENSENADA',
  AmericaFortaleza: 'AMERICA_FORTALEZA',
  AmericaFortNelson: 'AMERICA_FORT_NELSON',
  AmericaFortWayne: 'AMERICA_FORT_WAYNE',
  AmericaGlaceBay: 'AMERICA_GLACE_BAY',
  AmericaGodthab: 'AMERICA_GODTHAB',
  AmericaGooseBay: 'AMERICA_GOOSE_BAY',
  AmericaGrandTurk: 'AMERICA_GRAND_TURK',
  AmericaGrenada: 'AMERICA_GRENADA',
  AmericaGuadeloupe: 'AMERICA_GUADELOUPE',
  AmericaGuatemala: 'AMERICA_GUATEMALA',
  AmericaGuayaquil: 'AMERICA_GUAYAQUIL',
  AmericaGuyana: 'AMERICA_GUYANA',
  AmericaHalifax: 'AMERICA_HALIFAX',
  AmericaHavana: 'AMERICA_HAVANA',
  AmericaHermosillo: 'AMERICA_HERMOSILLO',
  AmericaIndianapolis: 'AMERICA_INDIANAPOLIS',
  AmericaIndianaIndianapolis: 'AMERICA_INDIANA_INDIANAPOLIS',
  AmericaIndianaKnox: 'AMERICA_INDIANA_KNOX',
  AmericaIndianaMarengo: 'AMERICA_INDIANA_MARENGO',
  AmericaIndianaPetersburg: 'AMERICA_INDIANA_PETERSBURG',
  AmericaIndianaTellCity: 'AMERICA_INDIANA_TELL_CITY',
  AmericaIndianaVevay: 'AMERICA_INDIANA_VEVAY',
  AmericaIndianaVincennes: 'AMERICA_INDIANA_VINCENNES',
  AmericaIndianaWinamac: 'AMERICA_INDIANA_WINAMAC',
  AmericaInuvik: 'AMERICA_INUVIK',
  AmericaIqaluit: 'AMERICA_IQALUIT',
  AmericaJamaica: 'AMERICA_JAMAICA',
  AmericaJujuy: 'AMERICA_JUJUY',
  AmericaJuneau: 'AMERICA_JUNEAU',
  AmericaKentuckyLouisville: 'AMERICA_KENTUCKY_LOUISVILLE',
  AmericaKentuckyMonticello: 'AMERICA_KENTUCKY_MONTICELLO',
  AmericaKnoxIn: 'AMERICA_KNOX_IN',
  AmericaKralendijk: 'AMERICA_KRALENDIJK',
  AmericaLaPaz: 'AMERICA_LA_PAZ',
  AmericaLima: 'AMERICA_LIMA',
  AmericaLosAngeles: 'AMERICA_LOS_ANGELES',
  AmericaLouisville: 'AMERICA_LOUISVILLE',
  AmericaLowerPrinces: 'AMERICA_LOWER_PRINCES',
  AmericaMaceio: 'AMERICA_MACEIO',
  AmericaManagua: 'AMERICA_MANAGUA',
  AmericaManaus: 'AMERICA_MANAUS',
  AmericaMarigot: 'AMERICA_MARIGOT',
  AmericaMartinique: 'AMERICA_MARTINIQUE',
  AmericaMatamoros: 'AMERICA_MATAMOROS',
  AmericaMazatlan: 'AMERICA_MAZATLAN',
  AmericaMendoza: 'AMERICA_MENDOZA',
  AmericaMenominee: 'AMERICA_MENOMINEE',
  AmericaMerida: 'AMERICA_MERIDA',
  AmericaMetlakatla: 'AMERICA_METLAKATLA',
  AmericaMexicoCity: 'AMERICA_MEXICO_CITY',
  AmericaMiquelon: 'AMERICA_MIQUELON',
  AmericaMoncton: 'AMERICA_MONCTON',
  AmericaMonterrey: 'AMERICA_MONTERREY',
  AmericaMontevideo: 'AMERICA_MONTEVIDEO',
  AmericaMontreal: 'AMERICA_MONTREAL',
  AmericaMontserrat: 'AMERICA_MONTSERRAT',
  AmericaNassau: 'AMERICA_NASSAU',
  AmericaNewYork: 'AMERICA_NEW_YORK',
  AmericaNipigon: 'AMERICA_NIPIGON',
  AmericaNome: 'AMERICA_NOME',
  AmericaNoronha: 'AMERICA_NORONHA',
  AmericaNorthDakotaBeulah: 'AMERICA_NORTH_DAKOTA_BEULAH',
  AmericaNorthDakotaCenter: 'AMERICA_NORTH_DAKOTA_CENTER',
  AmericaNorthDakotaNewSalem: 'AMERICA_NORTH_DAKOTA_NEW_SALEM',
  AmericaNuuk: 'AMERICA_NUUK',
  AmericaOjinaga: 'AMERICA_OJINAGA',
  AmericaPanama: 'AMERICA_PANAMA',
  AmericaPangnirtung: 'AMERICA_PANGNIRTUNG',
  AmericaParamaribo: 'AMERICA_PARAMARIBO',
  AmericaPhoenix: 'AMERICA_PHOENIX',
  AmericaPortoAcre: 'AMERICA_PORTO_ACRE',
  AmericaPortoVelho: 'AMERICA_PORTO_VELHO',
  AmericaPortAuPrince: 'AMERICA_PORT_AU_PRINCE',
  AmericaPortOfSpain: 'AMERICA_PORT_OF_SPAIN',
  AmericaPuertoRico: 'AMERICA_PUERTO_RICO',
  AmericaPuntaArenas: 'AMERICA_PUNTA_ARENAS',
  AmericaRainyRiver: 'AMERICA_RAINY_RIVER',
  AmericaRankinInlet: 'AMERICA_RANKIN_INLET',
  AmericaRecife: 'AMERICA_RECIFE',
  AmericaRegina: 'AMERICA_REGINA',
  AmericaResolute: 'AMERICA_RESOLUTE',
  AmericaRioBranco: 'AMERICA_RIO_BRANCO',
  AmericaRosario: 'AMERICA_ROSARIO',
  AmericaSantarem: 'AMERICA_SANTAREM',
  AmericaSantaIsabel: 'AMERICA_SANTA_ISABEL',
  AmericaSantiago: 'AMERICA_SANTIAGO',
  AmericaSantoDomingo: 'AMERICA_SANTO_DOMINGO',
  AmericaSaoPaulo: 'AMERICA_SAO_PAULO',
  AmericaScoresbysund: 'AMERICA_SCORESBYSUND',
  AmericaShiprock: 'AMERICA_SHIPROCK',
  AmericaSitka: 'AMERICA_SITKA',
  AmericaStBarthelemy: 'AMERICA_ST_BARTHELEMY',
  AmericaStJohns: 'AMERICA_ST_JOHNS',
  AmericaStKitts: 'AMERICA_ST_KITTS',
  AmericaStLucia: 'AMERICA_ST_LUCIA',
  AmericaStThomas: 'AMERICA_ST_THOMAS',
  AmericaStVincent: 'AMERICA_ST_VINCENT',
  AmericaSwiftCurrent: 'AMERICA_SWIFT_CURRENT',
  AmericaTegucigalpa: 'AMERICA_TEGUCIGALPA',
  AmericaThule: 'AMERICA_THULE',
  AmericaThunderBay: 'AMERICA_THUNDER_BAY',
  AmericaTijuana: 'AMERICA_TIJUANA',
  AmericaToronto: 'AMERICA_TORONTO',
  AmericaTortola: 'AMERICA_TORTOLA',
  AmericaVancouver: 'AMERICA_VANCOUVER',
  AmericaVirgin: 'AMERICA_VIRGIN',
  AmericaWhitehorse: 'AMERICA_WHITEHORSE',
  AmericaWinnipeg: 'AMERICA_WINNIPEG',
  AmericaYakutat: 'AMERICA_YAKUTAT',
  AmericaYellowknife: 'AMERICA_YELLOWKNIFE',
  AntarcticaCasey: 'ANTARCTICA_CASEY',
  AntarcticaDavis: 'ANTARCTICA_DAVIS',
  AntarcticaDumontdurville: 'ANTARCTICA_DUMONTDURVILLE',
  AntarcticaMacquarie: 'ANTARCTICA_MACQUARIE',
  AntarcticaMawson: 'ANTARCTICA_MAWSON',
  AntarcticaMcmurdo: 'ANTARCTICA_MCMURDO',
  AntarcticaPalmer: 'ANTARCTICA_PALMER',
  AntarcticaRothera: 'ANTARCTICA_ROTHERA',
  AntarcticaSouthPole: 'ANTARCTICA_SOUTH_POLE',
  AntarcticaSyowa: 'ANTARCTICA_SYOWA',
  AntarcticaTroll: 'ANTARCTICA_TROLL',
  AntarcticaVostok: 'ANTARCTICA_VOSTOK',
  ArcticLongyearbyen: 'ARCTIC_LONGYEARBYEN',
  AsiaAden: 'ASIA_ADEN',
  AsiaAlmaty: 'ASIA_ALMATY',
  AsiaAmman: 'ASIA_AMMAN',
  AsiaAnadyr: 'ASIA_ANADYR',
  AsiaAqtau: 'ASIA_AQTAU',
  AsiaAqtobe: 'ASIA_AQTOBE',
  AsiaAshgabat: 'ASIA_ASHGABAT',
  AsiaAshkhabad: 'ASIA_ASHKHABAD',
  AsiaAtyrau: 'ASIA_ATYRAU',
  AsiaBaghdad: 'ASIA_BAGHDAD',
  AsiaBahrain: 'ASIA_BAHRAIN',
  AsiaBaku: 'ASIA_BAKU',
  AsiaBangkok: 'ASIA_BANGKOK',
  AsiaBarnaul: 'ASIA_BARNAUL',
  AsiaBeirut: 'ASIA_BEIRUT',
  AsiaBishkek: 'ASIA_BISHKEK',
  AsiaBrunei: 'ASIA_BRUNEI',
  AsiaCalcutta: 'ASIA_CALCUTTA',
  AsiaChita: 'ASIA_CHITA',
  AsiaChoibalsan: 'ASIA_CHOIBALSAN',
  AsiaChongqing: 'ASIA_CHONGQING',
  AsiaChungking: 'ASIA_CHUNGKING',
  AsiaColombo: 'ASIA_COLOMBO',
  AsiaDacca: 'ASIA_DACCA',
  AsiaDamascus: 'ASIA_DAMASCUS',
  AsiaDhaka: 'ASIA_DHAKA',
  AsiaDili: 'ASIA_DILI',
  AsiaDubai: 'ASIA_DUBAI',
  AsiaDushanbe: 'ASIA_DUSHANBE',
  AsiaFamagusta: 'ASIA_FAMAGUSTA',
  AsiaGaza: 'ASIA_GAZA',
  AsiaHarbin: 'ASIA_HARBIN',
  AsiaHebron: 'ASIA_HEBRON',
  AsiaHongKong: 'ASIA_HONG_KONG',
  AsiaHovd: 'ASIA_HOVD',
  AsiaHoChiMinh: 'ASIA_HO_CHI_MINH',
  AsiaIrkutsk: 'ASIA_IRKUTSK',
  AsiaIstanbul: 'ASIA_ISTANBUL',
  AsiaJakarta: 'ASIA_JAKARTA',
  AsiaJayapura: 'ASIA_JAYAPURA',
  AsiaJerusalem: 'ASIA_JERUSALEM',
  AsiaKabul: 'ASIA_KABUL',
  AsiaKamchatka: 'ASIA_KAMCHATKA',
  AsiaKarachi: 'ASIA_KARACHI',
  AsiaKashgar: 'ASIA_KASHGAR',
  AsiaKathmandu: 'ASIA_KATHMANDU',
  AsiaKatmandu: 'ASIA_KATMANDU',
  AsiaKhandyga: 'ASIA_KHANDYGA',
  AsiaKolkata: 'ASIA_KOLKATA',
  AsiaKrasnoyarsk: 'ASIA_KRASNOYARSK',
  AsiaKualaLumpur: 'ASIA_KUALA_LUMPUR',
  AsiaKuching: 'ASIA_KUCHING',
  AsiaKuwait: 'ASIA_KUWAIT',
  AsiaMacao: 'ASIA_MACAO',
  AsiaMacau: 'ASIA_MACAU',
  AsiaMagadan: 'ASIA_MAGADAN',
  AsiaMakassar: 'ASIA_MAKASSAR',
  AsiaManila: 'ASIA_MANILA',
  AsiaMuscat: 'ASIA_MUSCAT',
  AsiaNicosia: 'ASIA_NICOSIA',
  AsiaNovokuznetsk: 'ASIA_NOVOKUZNETSK',
  AsiaNovosibirsk: 'ASIA_NOVOSIBIRSK',
  AsiaOmsk: 'ASIA_OMSK',
  AsiaOral: 'ASIA_ORAL',
  AsiaPhnomPenh: 'ASIA_PHNOM_PENH',
  AsiaPontianak: 'ASIA_PONTIANAK',
  AsiaPyongyang: 'ASIA_PYONGYANG',
  AsiaQatar: 'ASIA_QATAR',
  AsiaQostanay: 'ASIA_QOSTANAY',
  AsiaQyzylorda: 'ASIA_QYZYLORDA',
  AsiaRangoon: 'ASIA_RANGOON',
  AsiaRiyadh: 'ASIA_RIYADH',
  AsiaSaigon: 'ASIA_SAIGON',
  AsiaSakhalin: 'ASIA_SAKHALIN',
  AsiaSamarkand: 'ASIA_SAMARKAND',
  AsiaSeoul: 'ASIA_SEOUL',
  AsiaShanghai: 'ASIA_SHANGHAI',
  AsiaSingapore: 'ASIA_SINGAPORE',
  AsiaSrednekolymsk: 'ASIA_SREDNEKOLYMSK',
  AsiaTaipei: 'ASIA_TAIPEI',
  AsiaTashkent: 'ASIA_TASHKENT',
  AsiaTbilisi: 'ASIA_TBILISI',
  AsiaTehran: 'ASIA_TEHRAN',
  AsiaTelAviv: 'ASIA_TEL_AVIV',
  AsiaThimbu: 'ASIA_THIMBU',
  AsiaThimphu: 'ASIA_THIMPHU',
  AsiaTokyo: 'ASIA_TOKYO',
  AsiaTomsk: 'ASIA_TOMSK',
  AsiaUjungPandang: 'ASIA_UJUNG_PANDANG',
  AsiaUlaanbaatar: 'ASIA_ULAANBAATAR',
  AsiaUlanBator: 'ASIA_ULAN_BATOR',
  AsiaUrumqi: 'ASIA_URUMQI',
  AsiaUstNera: 'ASIA_UST_NERA',
  AsiaVientiane: 'ASIA_VIENTIANE',
  AsiaVladivostok: 'ASIA_VLADIVOSTOK',
  AsiaYakutsk: 'ASIA_YAKUTSK',
  AsiaYangon: 'ASIA_YANGON',
  AsiaYekaterinburg: 'ASIA_YEKATERINBURG',
  AsiaYerevan: 'ASIA_YEREVAN',
  AtlanticAzores: 'ATLANTIC_AZORES',
  AtlanticBermuda: 'ATLANTIC_BERMUDA',
  AtlanticCanary: 'ATLANTIC_CANARY',
  AtlanticCapeVerde: 'ATLANTIC_CAPE_VERDE',
  AtlanticFaeroe: 'ATLANTIC_FAEROE',
  AtlanticFaroe: 'ATLANTIC_FAROE',
  AtlanticJanMayen: 'ATLANTIC_JAN_MAYEN',
  AtlanticMadeira: 'ATLANTIC_MADEIRA',
  AtlanticReykjavik: 'ATLANTIC_REYKJAVIK',
  AtlanticSouthGeorgia: 'ATLANTIC_SOUTH_GEORGIA',
  AtlanticStanley: 'ATLANTIC_STANLEY',
  AtlanticStHelena: 'ATLANTIC_ST_HELENA',
  AustraliaAct: 'AUSTRALIA_ACT',
  AustraliaAdelaide: 'AUSTRALIA_ADELAIDE',
  AustraliaBrisbane: 'AUSTRALIA_BRISBANE',
  AustraliaBrokenHill: 'AUSTRALIA_BROKEN_HILL',
  AustraliaCanberra: 'AUSTRALIA_CANBERRA',
  AustraliaCurrie: 'AUSTRALIA_CURRIE',
  AustraliaDarwin: 'AUSTRALIA_DARWIN',
  AustraliaEucla: 'AUSTRALIA_EUCLA',
  AustraliaHobart: 'AUSTRALIA_HOBART',
  AustraliaLhi: 'AUSTRALIA_LHI',
  AustraliaLindeman: 'AUSTRALIA_LINDEMAN',
  AustraliaLordHowe: 'AUSTRALIA_LORD_HOWE',
  AustraliaMelbourne: 'AUSTRALIA_MELBOURNE',
  AustraliaNorth: 'AUSTRALIA_NORTH',
  AustraliaNsw: 'AUSTRALIA_NSW',
  AustraliaPerth: 'AUSTRALIA_PERTH',
  AustraliaQueensland: 'AUSTRALIA_QUEENSLAND',
  AustraliaSouth: 'AUSTRALIA_SOUTH',
  AustraliaSydney: 'AUSTRALIA_SYDNEY',
  AustraliaTasmania: 'AUSTRALIA_TASMANIA',
  AustraliaVictoria: 'AUSTRALIA_VICTORIA',
  AustraliaWest: 'AUSTRALIA_WEST',
  AustraliaYancowinna: 'AUSTRALIA_YANCOWINNA',
  BrazilAcre: 'BRAZIL_ACRE',
  BrazilDenoronha: 'BRAZIL_DENORONHA',
  BrazilEast: 'BRAZIL_EAST',
  BrazilWest: 'BRAZIL_WEST',
  CanadaAtlantic: 'CANADA_ATLANTIC',
  CanadaCentral: 'CANADA_CENTRAL',
  CanadaEastern: 'CANADA_EASTERN',
  CanadaMountain: 'CANADA_MOUNTAIN',
  CanadaNewfoundland: 'CANADA_NEWFOUNDLAND',
  CanadaPacific: 'CANADA_PACIFIC',
  CanadaSaskatchewan: 'CANADA_SASKATCHEWAN',
  CanadaYukon: 'CANADA_YUKON',
  ChileContinental: 'CHILE_CONTINENTAL',
  ChileEasterisland: 'CHILE_EASTERISLAND',
  EtcGreenwich: 'ETC_GREENWICH',
  EtcUct: 'ETC_UCT',
  EtcUniversal: 'ETC_UNIVERSAL',
  EtcUtc: 'ETC_UTC',
  EtcZulu: 'ETC_ZULU',
  EuropeAmsterdam: 'EUROPE_AMSTERDAM',
  EuropeAndorra: 'EUROPE_ANDORRA',
  EuropeAstrakhan: 'EUROPE_ASTRAKHAN',
  EuropeAthens: 'EUROPE_ATHENS',
  EuropeBelfast: 'EUROPE_BELFAST',
  EuropeBelgrade: 'EUROPE_BELGRADE',
  EuropeBerlin: 'EUROPE_BERLIN',
  EuropeBratislava: 'EUROPE_BRATISLAVA',
  EuropeBrussels: 'EUROPE_BRUSSELS',
  EuropeBucharest: 'EUROPE_BUCHAREST',
  EuropeBudapest: 'EUROPE_BUDAPEST',
  EuropeBusingen: 'EUROPE_BUSINGEN',
  EuropeChisinau: 'EUROPE_CHISINAU',
  EuropeCopenhagen: 'EUROPE_COPENHAGEN',
  EuropeDublin: 'EUROPE_DUBLIN',
  EuropeGibraltar: 'EUROPE_GIBRALTAR',
  EuropeGuernsey: 'EUROPE_GUERNSEY',
  EuropeHelsinki: 'EUROPE_HELSINKI',
  EuropeIsleOfMan: 'EUROPE_ISLE_OF_MAN',
  EuropeIstanbul: 'EUROPE_ISTANBUL',
  EuropeJersey: 'EUROPE_JERSEY',
  EuropeKaliningrad: 'EUROPE_KALININGRAD',
  EuropeKiev: 'EUROPE_KIEV',
  EuropeKirov: 'EUROPE_KIROV',
  EuropeKyiv: 'EUROPE_KYIV',
  EuropeLisbon: 'EUROPE_LISBON',
  EuropeLjubljana: 'EUROPE_LJUBLJANA',
  EuropeLondon: 'EUROPE_LONDON',
  EuropeLuxembourg: 'EUROPE_LUXEMBOURG',
  EuropeMadrid: 'EUROPE_MADRID',
  EuropeMalta: 'EUROPE_MALTA',
  EuropeMariehamn: 'EUROPE_MARIEHAMN',
  EuropeMinsk: 'EUROPE_MINSK',
  EuropeMonaco: 'EUROPE_MONACO',
  EuropeMoscow: 'EUROPE_MOSCOW',
  EuropeNicosia: 'EUROPE_NICOSIA',
  EuropeOslo: 'EUROPE_OSLO',
  EuropeParis: 'EUROPE_PARIS',
  EuropePodgorica: 'EUROPE_PODGORICA',
  EuropePrague: 'EUROPE_PRAGUE',
  EuropeRiga: 'EUROPE_RIGA',
  EuropeRome: 'EUROPE_ROME',
  EuropeSamara: 'EUROPE_SAMARA',
  EuropeSanMarino: 'EUROPE_SAN_MARINO',
  EuropeSarajevo: 'EUROPE_SARAJEVO',
  EuropeSaratov: 'EUROPE_SARATOV',
  EuropeSimferopol: 'EUROPE_SIMFEROPOL',
  EuropeSkopje: 'EUROPE_SKOPJE',
  EuropeSofia: 'EUROPE_SOFIA',
  EuropeStockholm: 'EUROPE_STOCKHOLM',
  EuropeTallinn: 'EUROPE_TALLINN',
  EuropeTirane: 'EUROPE_TIRANE',
  EuropeTiraspol: 'EUROPE_TIRASPOL',
  EuropeUlyanovsk: 'EUROPE_ULYANOVSK',
  EuropeUzhgorod: 'EUROPE_UZHGOROD',
  EuropeVaduz: 'EUROPE_VADUZ',
  EuropeVatican: 'EUROPE_VATICAN',
  EuropeVienna: 'EUROPE_VIENNA',
  EuropeVilnius: 'EUROPE_VILNIUS',
  EuropeVolgograd: 'EUROPE_VOLGOGRAD',
  EuropeWarsaw: 'EUROPE_WARSAW',
  EuropeZagreb: 'EUROPE_ZAGREB',
  EuropeZaporozhye: 'EUROPE_ZAPOROZHYE',
  EuropeZurich: 'EUROPE_ZURICH',
  IndianAntananarivo: 'INDIAN_ANTANANARIVO',
  IndianChagos: 'INDIAN_CHAGOS',
  IndianChristmas: 'INDIAN_CHRISTMAS',
  IndianCocos: 'INDIAN_COCOS',
  IndianComoro: 'INDIAN_COMORO',
  IndianKerguelen: 'INDIAN_KERGUELEN',
  IndianMahe: 'INDIAN_MAHE',
  IndianMaldives: 'INDIAN_MALDIVES',
  IndianMauritius: 'INDIAN_MAURITIUS',
  IndianMayotte: 'INDIAN_MAYOTTE',
  IndianReunion: 'INDIAN_REUNION',
  MexicoBajanorte: 'MEXICO_BAJANORTE',
  MexicoBajasur: 'MEXICO_BAJASUR',
  MexicoGeneral: 'MEXICO_GENERAL',
  PacificApia: 'PACIFIC_APIA',
  PacificAuckland: 'PACIFIC_AUCKLAND',
  PacificBougainville: 'PACIFIC_BOUGAINVILLE',
  PacificChatham: 'PACIFIC_CHATHAM',
  PacificChuuk: 'PACIFIC_CHUUK',
  PacificEaster: 'PACIFIC_EASTER',
  PacificEfate: 'PACIFIC_EFATE',
  PacificEnderbury: 'PACIFIC_ENDERBURY',
  PacificFakaofo: 'PACIFIC_FAKAOFO',
  PacificFiji: 'PACIFIC_FIJI',
  PacificFunafuti: 'PACIFIC_FUNAFUTI',
  PacificGalapagos: 'PACIFIC_GALAPAGOS',
  PacificGambier: 'PACIFIC_GAMBIER',
  PacificGuadalcanal: 'PACIFIC_GUADALCANAL',
  PacificGuam: 'PACIFIC_GUAM',
  PacificHonolulu: 'PACIFIC_HONOLULU',
  PacificJohnston: 'PACIFIC_JOHNSTON',
  PacificKanton: 'PACIFIC_KANTON',
  PacificKiritimati: 'PACIFIC_KIRITIMATI',
  PacificKosrae: 'PACIFIC_KOSRAE',
  PacificKwajalein: 'PACIFIC_KWAJALEIN',
  PacificMajuro: 'PACIFIC_MAJURO',
  PacificMarquesas: 'PACIFIC_MARQUESAS',
  PacificMidway: 'PACIFIC_MIDWAY',
  PacificNauru: 'PACIFIC_NAURU',
  PacificNiue: 'PACIFIC_NIUE',
  PacificNorfolk: 'PACIFIC_NORFOLK',
  PacificNoumea: 'PACIFIC_NOUMEA',
  PacificPagoPago: 'PACIFIC_PAGO_PAGO',
  PacificPalau: 'PACIFIC_PALAU',
  PacificPitcairn: 'PACIFIC_PITCAIRN',
  PacificPohnpei: 'PACIFIC_POHNPEI',
  PacificPonape: 'PACIFIC_PONAPE',
  PacificPortMoresby: 'PACIFIC_PORT_MORESBY',
  PacificRarotonga: 'PACIFIC_RAROTONGA',
  PacificSaipan: 'PACIFIC_SAIPAN',
  PacificSamoa: 'PACIFIC_SAMOA',
  PacificTahiti: 'PACIFIC_TAHITI',
  PacificTarawa: 'PACIFIC_TARAWA',
  PacificTongatapu: 'PACIFIC_TONGATAPU',
  PacificTruk: 'PACIFIC_TRUK',
  PacificWake: 'PACIFIC_WAKE',
  PacificWallis: 'PACIFIC_WALLIS',
  PacificYap: 'PACIFIC_YAP',
  UsAlaska: 'US_ALASKA',
  UsAleutian: 'US_ALEUTIAN',
  UsArizona: 'US_ARIZONA',
  UsCentral: 'US_CENTRAL',
  UsEastern: 'US_EASTERN',
  UsEastIndiana: 'US_EAST_INDIANA',
  UsHawaii: 'US_HAWAII',
  UsIndianaStarke: 'US_INDIANA_STARKE',
  UsMichigan: 'US_MICHIGAN',
  UsMountain: 'US_MOUNTAIN',
  UsPacific: 'US_PACIFIC',
  UsSamoa: 'US_SAMOA'
} as const;

export type Timezone = typeof Timezone[keyof typeof Timezone];
export type Topic = Node & {
  __typename?: 'Topic';
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String']['output'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['URL']['output'];
  description: Scalars['String']['output'];
  /** The combined duration of the topic's recordings in seconds. */
  duration: Scalars['Float']['output'];
  hidingReason: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isHidden: Maybe<Scalars['Boolean']['output']>;
  items: TopicItemConnection;
  language: Language;
  parentTopic: Maybe<Topic>;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['URL']['output'];
  subTopics: TopicConnection;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type TopicCanonicalPathArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TopicCanonicalUrlArgs = {
  useFuturePath?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TopicItemsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type TopicSubTopicsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<TopicsOrder>>;
};

export type TopicConnection = {
  __typename?: 'TopicConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<TopicEdge>>;
  nodes: Maybe<Array<Topic>>;
  pageInfo: PageInfo;
};

export type TopicEdge = {
  __typename?: 'TopicEdge';
  cursor: Scalars['String']['output'];
  node: Topic;
};

export type TopicEntityUnion = Recording | Sequence;

export type TopicItem = {
  __typename?: 'TopicItem';
  entity: TopicEntityUnion;
};

export type TopicItemConnection = {
  __typename?: 'TopicItemConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<TopicItemEdge>>;
  nodes: Maybe<Array<TopicItem>>;
  pageInfo: PageInfo;
};

export type TopicItemEdge = {
  __typename?: 'TopicItemEdge';
  cursor: Scalars['String']['output'];
  node: TopicItem;
};

export type TopicsOrder = {
  direction: OrderByDirection;
  field: TopicsSortableField;
};

/** Properties by which topic connections can be ordered. */
export const TopicsSortableField = {
  Featured: 'FEATURED',
  Id: 'ID',
  Title: 'TITLE'
} as const;

export type TopicsSortableField = typeof TopicsSortableField[keyof typeof TopicsSortableField];
export type Transcript = Node & {
  __typename?: 'Transcript';
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type TranscriptUpdateInput = {
  transcript: Scalars['String']['input'];
};

/** Represents a type that can be retrieved by a URL. */
export type UniformResourceLocatable = {
  canonicalPath: Scalars['String']['output'];
  canonicalUrl: Scalars['URL']['output'];
  shareUrl: Scalars['URL']['output'];
};

export type User = Node & {
  __typename?: 'User';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: Maybe<Scalars['String']['output']>;
  /** Whether recordings should autoplay by default. */
  autoplay: Scalars['Boolean']['output'];
  /** The name of the city, district, village, or town. */
  city: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  country: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  downloadHistory: UserDownloadHistoryConnection;
  /** The user's email address. */
  email: Scalars['String']['output'];
  favoritePersons: PersonConnection;
  favoriteRecordings: RecordingConnection;
  favorites: UserFavoriteConnection;
  /** The user's first name. */
  givenName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The user's avatar image. */
  image: Maybe<Image>;
  /** Whether the user has permission to perform all administrative functions. */
  isSuperuser: Scalars['Boolean']['output'];
  /** Whether the user has verified their email. */
  isVerified: Scalars['Boolean']['output'];
  /** The user's preferred interface language. */
  language: UserLanguage;
  /** The last date the user had activity. */
  lastActivity: Scalars['DateTime']['output'];
  /** The full name of the user, based on the values for givenName and surname. */
  name: Scalars['String']['output'];
  /** Available only for viewer `User`. */
  notificationSubscriptions: Maybe<NotificationSubscriptionConnection>;
  /** Available only for viewer `User`. */
  notifications: Maybe<CatalogHistoryItemConnection>;
  playlist: Maybe<UserPlaylist>;
  playlists: UserPlaylistConnection;
  /** The postal or zip code. */
  postalCode: Maybe<Scalars['String']['output']>;
  /** The user's preferred audio bitrate in kbps. */
  preferredAudioQuality: RecordingQuality;
  /** The name of the region, such as the province, state, or district. */
  province: Maybe<Scalars['String']['output']>;
  /** The user's administrative roles. */
  roles: Array<UserLanguageRole>;
  /** The user's last name. */
  surname: Maybe<Scalars['String']['output']>;
  /** The user's timezone. */
  timezone: Timezone;
};


export type UserDownloadHistoryArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasIncompletePlaybackSession: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<UserDownloadHistoryOrder>>;
};


export type UserFavoritePersonsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<PersonsOrder>>;
  role: InputMaybe<PersonsRoleField>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
  withContentTypes: InputMaybe<Array<RecordingContentType>>;
};


export type UserFavoriteRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  orderBy: InputMaybe<Array<RecordingsOrder>>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type UserFavoritesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  groupSequences: InputMaybe<Scalars['Boolean']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<FavoritesOrder>>;
  recordingContentType: InputMaybe<RecordingContentType>;
  recordingDuration: InputMaybe<IntegerRangeInput>;
  types: InputMaybe<Array<FavoritableCatalogEntityType>>;
  viewerPlaybackStatus: InputMaybe<RecordingViewerPlaybackStatus>;
};


export type UserNotificationSubscriptionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type UserNotificationsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  dateRange: InputMaybe<DateRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  isSticky: InputMaybe<Scalars['Boolean']['input']>;
  isUnread: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
  viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};


export type UserPlaylistArgs = {
  id: Scalars['ID']['input'];
};


export type UserPlaylistsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  language: Language;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<UserPlaylistsOrder>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<UserEdge>>;
  nodes: Maybe<Array<User>>;
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: InputMaybe<Scalars['String']['input']>;
  /** Whether recordings should autoplay by default. */
  autoplay: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the city, district, village, or town. */
  city: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  country: InputMaybe<Scalars['String']['input']>;
  /** The user's email address. */
  email: Scalars['String']['input'];
  /** The user's first name. */
  givenName: InputMaybe<Scalars['String']['input']>;
  /** The user's avatar image. */
  image: InputMaybe<Scalars['Upload']['input']>;
  /** Whether the user has permission to perform all administrative functions. */
  isSuperuser: InputMaybe<Scalars['Boolean']['input']>;
  /** The user's preferred interface language. */
  language: InputMaybe<Language>;
  notificationSubscriptions: InputMaybe<Array<NotificationSubscriptionInput>>;
  /** The user's password. */
  password: InputMaybe<Scalars['String']['input']>;
  /** The postal or zip code. */
  postalCode: InputMaybe<Scalars['String']['input']>;
  /** The user's preferred audio bitrate in kbps. */
  preferredAudioQuality: InputMaybe<RecordingQuality>;
  /** The name of the region, such as the province, state, or district. */
  province: InputMaybe<Scalars['String']['input']>;
  /** The user's administrative roles. Viewers with `ADMINISTRATION` role(s) may only manage roles for the languages they hold `ADMINISTRATION` role(s) for. */
  roles: InputMaybe<Array<UserLanguageRoleInput>>;
  /** The user's last name. */
  surname: InputMaybe<Scalars['String']['input']>;
  /** The user's timezone. */
  timezone: InputMaybe<Timezone>;
};

export type UserDownloadHistory = {
  __typename?: 'UserDownloadHistory';
  createdAt: Scalars['DateTime']['output'];
  recording: Recording;
};

export type UserDownloadHistoryConnection = {
  __typename?: 'UserDownloadHistoryConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<UserDownloadHistoryEdge>>;
  nodes: Maybe<Array<UserDownloadHistory>>;
  pageInfo: PageInfo;
};

export type UserDownloadHistoryEdge = {
  __typename?: 'UserDownloadHistoryEdge';
  cursor: Scalars['String']['output'];
  node: UserDownloadHistory;
};

export type UserDownloadHistoryOrder = {
  direction: OrderByDirection;
  field: UserDownloadHistorySortableField;
};

/** Properties by which user history connections can be ordered. */
export const UserDownloadHistorySortableField = {
  CreatedAt: 'CREATED_AT'
} as const;

export type UserDownloadHistorySortableField = typeof UserDownloadHistorySortableField[keyof typeof UserDownloadHistorySortableField];
export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserFavorite = {
  __typename?: 'UserFavorite';
  createdAt: Scalars['DateTime']['output'];
  entity: FavoriteEntityUnion;
};

export type UserFavoriteConnection = {
  __typename?: 'UserFavoriteConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<UserFavoriteEdge>>;
  nodes: Maybe<Array<UserFavorite>>;
  pageInfo: PageInfo;
};

export type UserFavoriteEdge = {
  __typename?: 'UserFavoriteEdge';
  cursor: Scalars['String']['output'];
  node: UserFavorite;
};

/** User languages */
export const UserLanguage = {
  Abkhazian: 'ABKHAZIAN',
  Afrikaans: 'AFRIKAANS',
  Akan: 'AKAN',
  Amharic: 'AMHARIC',
  Bokmal: 'BOKMAL',
  Burmese: 'BURMESE',
  Cebuano: 'CEBUANO',
  Chinese: 'CHINESE',
  Croatian: 'CROATIAN',
  Czech: 'CZECH',
  Danish: 'DANISH',
  Dinka: 'DINKA',
  Dutch: 'DUTCH',
  English: 'ENGLISH',
  Erzya: 'ERZYA',
  Filipino: 'FILIPINO',
  Finnish: 'FINNISH',
  French: 'FRENCH',
  German: 'GERMAN',
  Greek: 'GREEK',
  Haitian: 'HAITIAN',
  Hebrew: 'HEBREW',
  Hindi: 'HINDI',
  Hungarian: 'HUNGARIAN',
  Indonesian: 'INDONESIAN',
  Italian: 'ITALIAN',
  Japanese: 'JAPANESE',
  Kikuyu: 'KIKUYU',
  Korean: 'KOREAN',
  Latvian: 'LATVIAN',
  Luo: 'LUO',
  Malay: 'MALAY',
  Mongolian: 'MONGOLIAN',
  Nepali: 'NEPALI',
  Norwegian: 'NORWEGIAN',
  Philippine: 'PHILIPPINE',
  Polish: 'POLISH',
  Portuguese: 'PORTUGUESE',
  Romanian: 'ROMANIAN',
  Russian: 'RUSSIAN',
  Samoan: 'SAMOAN',
  Shan: 'SHAN',
  Shona: 'SHONA',
  Slovenian: 'SLOVENIAN',
  Spanish: 'SPANISH',
  Swahili: 'SWAHILI',
  Swedish: 'SWEDISH',
  Tagalog: 'TAGALOG',
  Tamil: 'TAMIL',
  Tswana: 'TSWANA',
  Twi: 'TWI',
  Xhosa: 'XHOSA',
  Zulu: 'ZULU'
} as const;

export type UserLanguage = typeof UserLanguage[keyof typeof UserLanguage];
export type UserLanguageEntityInput = {
  /** The entity type. */
  entityType: CatalogEntityType;
  /** The language scope for the entity. */
  language: Language;
};

export type UserLanguageRole = {
  __typename?: 'UserLanguageRole';
  /** The language scope for this role. */
  language: Language;
  /** The  administrative role. */
  role: UserRole;
};

export type UserLanguageRoleInput = {
  /** The language scope for this role. */
  language: Language;
  /** The  administrative role. */
  role: UserRole;
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLoginSocialInput = {
  givenName: InputMaybe<Scalars['String']['input']>;
  socialId: Scalars['String']['input'];
  socialName: UserSocialServiceName;
  socialToken: Scalars['String']['input'];
  surname: InputMaybe<Scalars['String']['input']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  errors: Array<InputValidationError>;
  user: Maybe<User>;
};

export type UserPlaylist = Node & {
  __typename?: 'UserPlaylist';
  createdAt: Scalars['DateTime']['output'];
  hasRecording: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  language: Language;
  recordings: RecordingConnection;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type UserPlaylistHasRecordingArgs = {
  id: Scalars['ID']['input'];
};


export type UserPlaylistRecordingsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
  collectionId: InputMaybe<Scalars['ID']['input']>;
  collectionIds: InputMaybe<Array<Scalars['ID']['input']>>;
  contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
  distributionAgreementId: InputMaybe<Scalars['ID']['input']>;
  duration: InputMaybe<IntegerRangeInput>;
  first: InputMaybe<Scalars['Int']['input']>;
  hasVideo: InputMaybe<Scalars['Boolean']['input']>;
  includeUnpublished: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
  offset: InputMaybe<Scalars['Int']['input']>;
  onlyArchived: InputMaybe<Scalars['Boolean']['input']>;
  person: InputMaybe<RecordingPersonInput>;
  persons: InputMaybe<Array<RecordingPersonInput>>;
  presenterId: InputMaybe<Scalars['ID']['input']>;
  publishDates: InputMaybe<Array<DateRangeInput>>;
  recordingDates: InputMaybe<Array<DateRangeInput>>;
  screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
  search: InputMaybe<Scalars['String']['input']>;
  sequenceId: InputMaybe<Scalars['ID']['input']>;
  sequenceIds: InputMaybe<Array<Scalars['ID']['input']>>;
  sponsorId: InputMaybe<Scalars['ID']['input']>;
  sponsorIds: InputMaybe<Array<Scalars['ID']['input']>>;
  stage: InputMaybe<RecordingStage>;
  tagName: InputMaybe<Scalars['String']['input']>;
  technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
  updatedDates: InputMaybe<Array<DateRangeInput>>;
  viewerHasFavorited: InputMaybe<Scalars['Boolean']['input']>;
  viewerPlaybackSessionStatus: InputMaybe<RecordingPlaybackSessionStatus>;
  websiteIds: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UserPlaylistAddInput = {
  isPublic: Scalars['Boolean']['input'];
  language: Language;
  recordingIds: InputMaybe<Array<Scalars['ID']['input']>>;
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type UserPlaylistConnection = {
  __typename?: 'UserPlaylistConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<UserPlaylistEdge>>;
  nodes: Maybe<Array<UserPlaylist>>;
  pageInfo: PageInfo;
};

export type UserPlaylistEdge = {
  __typename?: 'UserPlaylistEdge';
  cursor: Scalars['String']['output'];
  node: UserPlaylist;
};

export type UserPlaylistUpdateInput = {
  isPublic: Scalars['Boolean']['input'];
  summary: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type UserPlaylistsOrder = {
  direction: OrderByDirection;
  field: UserPlaylistsSortableField;
};

/** Properties by which a user's playlists connection can be ordered. */
export const UserPlaylistsSortableField = {
  CreatedAt: 'CREATED_AT',
  Id: 'ID',
  Title: 'TITLE'
} as const;

export type UserPlaylistsSortableField = typeof UserPlaylistsSortableField[keyof typeof UserPlaylistsSortableField];
/** The administrative roles a user may hold. */
export const UserRole = {
  /** Language Administrator */
  Administration: 'ADMINISTRATION',
  Communications: 'COMMUNICATIONS',
  ContentScreener: 'CONTENT_SCREENER',
  Editor: 'EDITOR',
  Equipment: 'EQUIPMENT',
  LegalScreener: 'LEGAL_SCREENER',
  Mediamanager: 'MEDIAMANAGER',
  Stats: 'STATS',
  TechnicalScreener: 'TECHNICAL_SCREENER'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];
export type UserSignupInput = {
  email: Scalars['String']['input'];
  givenName: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  surname: InputMaybe<Scalars['String']['input']>;
};

/** The supported social login services. */
export const UserSocialServiceName = {
  Apple: 'APPLE',
  Facebook: 'FACEBOOK',
  Google: 'GOOGLE'
} as const;

export type UserSocialServiceName = typeof UserSocialServiceName[keyof typeof UserSocialServiceName];
export type UserUpdateInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: InputMaybe<Scalars['String']['input']>;
  /** Whether recordings should autoplay by default. */
  autoplay: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the city, district, village, or town. */
  city: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  country: InputMaybe<Scalars['String']['input']>;
  /** The user's email address. */
  email: InputMaybe<Scalars['String']['input']>;
  /** The user's first name. */
  givenName: InputMaybe<Scalars['String']['input']>;
  /** The user's avatar image. */
  image: InputMaybe<Scalars['Upload']['input']>;
  /** Whether the user has permission to perform all administrative functions. */
  isSuperuser: InputMaybe<Scalars['Boolean']['input']>;
  /** The user's preferred interface language. */
  language: InputMaybe<Language>;
  notificationSubscriptions: InputMaybe<Array<NotificationSubscriptionInput>>;
  /** The user's password. */
  password: InputMaybe<Scalars['String']['input']>;
  /** The postal or zip code. */
  postalCode: InputMaybe<Scalars['String']['input']>;
  /** The user's preferred audio bitrate in kbps. */
  preferredAudioQuality: InputMaybe<RecordingQuality>;
  /** The name of the region, such as the province, state, or district. */
  province: InputMaybe<Scalars['String']['input']>;
  /** The user's administrative roles. Viewers with `ADMINISTRATION` role(s) may only manage roles for the languages they hold `ADMINISTRATION` role(s) for. */
  roles: InputMaybe<Array<UserLanguageRoleInput>>;
  /** The user's last name. */
  surname: InputMaybe<Scalars['String']['input']>;
  /** The user's timezone. */
  timezone: InputMaybe<Timezone>;
};

export type UsersOrder = {
  direction: OrderByDirection;
  field: UsersSortableField;
};

/** Properties by which user connections can be ordered. */
export const UsersSortableField = {
  CreatedAt: 'CREATED_AT',
  Email: 'EMAIL',
  Id: 'ID'
} as const;

export type UsersSortableField = typeof UsersSortableField[keyof typeof UsersSortableField];
export type VideoFile = Node & {
  __typename?: 'VideoFile';
  /** Bitrate of the video file in kbps. */
  bitrate: Scalars['Int']['output'];
  /** Whether the current viewer may delete the file. */
  canDelete: Maybe<Scalars['Boolean']['output']>;
  container: Scalars['String']['output'];
  /** The duration of the video file in seconds. */
  duration: Scalars['Float']['output'];
  filename: Scalars['String']['output'];
  /** In bytes */
  filesize: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** The URL to record video views for analytics. */
  logUrl: Maybe<Scalars['URL']['output']>;
  mimeType: Scalars['String']['output'];
  recording: Recording;
  transcodingStatus: MediaFileTranscodingStatus;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['URL']['output'];
  width: Scalars['Int']['output'];
};


export type VideoFileUrlArgs = {
  requestType?: InputMaybe<MediaFileRequestType>;
  skipAnalytics: InputMaybe<Scalars['Boolean']['input']>;
};

export type Website = Node & {
  __typename?: 'Website';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type WebsiteConnection = {
  __typename?: 'WebsiteConnection';
  aggregate: Maybe<Aggregate>;
  edges: Maybe<Array<WebsiteEdge>>;
  nodes: Maybe<Array<Website>>;
  pageInfo: PageInfo;
};

export type WebsiteEdge = {
  __typename?: 'WebsiteEdge';
  cursor: Scalars['String']['output'];
  node: Website;
};
