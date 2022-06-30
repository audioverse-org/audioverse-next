export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string | number;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** A date value string in YYYY-MM-DD format. Example value: "2020-10-05". */
	Date: string;
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: string;
	/** A timezone-less date-time string in YYYY-MM-DD HH:mm:ss format. Example value: "2020-10-05 12:30:00". */
	RelativeDateTime: string;
	/** A field whose value conforms to the standard URL format as specified in RF3986: https://www.ietf.org/rfc/rfc3986.txt. */
	URL: string;
	/** The `Upload` scalar type represents a file upload. */
	Upload: unknown;
};

export type Aggregate = {
	__typename?: 'Aggregate';
	count: Scalars['Int'];
};

export type Attachment = Node & {
	__typename?: 'Attachment';
	/** Whether the current viewer may delete the file. */
	canDelete: Maybe<Scalars['Boolean']>;
	filename: Scalars['String'];
	/** In bytes */
	filesize: Scalars['String'];
	id: Scalars['ID'];
	mimeType: Scalars['String'];
	recording: Recording;
	updatedAt: Maybe<Scalars['DateTime']>;
	url: Scalars['URL'];
};

export type AttachmentUrlArgs = {
	skipAnalytics: InputMaybe<Scalars['Boolean']>;
};

export type AudioFile = Node & {
	__typename?: 'AudioFile';
	/** Bitrate of the audio file in kbps. */
	bitrate: Scalars['Int'];
	/** Whether the current viewer may delete the file. */
	canDelete: Maybe<Scalars['Boolean']>;
	/** The duration of the audio file in seconds. */
	duration: Scalars['Float'];
	filename: Scalars['String'];
	/** In bytes */
	filesize: Scalars['String'];
	id: Scalars['ID'];
	mimeType: Scalars['String'];
	recording: Recording;
	transcodingStatus: MediaFileTranscodingStatus;
	updatedAt: Maybe<Scalars['DateTime']>;
	url: Scalars['URL'];
};

export type AudioFileUrlArgs = {
	requestType?: InputMaybe<MediaFileRequestType>;
	skipAnalytics: InputMaybe<Scalars['Boolean']>;
};

export type AuthenticatedUser = {
	__typename?: 'AuthenticatedUser';
	sessionToken: Scalars['String'];
	user: User;
};

export type AuthenticatedUserPayload = {
	__typename?: 'AuthenticatedUserPayload';
	authenticatedUser: Maybe<AuthenticatedUser>;
	errors: Array<InputValidationError>;
};

export type Bible = Node & {
	__typename?: 'Bible';
	abbreviation: Scalars['String'];
	book: BibleBook;
	books: Array<BibleBook>;
	copyrightText: Scalars['String'];
	id: Scalars['ID'];
	isDramatized: Scalars['Boolean'];
	sponsor: BibleSponsor;
	title: Scalars['String'];
};

export type BibleBookArgs = {
	id: Scalars['ID'];
};

export type BibleBook = Node & {
	__typename?: 'BibleBook';
	bible: Bible;
	chapter: BibleChapter;
	chapterCount: Scalars['Int'];
	chapters: Array<BibleChapter>;
	id: Scalars['ID'];
	isDramatized: Scalars['Boolean'];
	/** A shareable short URL to this resource. */
	shareUrl: Scalars['String'];
	title: Scalars['String'];
};

export type BibleBookChapterArgs = {
	id: Scalars['ID'];
};

export type BibleChapter = Node & {
	__typename?: 'BibleChapter';
	book: BibleBook;
	id: Scalars['ID'];
	text: Scalars['String'];
	title: Scalars['String'];
	url: Scalars['URL'];
	verseCount: Scalars['Int'];
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
	cursor: Scalars['String'];
	node: Bible;
};

export type BibleReference = {
	__typename?: 'BibleReference';
	book: BibleReferenceBook;
	chapter: Maybe<Scalars['Int']>;
	verse: Maybe<Scalars['Int']>;
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
	Zephaniah: 'ZEPHANIAH',
} as const;

export type BibleReferenceBook =
	typeof BibleReferenceBook[keyof typeof BibleReferenceBook];
/** A Bible reference. */
export type BibleReferenceInput = {
	book: BibleReferenceBook;
	chapter: InputMaybe<Scalars['Int']>;
	verse: InputMaybe<Scalars['Int']>;
};

/** The Bible reference range applicable to an item. */
export type BibleReferenceRange = Node & {
	__typename?: 'BibleReferenceRange';
	/** The end reference. */
	endReference: BibleReference;
	id: Scalars['ID'];
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
	cursor: Scalars['String'];
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
	name: Scalars['String'];
	url: Scalars['URL'];
};

export type BibleVerse = {
	__typename?: 'BibleVerse';
	number: Scalars['Int'];
	text: Scalars['String'];
};

export type BlogPost = Node &
	UniformResourceLocatable & {
		__typename?: 'BlogPost';
		body: Scalars['String'];
		/** The canonical HTML path to this resource. */
		canonicalPath: Scalars['String'];
		/** The canonical URL to this resource. */
		canonicalUrl: Scalars['URL'];
		/** The number of days to feature blog post. */
		featuredDuration: Maybe<Scalars['Int']>;
		id: Scalars['ID'];
		image: Maybe<Image>;
		isHidden: Scalars['Boolean'];
		language: Language;
		publishDate: Scalars['DateTime'];
		/** The estimated number of seconds to read the blog post. */
		readingDuration: Maybe<Scalars['Float']>;
		/** A shareable short URL to this resource. */
		shareUrl: Scalars['URL'];
		teaser: Scalars['String'];
		title: Scalars['String'];
	};

export type BlogPostCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type BlogPostCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type BlogPostConnection = {
	__typename?: 'BlogPostConnection';
	aggregate: Maybe<Aggregate>;
	edges: Maybe<Array<BlogPostEdge>>;
	nodes: Maybe<Array<BlogPost>>;
	pageInfo: PageInfo;
};

export type BlogPostCreateInput = {
	body: Scalars['String'];
	/** The number of days to feature blog post. */
	featuredDuration: InputMaybe<Scalars['Int']>;
	image: InputMaybe<ImageInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	language: Language;
	publishDate: InputMaybe<Scalars['DateTime']>;
	teaser: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type BlogPostEdge = {
	__typename?: 'BlogPostEdge';
	cursor: Scalars['String'];
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
	PublishedAt: 'PUBLISHED_AT',
} as const;

export type BlogPostSortableField =
	typeof BlogPostSortableField[keyof typeof BlogPostSortableField];
export type BlogPostUpdateInput = {
	body: InputMaybe<Scalars['String']>;
	/** The number of days to feature blog post. */
	featuredDuration: InputMaybe<Scalars['Int']>;
	image: InputMaybe<ImageInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	publishDate: InputMaybe<Scalars['DateTime']>;
	teaser: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
};

/** The types of catalog entities. */
export const CatalogEntityType = {
	Collection: 'COLLECTION',
	DistributionAgreement: 'DISTRIBUTION_AGREEMENT',
	License: 'LICENSE',
	Person: 'PERSON',
	Recording: 'RECORDING',
	Sequence: 'SEQUENCE',
	Sponsor: 'SPONSOR',
} as const;

export type CatalogEntityType =
	typeof CatalogEntityType[keyof typeof CatalogEntityType];
export type CatalogHistoryComment = {
	__typename?: 'CatalogHistoryComment';
	isSticky: Scalars['Boolean'];
	mentions: Array<User>;
	/** Includes mentions in the format of @user:[id] (e.g., `@user:123`). */
	message: Scalars['String'];
};

export type CatalogHistoryCommentCreateInput = {
	isSticky: InputMaybe<Scalars['Boolean']>;
	/** Can include mentions in the format of @user:[id] (e.g., `@user:123`). */
	message: Scalars['String'];
};

export type CatalogHistoryCommentUpdateInput = {
	isSticky: InputMaybe<Scalars['Boolean']>;
	/** Can include mentions in the format of @user:[id] (e.g., `@user:123`). */
	message: Scalars['String'];
};

export type CatalogHistoryEntityUnion =
	| Collection
	| DistributionAgreement
	| License
	| MediaRelease
	| Person
	| Recording
	| Sequence
	| Sponsor;

export type CatalogHistoryItem = Node & {
	__typename?: 'CatalogHistoryItem';
	comment: Maybe<CatalogHistoryComment>;
	createdAt: Scalars['DateTime'];
	entity: Maybe<CatalogHistoryEntityUnion>;
	id: Scalars['ID'];
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
	cursor: Scalars['String'];
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
	CreatedAt: 'CREATED_AT',
} as const;

export type CatalogHistoryItemSortableField =
	typeof CatalogHistoryItemSortableField[keyof typeof CatalogHistoryItemSortableField];
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
	Updated: 'UPDATED',
} as const;

export type CatalogHistoryItemType =
	typeof CatalogHistoryItemType[keyof typeof CatalogHistoryItemType];
/** The supported view filter of catalog history items. */
export const CatalogHistoryItemViewFilter = {
	Comments: 'COMMENTS',
	Logs: 'LOGS',
	Mentions: 'MENTIONS',
	Stickies: 'STICKIES',
} as const;

export type CatalogHistoryItemViewFilter =
	typeof CatalogHistoryItemViewFilter[keyof typeof CatalogHistoryItemViewFilter];
export type Collection = Node &
	UniformResourceLocatable & {
		__typename?: 'Collection';
		/** The canonical HTML path to this resource. */
		canonicalPath: Scalars['String'];
		/** The canonical URL to this resource. */
		canonicalUrl: Scalars['URL'];
		contentType: CollectionContentType;
		description: Scalars['String'];
		/** The combined duration of the collection's recordings in seconds. */
		duration: Scalars['Float'];
		endDate: Maybe<Scalars['Date']>;
		hidingReason: Maybe<Scalars['String']>;
		history: Maybe<CatalogHistoryItemConnection>;
		id: Scalars['ID'];
		image: Maybe<Image>;
		imageWithFallback: Image;
		isHidden: Maybe<Scalars['Boolean']>;
		language: Language;
		location: Maybe<Scalars['String']>;
		/** @deprecated Collection.logoImage is replaced with Collection.image */
		logoImage: Maybe<Image>;
		/** @deprecated Collection.logoImageWithFallback is replaced with Collection.imageWithFallback */
		logoImageWithFallback: Image;
		mediaReleaseForm: Maybe<MediaReleaseForm>;
		persons: PersonConnection;
		recordings: RecordingConnection;
		sequences: SequenceConnection;
		/** A shareable short URL to this resource. */
		shareUrl: Scalars['URL'];
		/** Requires `ADMINISTRATION` role. */
		skipContentScreening: Maybe<Scalars['Boolean']>;
		/** Requires `ADMINISTRATION` role. */
		skipLegalScreening: Maybe<Scalars['Boolean']>;
		sponsor: Maybe<Sponsor>;
		startDate: Maybe<Scalars['Date']>;
		summary: Scalars['String'];
		title: Scalars['String'];
		viewerHasFavorited: Scalars['Boolean'];
		/** The percentage of the associated recordings the viewer has finished playing. */
		viewerPlaybackCompletedPercentage: Scalars['Float'];
	};

export type CollectionCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type CollectionCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type CollectionHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type CollectionPersonsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<PersonsOrder>>;
	role: InputMaybe<PersonsRoleField>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	startsWith: InputMaybe<Scalars['String']>;
};

export type CollectionRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type CollectionSequencesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
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
	StoryProgram: 'STORY_PROGRAM',
} as const;

export type CollectionContentType =
	typeof CollectionContentType[keyof typeof CollectionContentType];
export type CollectionCreateInput = {
	contentType: CollectionContentType;
	description: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	location: InputMaybe<Scalars['String']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	sponsorId: Scalars['ID'];
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type CollectionEdge = {
	__typename?: 'CollectionEdge';
	cursor: Scalars['String'];
	node: Collection;
};

export type CollectionPayload = {
	__typename?: 'CollectionPayload';
	collection: Maybe<Collection>;
	errors: Array<InputValidationError>;
};

export type CollectionUpdateInput = {
	description: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	location: InputMaybe<Scalars['String']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	summary: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
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
	Title: 'TITLE',
} as const;

export type CollectionsSortableField =
	typeof CollectionsSortableField[keyof typeof CollectionsSortableField];
/** The date range the items must fall in to be applicable. */
export type DateRangeInput = {
	/** The lower bound of the date range. */
	greaterThan: InputMaybe<Scalars['Date']>;
	/** The lower or equal bound of the date range. */
	greaterThanOrEqualTo: InputMaybe<Scalars['Date']>;
	/** The upper bound of the date range. */
	lessThan: InputMaybe<Scalars['Date']>;
	/** The upper or equal bound of the date range. */
	lessThanOrEqualTo: InputMaybe<Scalars['Date']>;
};

export type DistributionAgreement = Node & {
	__typename?: 'DistributionAgreement';
	history: Maybe<CatalogHistoryItemConnection>;
	id: Scalars['ID'];
	isDefault: Scalars['Boolean'];
	isHidden: Maybe<Scalars['Boolean']>;
	isRetired: Scalars['Boolean'];
	license: Maybe<License>;
	recordings: RecordingConnection;
	sponsor: Maybe<Sponsor>;
	summary: Scalars['String'];
	title: Scalars['String'];
};

export type DistributionAgreementHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type DistributionAgreementRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type DistributionAgreementConnection = {
	__typename?: 'DistributionAgreementConnection';
	aggregate: Maybe<Aggregate>;
	edges: Maybe<Array<DistributionAgreementEdge>>;
	nodes: Maybe<Array<DistributionAgreement>>;
	pageInfo: PageInfo;
};

export type DistributionAgreementCreateInput = {
	isDefault: InputMaybe<Scalars['Boolean']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	isRetired: InputMaybe<Scalars['Boolean']>;
	licenseId: Scalars['ID'];
	sponsorId: Scalars['ID'];
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type DistributionAgreementEdge = {
	__typename?: 'DistributionAgreementEdge';
	cursor: Scalars['String'];
	node: DistributionAgreement;
};

export type DistributionAgreementPayload = {
	__typename?: 'DistributionAgreementPayload';
	distributionAgreement: Maybe<DistributionAgreement>;
	errors: Array<InputValidationError>;
};

export type DistributionAgreementUpdateInput = {
	isDefault: InputMaybe<Scalars['Boolean']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	isRetired: InputMaybe<Scalars['Boolean']>;
	licenseId: InputMaybe<Scalars['ID']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	summary: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
};

export type DistributionAgreementsOrder = {
	direction: OrderByDirection;
	field: DistributionAgreementsSortableField;
};

/** Properties by which distribution agreement connections can be ordered. */
export const DistributionAgreementsSortableField = {
	CreatedAt: 'CREATED_AT',
	Id: 'ID',
	Title: 'TITLE',
} as const;

export type DistributionAgreementsSortableField =
	typeof DistributionAgreementsSortableField[keyof typeof DistributionAgreementsSortableField];
export type Faq = Node & {
	__typename?: 'Faq';
	body: Scalars['String'];
	faqCategory: FaqCategory;
	id: Scalars['ID'];
	/** The index of the FAQ within its category. */
	index: Scalars['Int'];
	isHidden: Scalars['Boolean'];
	publishDate: Scalars['DateTime'];
	title: Scalars['String'];
};

export type FaqCategory = Node & {
	__typename?: 'FaqCategory';
	id: Scalars['ID'];
	/** The index of the category within all categories. */
	index: Scalars['Int'];
	title: Scalars['String'];
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
	cursor: Scalars['String'];
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
	body: Scalars['String'];
	faqCategoryId: Scalars['ID'];
	/** The index of the FAQ within its category. */
	index: Scalars['Int'];
	isHidden: InputMaybe<Scalars['Boolean']>;
	language: Language;
	publishDate: InputMaybe<Scalars['DateTime']>;
	title: Scalars['String'];
};

export type FaqEdge = {
	__typename?: 'FaqEdge';
	cursor: Scalars['String'];
	node: Faq;
};

export type FaqPayload = {
	__typename?: 'FaqPayload';
	errors: Array<InputValidationError>;
	faq: Maybe<Faq>;
};

export type FaqUpdateInput = {
	body: InputMaybe<Scalars['String']>;
	faqCategoryId: InputMaybe<Scalars['ID']>;
	/** The index of the FAQ within its category. */
	index: InputMaybe<Scalars['Int']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	publishDate: InputMaybe<Scalars['DateTime']>;
	title: InputMaybe<Scalars['String']>;
};

export type FaqsOrder = {
	direction: OrderByDirection;
	field: FaqsSortableField;
};

/** Properties by which FAQ connections can be ordered. */
export const FaqsSortableField = {
	CreatedAt: 'CREATED_AT',
	Index: 'INDEX',
	Title: 'TITLE',
} as const;

export type FaqsSortableField =
	typeof FaqsSortableField[keyof typeof FaqsSortableField];
/** The types of catalog entities that may be favorited. */
export const FavoritableCatalogEntityType = {
	Collection: 'COLLECTION',
	Person: 'PERSON',
	Recording: 'RECORDING',
	Sequence: 'SEQUENCE',
	Sponsor: 'SPONSOR',
} as const;

export type FavoritableCatalogEntityType =
	typeof FavoritableCatalogEntityType[keyof typeof FavoritableCatalogEntityType];
export type FavoriteEntityUnion =
	| Collection
	| Person
	| Recording
	| Sequence
	| Sponsor;

export type FavoritesOrder = {
	direction: OrderByDirection;
	field: FavoritesSortableField;
};

/** Properties by which user favorites connections can be ordered. */
export const FavoritesSortableField = {
	EntityTitle: 'ENTITY_TITLE',
	FavoritedAt: 'FAVORITED_AT',
} as const;

export type FavoritesSortableField =
	typeof FavoritesSortableField[keyof typeof FavoritesSortableField];
export type Image = Node & {
	__typename?: 'Image';
	id: Scalars['ID'];
	name: Scalars['String'];
	updatedAt: Maybe<Scalars['DateTime']>;
	url: Scalars['URL'];
};

export type ImageUrlArgs = {
	cropMode?: InputMaybe<ImageCropMode>;
	size: Scalars['Int'];
	skipCache: InputMaybe<Scalars['Boolean']>;
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
	Sponsor: 'SPONSOR',
} as const;

export type ImageContainer = typeof ImageContainer[keyof typeof ImageContainer];
/** Aavailable crop modes for images. */
export const ImageCropMode = {
	/** Resizes the image to the requested size and in the process crops parts from the original image. */
	Default: 'DEFAULT',
	/** Scales the whole image content (no cropping) at the original aspect ratio to fit within the output size. */
	MaxSize: 'MAX_SIZE',
} as const;

export type ImageCropMode = typeof ImageCropMode[keyof typeof ImageCropMode];
export type ImageEdge = {
	__typename?: 'ImageEdge';
	cursor: Scalars['String'];
	node: Image;
};

export type ImageInput = {
	name: Scalars['String'];
};

export type ImagePayload = {
	__typename?: 'ImagePayload';
	errors: Array<InputValidationError>;
	image: Maybe<Image>;
};

export type InputValidationError = {
	__typename?: 'InputValidationError';
	message: Scalars['String'];
};

/** The range the items must fall in to be applicable. */
export type IntegerRangeInput = {
	/** The lower bound of the range. */
	greaterThan: InputMaybe<Scalars['Int']>;
	/** The lower or equal bound of the range. */
	greaterThanOrEqualTo: InputMaybe<Scalars['Int']>;
	/** The upper bound of the range. */
	lessThan: InputMaybe<Scalars['Int']>;
	/** The upper or equal bound of the range. */
	lessThanOrEqualTo: InputMaybe<Scalars['Int']>;
};

export type InternalContact = {
	__typename?: 'InternalContact';
	address: Scalars['String'];
	email: Scalars['String'];
	name: Scalars['String'];
	phone: Scalars['String'];
};

export type InternalContactInput = {
	address: InputMaybe<Scalars['String']>;
	email: InputMaybe<Scalars['String']>;
	name: InputMaybe<Scalars['String']>;
	phone: InputMaybe<Scalars['String']>;
};

/** Supported languages */
export const Language = {
	Chinese: 'CHINESE',
	English: 'ENGLISH',
	French: 'FRENCH',
	German: 'GERMAN',
	Japanese: 'JAPANESE',
	Nordic: 'NORDIC',
	Russian: 'RUSSIAN',
	Spanish: 'SPANISH',
} as const;

export type Language = typeof Language[keyof typeof Language];
export type LetterCount = {
	__typename?: 'LetterCount';
	count: Scalars['Int'];
	letter: Scalars['String'];
};

export type License = Node & {
	__typename?: 'License';
	description: Scalars['String'];
	distributionAgreements: DistributionAgreementConnection;
	history: Maybe<CatalogHistoryItemConnection>;
	id: Scalars['ID'];
	image: Maybe<Image>;
	isDefault: Scalars['Boolean'];
	isHidden: Maybe<Scalars['Boolean']>;
	permitsSales: Maybe<Scalars['Boolean']>;
	summary: Scalars['String'];
	title: Scalars['String'];
};

export type LicenseDistributionAgreementsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	isDefault: InputMaybe<Scalars['Boolean']>;
	isRetired: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<DistributionAgreementsOrder>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type LicenseHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
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
	description: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	isDefault: InputMaybe<Scalars['Boolean']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	language: Language;
	permitsSales: InputMaybe<Scalars['Boolean']>;
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type LicenseEdge = {
	__typename?: 'LicenseEdge';
	cursor: Scalars['String'];
	node: License;
};

export type LicensePayload = {
	__typename?: 'LicensePayload';
	errors: Array<InputValidationError>;
	license: Maybe<License>;
};

export type LicenseUpdateInput = {
	description: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	isDefault: InputMaybe<Scalars['Boolean']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	permitsSales: InputMaybe<Scalars['Boolean']>;
	summary: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
};

export type LicensesOrder = {
	direction: OrderByDirection;
	field: LicensesSortableField;
};

/** Properties by which license connections can be ordered. */
export const LicensesSortableField = {
	CreatedAt: 'CREATED_AT',
	Id: 'ID',
	Title: 'TITLE',
} as const;

export type LicensesSortableField =
	typeof LicensesSortableField[keyof typeof LicensesSortableField];
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
	Wmv: 'WMV',
} as const;

export type MediaFileContainer =
	typeof MediaFileContainer[keyof typeof MediaFileContainer];
/** The media file request types. */
export const MediaFileRequestType = {
	Download: 'DOWNLOAD',
	Rss: 'RSS',
	Stream: 'STREAM',
} as const;

export type MediaFileRequestType =
	typeof MediaFileRequestType[keyof typeof MediaFileRequestType];
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
	cursor: Scalars['String'];
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
	Unstarted: 'UNSTARTED',
} as const;

export type MediaFileTranscodingStatus =
	typeof MediaFileTranscodingStatus[keyof typeof MediaFileTranscodingStatus];
export type MediaFileUpload = Node & {
	__typename?: 'MediaFileUpload';
	/** Whether the current viewer may delete the file. */
	canDelete: Maybe<Scalars['Boolean']>;
	filename: Scalars['String'];
	/** In bytes */
	filesize: Scalars['String'];
	hasUploaded: Scalars['Boolean'];
	id: Scalars['ID'];
	mimeType: Scalars['String'];
	/** The presigned part upload URLs. Unavailable after the upload has completed. */
	partUploadUrls: Maybe<Array<Scalars['String']>>;
	recording: Maybe<Recording>;
	transcodingStatus: MediaFileTranscodingStatus;
	updatedAt: Maybe<Scalars['DateTime']>;
	url: Maybe<Scalars['URL']>;
};

export type MediaFileUploadPartUploadUrlsArgs = {
	count: Scalars['Int'];
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
	cursor: Scalars['String'];
	node: MediaFileUpload;
};

export type MediaFileUploadFinishInput = {
	/** The list of entity tags returned from the part upload API calls. */
	uploadPartEtags: Array<Scalars['String']>;
};

export type MediaFileUploadPayload = {
	__typename?: 'MediaFileUploadPayload';
	errors: Array<InputValidationError>;
	mediaFileUpload: Maybe<MediaFileUpload>;
};

export type MediaFileUploadStartInput = {
	filename: Scalars['String'];
	filesize: Scalars['String'];
	recordingId: InputMaybe<Scalars['ID']>;
};

export type MediaFileUploadsOrder = {
	direction: OrderByDirection;
	field: MediaFileUploadsSortableField;
};

/** Properties by which media file uploads connections can be ordered. */
export const MediaFileUploadsSortableField = {
	CreatedAt: 'CREATED_AT',
	Filename: 'FILENAME',
} as const;

export type MediaFileUploadsSortableField =
	typeof MediaFileUploadsSortableField[keyof typeof MediaFileUploadsSortableField];
export type MediaFilesOrder = {
	direction: OrderByDirection;
	field: MediaFilesSortableField;
};

/** Properties by which media files connections can be ordered. */
export const MediaFilesSortableField = {
	CreatedAt: 'CREATED_AT',
	Filename: 'FILENAME',
	Filesize: 'FILESIZE',
} as const;

export type MediaFilesSortableField =
	typeof MediaFilesSortableField[keyof typeof MediaFilesSortableField];
export type MediaRelease = Node & {
	__typename?: 'MediaRelease';
	createdAt: Scalars['DateTime'];
	id: Scalars['ID'];
	mediaReleaseForm: MediaReleaseForm;
	/** The personal information collected with the media release. */
	mediaReleasePerson: MediaReleasePerson;
	notes: Maybe<Scalars['String']>;
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
	mediaReleaseFormId: Scalars['ID'];
	/** The personal information collected with the media release. */
	mediaReleasePerson: MediaReleasePersonCreateInput;
	notes: InputMaybe<Scalars['String']>;
	/** The catalog person associated with the media release. */
	personId: InputMaybe<Scalars['ID']>;
};

export type MediaReleaseEdge = {
	__typename?: 'MediaReleaseEdge';
	cursor: Scalars['String'];
	node: MediaRelease;
};

export type MediaReleaseForm = Node & {
	__typename?: 'MediaReleaseForm';
	collection: Maybe<Collection>;
	createdAt: Scalars['DateTime'];
	id: Scalars['ID'];
	isClosed: Scalars['Boolean'];
	mediaReleases: MediaReleaseConnection;
	recording: Maybe<Recording>;
	sequence: Maybe<Sequence>;
	sponsor: Maybe<Sponsor>;
	summary: Scalars['String'];
	title: Scalars['String'];
	type: MediaReleaseFormType;
	/** The URL for media release form. */
	url: Maybe<Scalars['URL']>;
};

export type MediaReleaseFormMediaReleasesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<MediaReleaseOrder>>;
	personId: InputMaybe<Scalars['ID']>;
	recordingId: InputMaybe<Scalars['ID']>;
	search: InputMaybe<Scalars['String']>;
	seriesId: InputMaybe<Scalars['ID']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
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
	collectionId: InputMaybe<Scalars['ID']>;
	isClosed: InputMaybe<Scalars['Boolean']>;
	language: Language;
	/** Required if `type` is `RECORDING`. */
	recordingId: InputMaybe<Scalars['ID']>;
	/** Required if `type` is `SEQUENCE`. */
	sequenceId: InputMaybe<Scalars['ID']>;
	/** Required if `type` is `SPONSOR`. */
	sponsorId: InputMaybe<Scalars['ID']>;
	summary: Scalars['String'];
	title: Scalars['String'];
	type: MediaReleaseFormType;
};

export type MediaReleaseFormEdge = {
	__typename?: 'MediaReleaseFormEdge';
	cursor: Scalars['String'];
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
	StorySeason: 'STORY_SEASON',
} as const;

export type MediaReleaseFormEntityContentType =
	typeof MediaReleaseFormEntityContentType[keyof typeof MediaReleaseFormEntityContentType];
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
	Type: 'TYPE',
} as const;

export type MediaReleaseFormSortableField =
	typeof MediaReleaseFormSortableField[keyof typeof MediaReleaseFormSortableField];
export type MediaReleaseFormTemplate = {
	__typename?: 'MediaReleaseFormTemplate';
	summary: Scalars['String'];
	title: Scalars['String'];
	type: MediaReleaseFormType;
};

/** Supported types of media release forms. */
export const MediaReleaseFormType = {
	Collection: 'COLLECTION',
	Master: 'MASTER',
	Recording: 'RECORDING',
	Sequence: 'SEQUENCE',
	Sponsor: 'SPONSOR',
} as const;

export type MediaReleaseFormType =
	typeof MediaReleaseFormType[keyof typeof MediaReleaseFormType];
export type MediaReleaseFormUpdateInput = {
	/** Required if `type` is `COLLECTION`. */
	collectionId: InputMaybe<Scalars['ID']>;
	isClosed: InputMaybe<Scalars['Boolean']>;
	/** Required if `type` is `RECORDING`. */
	recordingId: InputMaybe<Scalars['ID']>;
	/** Required if `type` is `SEQUENCE`. */
	sequenceId: InputMaybe<Scalars['ID']>;
	/** Required if `type` is `SPONSOR`. */
	sponsorId: InputMaybe<Scalars['ID']>;
	summary: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
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
	address1: Maybe<Scalars['String']>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2: Maybe<Scalars['String']>;
	/** The name of the city, district, village, or town. */
	city: Maybe<Scalars['String']>;
	/** The name of the country. */
	country: Maybe<Scalars['String']>;
	/** The person's email address. */
	email: Scalars['String'];
	/** The person's first name. */
	givenName: Scalars['String'];
	/** The full name of the person, based on the values for givenName and surname. */
	name: Scalars['String'];
	/** The person's phone number. */
	phone: Scalars['String'];
	/** The postal or zip code. */
	postalCode: Maybe<Scalars['String']>;
	/** The name of the region, such as the province, state, or district. */
	province: Maybe<Scalars['String']>;
	/** The person's last name. */
	surname: Scalars['String'];
};

export type MediaReleasePersonCreateInput = {
	/** The first line of the address. Typically the street address or PO Box number. */
	address1: Scalars['String'];
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2: InputMaybe<Scalars['String']>;
	/** The name of the city, district, village, or town. */
	city: Scalars['String'];
	/** The name of the country. */
	country: Scalars['String'];
	/** The person's email address. */
	email: Scalars['String'];
	/** The person's first name. */
	givenName: Scalars['String'];
	/** The person's phone number. */
	phone: Scalars['String'];
	/** The postal or zip code. */
	postalCode: Scalars['String'];
	/** The name of the region, such as the province, state, or district. */
	province: Scalars['String'];
	/** The person's last name. */
	surname: Scalars['String'];
};

export type MediaReleasePersonUpdateInput = {
	/** The first line of the address. Typically the street address or PO Box number. */
	address1: InputMaybe<Scalars['String']>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2: InputMaybe<Scalars['String']>;
	/** The name of the city, district, village, or town. */
	city: InputMaybe<Scalars['String']>;
	/** The name of the country. */
	country: InputMaybe<Scalars['String']>;
	/** The person's email address. */
	email: InputMaybe<Scalars['String']>;
	/** The person's first name. */
	givenName: InputMaybe<Scalars['String']>;
	/** The person's phone number. */
	phone: InputMaybe<Scalars['String']>;
	/** The postal or zip code. */
	postalCode: InputMaybe<Scalars['String']>;
	/** The name of the region, such as the province, state, or district. */
	province: InputMaybe<Scalars['String']>;
	/** The person's last name. */
	surname: InputMaybe<Scalars['String']>;
};

/** Properties by which media release connections can be ordered. */
export const MediaReleaseSortableField = {
	CreatedAt: 'CREATED_AT',
	GivenName: 'GIVEN_NAME',
	Id: 'ID',
	Surname: 'SURNAME',
} as const;

export type MediaReleaseSortableField =
	typeof MediaReleaseSortableField[keyof typeof MediaReleaseSortableField];
export type MediaReleaseUpdateInput = {
	/** The personal information collected with the media release. */
	mediaReleasePerson: InputMaybe<MediaReleasePersonUpdateInput>;
	notes: InputMaybe<Scalars['String']>;
	/** The catalog person associated with the media release. */
	personId: InputMaybe<Scalars['ID']>;
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
	favoriteRecording: Scalars['Boolean'];
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
	playlistDelete: Scalars['Boolean'];
	playlistRecordingAdd: Scalars['Boolean'];
	playlistRecordingRemove: Scalars['Boolean'];
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
	unfavoriteRecording: Scalars['Boolean'];
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
	blogPostId: Scalars['ID'];
};

export type MutationBlogPostUpdateArgs = {
	blogPostId: Scalars['ID'];
	input: BlogPostUpdateInput;
};

export type MutationCatalogHistoryCommentDeleteArgs = {
	catalogHistoryCommentId: Scalars['ID'];
};

export type MutationCatalogHistoryCommentUpdateArgs = {
	catalogHistoryCommentId: Scalars['ID'];
	input: CatalogHistoryCommentUpdateInput;
};

export type MutationCollectionCreateArgs = {
	input: CollectionCreateInput;
};

export type MutationCollectionDeleteArgs = {
	collectionId: Scalars['ID'];
};

export type MutationCollectionFavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationCollectionHistoryCommentCreateArgs = {
	collectionId: Scalars['ID'];
	input: CatalogHistoryCommentCreateInput;
};

export type MutationCollectionScreeningLegalOverrideArgs = {
	collectionId: Scalars['ID'];
};

export type MutationCollectionUnfavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationCollectionUpdateArgs = {
	collectionId: Scalars['ID'];
	input: CollectionUpdateInput;
};

export type MutationDistributionAgreementCreateArgs = {
	input: DistributionAgreementCreateInput;
};

export type MutationDistributionAgreementDeleteArgs = {
	distributionAgreementId: Scalars['ID'];
};

export type MutationDistributionAgreementHistoryCommentCreateArgs = {
	distributionAgreementId: Scalars['ID'];
	input: CatalogHistoryCommentCreateInput;
};

export type MutationDistributionAgreementUpdateArgs = {
	distributionAgreementId: Scalars['ID'];
	input: DistributionAgreementUpdateInput;
};

export type MutationFaqCreateArgs = {
	input: FaqCreateInput;
};

export type MutationFaqDeleteArgs = {
	faqId: Scalars['ID'];
};

export type MutationFaqUpdateArgs = {
	faqId: Scalars['ID'];
	input: FaqUpdateInput;
};

export type MutationFavoriteRecordingArgs = {
	id: Scalars['ID'];
};

export type MutationImageUploadArgs = {
	image: Scalars['Upload'];
	imageType: ImageContainer;
};

export type MutationLicenseCreateArgs = {
	input: LicenseCreateInput;
};

export type MutationLicenseDeleteArgs = {
	licenseId: Scalars['ID'];
};

export type MutationLicenseHistoryCommentCreateArgs = {
	input: CatalogHistoryCommentCreateInput;
	licenseId: Scalars['ID'];
};

export type MutationLicenseUpdateArgs = {
	input: LicenseUpdateInput;
	licenseId: Scalars['ID'];
};

export type MutationLoginArgs = {
	input: UserLoginInput;
};

export type MutationLoginSocialArgs = {
	input: UserLoginSocialInput;
};

export type MutationMediaFileDeleteArgs = {
	mediaFileId: Scalars['ID'];
};

export type MutationMediaFileUploadAbortArgs = {
	mediaFileUploadId: Scalars['ID'];
};

export type MutationMediaFileUploadAssignArgs = {
	mediaFileUploadId: Scalars['ID'];
	recordingId: Scalars['ID'];
};

export type MutationMediaFileUploadFinishArgs = {
	input: MediaFileUploadFinishInput;
	mediaFileUploadId: Scalars['ID'];
};

export type MutationMediaFileUploadStartArgs = {
	input: MediaFileUploadStartInput;
};

export type MutationMediaReleaseCreateArgs = {
	input: MediaReleaseCreateInput;
};

export type MutationMediaReleaseDeleteArgs = {
	mediaReleaseId: Scalars['ID'];
};

export type MutationMediaReleaseFormCreateArgs = {
	input: MediaReleaseFormCreateInput;
};

export type MutationMediaReleaseFormDeleteArgs = {
	mediaReleaseFormId: Scalars['ID'];
};

export type MutationMediaReleaseFormTemplateUpdateArgs = {
	input: MediaReleaseFormUpdateInput;
	language: Language;
	type: MediaReleaseFormType;
};

export type MutationMediaReleaseFormUpdateArgs = {
	input: MediaReleaseFormUpdateInput;
	mediaReleaseFormId: Scalars['ID'];
};

export type MutationMediaReleaseUpdateArgs = {
	input: MediaReleaseUpdateInput;
	mediaReleaseId: Scalars['ID'];
};

export type MutationPageContactSubmitArgs = {
	input: PageContactSubmitInput;
};

export type MutationPageCreateArgs = {
	input: PageCreateInput;
};

export type MutationPageDeleteArgs = {
	pageId: Scalars['ID'];
};

export type MutationPageUpdateArgs = {
	input: PageUpdateInput;
	pageId: Scalars['ID'];
};

export type MutationPersonCreateArgs = {
	input: PersonCreateInput;
};

export type MutationPersonDeleteArgs = {
	personId: Scalars['ID'];
};

export type MutationPersonFavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationPersonHistoryCommentCreateArgs = {
	input: CatalogHistoryCommentCreateInput;
	personId: Scalars['ID'];
};

export type MutationPersonUnfavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationPersonUpdateArgs = {
	input: PersonUpdateInput;
	personId: Scalars['ID'];
};

export type MutationPlaylistAddArgs = {
	input: UserPlaylistAddInput;
};

export type MutationPlaylistDeleteArgs = {
	playlistId: Scalars['ID'];
};

export type MutationPlaylistRecordingAddArgs = {
	playlistId: Scalars['ID'];
	recordingId: Scalars['ID'];
};

export type MutationPlaylistRecordingRemoveArgs = {
	playlistId: Scalars['ID'];
	recordingId: Scalars['ID'];
};

export type MutationPlaylistUpdateArgs = {
	input: UserPlaylistUpdateInput;
	playlistId: Scalars['ID'];
};

export type MutationRecordingArchiveArgs = {
	reason: Scalars['String'];
	recordingId: Scalars['ID'];
};

export type MutationRecordingCreateArgs = {
	input: RecordingCreateInput;
};

export type MutationRecordingDeleteArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingDraftingArgs = {
	finished: Scalars['Boolean'];
	recordingId: Scalars['ID'];
};

export type MutationRecordingFavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationRecordingHistoryCommentCreateArgs = {
	input: CatalogHistoryCommentCreateInput;
	recordingId: Scalars['ID'];
};

export type MutationRecordingPlaybackSessionAdvanceArgs = {
	input: PlaybackSessionAdvanceInput;
	recordingId: Scalars['ID'];
};

export type MutationRecordingPlaybackSessionBeginArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingPlaybackSessionFinishArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingScreeningContentCheckoutCreateArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningContentCheckoutDeleteArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningContentEvaluateArgs = {
	approve: Scalars['Boolean'];
	recordingId: Scalars['ID'];
};

export type MutationRecordingScreeningContentEvaluationsClearArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingScreeningContentMethodsSetArgs = {
	methods: Array<RecordingScreeningMethod>;
	recordingId: Scalars['ID'];
};

export type MutationRecordingScreeningContentUnevaluateArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningIssueCreateArgs = {
	input: RecordingScreeningIssueInput;
	recordingId: Scalars['ID'];
};

export type MutationRecordingScreeningIssueDeleteArgs = {
	issueId: Scalars['ID'];
};

export type MutationRecordingScreeningIssueUpdateArgs = {
	input: RecordingScreeningIssueInput;
	issueId: Scalars['ID'];
};

export type MutationRecordingScreeningLegalCheckoutCreateArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningLegalCheckoutDeleteArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningLegalEvaluateArgs = {
	approve: Scalars['Boolean'];
	recordingId: Scalars['ID'];
};

export type MutationRecordingScreeningTechnicalCheckoutCreateArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningTechnicalCheckoutDeleteArgs = {
	recordingId: Scalars['ID'];
	userId: InputMaybe<Scalars['ID']>;
};

export type MutationRecordingScreeningTechnicalEvaluateArgs = {
	approve: Scalars['Boolean'];
	recordingId: Scalars['ID'];
};

export type MutationRecordingTranscriptDeleteArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingTranscriptUpdateArgs = {
	input: TranscriptUpdateInput;
	recordingId: Scalars['ID'];
};

export type MutationRecordingTranscriptionRequestArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingUnarchiveArgs = {
	recordingId: Scalars['ID'];
};

export type MutationRecordingUnfavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationRecordingUpdateArgs = {
	input: RecordingUpdateInput;
	recordingId: Scalars['ID'];
};

export type MutationSequenceCreateArgs = {
	input: SequenceCreateInput;
};

export type MutationSequenceDeleteArgs = {
	sequenceId: Scalars['ID'];
};

export type MutationSequenceFavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationSequenceHistoryCommentCreateArgs = {
	input: CatalogHistoryCommentCreateInput;
	sequenceId: Scalars['ID'];
};

export type MutationSequenceScreeningLegalOverrideArgs = {
	sequenceId: Scalars['ID'];
};

export type MutationSequenceUnfavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationSequenceUpdateArgs = {
	input: SequenceUpdateInput;
	sequenceId: Scalars['ID'];
};

export type MutationSignupArgs = {
	input: UserSignupInput;
};

export type MutationSponsorCreateArgs = {
	input: SponsorCreateInput;
};

export type MutationSponsorDeleteArgs = {
	sponsorId: Scalars['ID'];
};

export type MutationSponsorFavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationSponsorHistoryCommentCreateArgs = {
	input: CatalogHistoryCommentCreateInput;
	sponsorId: Scalars['ID'];
};

export type MutationSponsorUnfavoriteArgs = {
	id: Scalars['ID'];
};

export type MutationSponsorUpdateArgs = {
	input: SponsorUpdateInput;
	sponsorId: Scalars['ID'];
};

export type MutationTestimonyCreateArgs = {
	input: TestimonyCreateInput;
};

export type MutationTestimonyDeleteArgs = {
	testimonyId: Scalars['ID'];
};

export type MutationTestimonyUpdateArgs = {
	input: TestimonyUpdateInput;
	testimonyId: Scalars['ID'];
};

export type MutationUnfavoriteRecordingArgs = {
	id: Scalars['ID'];
};

export type MutationUpdateMyProfileArgs = {
	input: UserUpdateInput;
};

export type MutationUserCreateArgs = {
	input: UserCreateInput;
};

export type MutationUserDeleteArgs = {
	destroyData: InputMaybe<Scalars['Boolean']>;
	userId: Scalars['ID'];
};

export type MutationUserRecoverArgs = {
	email: Scalars['String'];
};

export type MutationUserResetArgs = {
	password: Scalars['String'];
	token: Scalars['String'];
};

export type MutationUserUpdateArgs = {
	input: UserUpdateInput;
	userId: Scalars['ID'];
};

export type Node = {
	id: Scalars['ID'];
};

export type NotificationChannel = Node & {
	__typename?: 'NotificationChannel';
	description: Scalars['String'];
	id: Scalars['ID'];
	title: Scalars['String'];
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
	cursor: Scalars['String'];
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
	Weekly: 'WEEKLY',
} as const;

export type NotificationFrequency =
	typeof NotificationFrequency[keyof typeof NotificationFrequency];
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
	cursor: Scalars['String'];
	node: NotificationSubscription;
};

export type NotificationSubscriptionInput = {
	frequency: NotificationFrequency;
	notificationChannelId: Scalars['ID'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export const OrderByDirection = {
	Asc: 'ASC',
	Desc: 'DESC',
} as const;

export type OrderByDirection =
	typeof OrderByDirection[keyof typeof OrderByDirection];
export type Page = Node & {
	__typename?: 'Page';
	body: Scalars['String'];
	/** The canonical HTML path to this resource. */
	canonicalPath: Scalars['String'];
	/** The canonical URL to this resource. */
	canonicalUrl: Scalars['URL'];
	id: Scalars['ID'];
	isHidden: Scalars['Boolean'];
	pageMenu: Maybe<PageMenu>;
	/** A shareable short URL to this resource. */
	shareUrl: Scalars['URL'];
	slug: Scalars['String'];
	title: Scalars['String'];
	type: PageType;
};

export type PageCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type PageCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
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
	Testimony: 'TESTIMONY',
} as const;

export type PageContactRecipient =
	typeof PageContactRecipient[keyof typeof PageContactRecipient];
export type PageContactSubmitInput = {
	body: Scalars['String'];
	email: Scalars['String'];
	givenName: Scalars['String'];
	language: Language;
	recipient: PageContactRecipient;
	surname: Scalars['String'];
};

export type PageCreateInput = {
	body: Scalars['String'];
	isHidden: InputMaybe<Scalars['Boolean']>;
	language: Language;
	pageMenuId: InputMaybe<Scalars['ID']>;
	slug: Scalars['String'];
	title: Scalars['String'];
	type: PageType;
};

export type PageEdge = {
	__typename?: 'PageEdge';
	cursor: Scalars['String'];
	node: Page;
};

export type PageInfo = {
	__typename?: 'PageInfo';
	endCursor: Maybe<Scalars['String']>;
	hasNextPage: Scalars['Boolean'];
	hasPreviousPage: Scalars['Boolean'];
	startCursor: Maybe<Scalars['String']>;
};

export type PageMenu = Node & {
	__typename?: 'PageMenu';
	id: Scalars['ID'];
	name: Scalars['String'];
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
	cursor: Scalars['String'];
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
	Purpose: 'PURPOSE',
	SpiritOfAv: 'SPIRIT_OF_AV',
	Team: 'TEAM',
	TermsOfUse: 'TERMS_OF_USE',
	Testimonials: 'TESTIMONIALS',
} as const;

export type PageType = typeof PageType[keyof typeof PageType];
export type PageUpdateInput = {
	body: InputMaybe<Scalars['String']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	pageMenuId: InputMaybe<Scalars['ID']>;
	slug: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
};

export type PagesOrder = {
	direction: OrderByDirection;
	field: PagesSortableField;
};

/** Properties by which page connections can be ordered. */
export const PagesSortableField = {
	CreatedAt: 'CREATED_AT',
	Slug: 'SLUG',
	Title: 'TITLE',
} as const;

export type PagesSortableField =
	typeof PagesSortableField[keyof typeof PagesSortableField];
export type Person = Node &
	UniformResourceLocatable & {
		__typename?: 'Person';
		address: Maybe<Scalars['String']>;
		/** The canonical HTML path to this resource. */
		canonicalPath: Scalars['String'];
		/** The canonical URL to this resource. */
		canonicalUrl: Scalars['URL'];
		collections: CollectionConnection;
		description: Scalars['String'];
		designations: Scalars['String'];
		email: Maybe<Scalars['String']>;
		givenName: Scalars['String'];
		hidingReason: Maybe<Scalars['String']>;
		history: Maybe<CatalogHistoryItemConnection>;
		id: Scalars['ID'];
		image: Maybe<Image>;
		imageWithFallback: Image;
		internalContact: Maybe<InternalContact>;
		isHidden: Scalars['Boolean'];
		/** @deprecated Person.isPreapproved is replaced with Person.skipContentScreening */
		isPreapproved: Maybe<Scalars['Boolean']>;
		language: Language;
		name: Scalars['String'];
		phone: Maybe<Scalars['String']>;
		/** @deprecated Person.photo is replaced with Person.image */
		photo: Maybe<Image>;
		/** @deprecated Person.photoWithFallback is replaced with Person.imageWithFallback */
		photoWithFallback: Image;
		recordings: RecordingConnection;
		sequences: SequenceConnection;
		/** A shareable short URL to this resource. */
		shareUrl: Scalars['URL'];
		/** Requires `ADMINISTRATION` role. */
		skipContentScreening: Maybe<Scalars['Boolean']>;
		/** Requires `ADMINISTRATION` role. */
		skipLegalScreening: Maybe<Scalars['Boolean']>;
		suffix: Scalars['String'];
		summary: Scalars['String'];
		surname: Scalars['String'];
		title: Scalars['String'];
		viewerHasFavorited: Scalars['Boolean'];
		website: Maybe<Scalars['URL']>;
	};

export type PersonCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type PersonCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type PersonCollectionsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	withRole: InputMaybe<PersonsRoleField>;
};

export type PersonHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type PersonRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	contentType: InputMaybe<RecordingContentType>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
	withRole: InputMaybe<PersonsRoleField>;
};

export type PersonSequencesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
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
	address: InputMaybe<Scalars['String']>;
	description: InputMaybe<Scalars['String']>;
	designations: InputMaybe<Scalars['String']>;
	email: InputMaybe<Scalars['String']>;
	givenName: Scalars['String'];
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	internalContact: InputMaybe<InternalContactInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	/** Deprecated: isPreapproved is replaced with skipContentScreening. */
	isPreapproved: InputMaybe<Scalars['Boolean']>;
	language: Language;
	phone: InputMaybe<Scalars['String']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	suffix: InputMaybe<Scalars['String']>;
	summary: InputMaybe<Scalars['String']>;
	surname: Scalars['String'];
	title: InputMaybe<Scalars['String']>;
	website: InputMaybe<Scalars['URL']>;
};

export type PersonEdge = {
	__typename?: 'PersonEdge';
	cursor: Scalars['String'];
	node: Person;
};

export type PersonPayload = {
	__typename?: 'PersonPayload';
	errors: Array<InputValidationError>;
	person: Maybe<Person>;
};

export type PersonUpdateInput = {
	address: InputMaybe<Scalars['String']>;
	description: InputMaybe<Scalars['String']>;
	designations: InputMaybe<Scalars['String']>;
	email: InputMaybe<Scalars['String']>;
	givenName: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	internalContact: InputMaybe<InternalContactInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	/** Deprecated: isPreapproved is replaced with skipContentScreening. */
	isPreapproved: InputMaybe<Scalars['Boolean']>;
	phone: InputMaybe<Scalars['String']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	suffix: InputMaybe<Scalars['String']>;
	summary: InputMaybe<Scalars['String']>;
	surname: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
	website: InputMaybe<Scalars['URL']>;
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
	Writer: 'WRITER',
} as const;

export type PersonsRoleField =
	typeof PersonsRoleField[keyof typeof PersonsRoleField];
/** Properties by which person connections can be ordered. */
export const PersonsSortableField = {
	CreatedAt: 'CREATED_AT',
	Id: 'ID',
	Name: 'NAME',
	RecordingCount: 'RECORDING_COUNT',
	RecordingDownloadsAllTime: 'RECORDING_DOWNLOADS_ALL_TIME',
	RecordingPublishedAt: 'RECORDING_PUBLISHED_AT',
} as const;

export type PersonsSortableField =
	typeof PersonsSortableField[keyof typeof PersonsSortableField];
export type PlaybackSessionAdvanceInput = {
	/** The playback position as a percentage of the recording duration. */
	positionPercentage: Scalars['Float'];
};

export type PopularRecording = {
	__typename?: 'PopularRecording';
	recording: Recording;
	weight: Scalars['Float'];
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
	cursor: Scalars['String'];
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
	/** @deprecated `featuredRecordings` is replaced by `recordings(isFeatured: true)` */
	featuredRecordings: RecordingConnection;
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
	user: Maybe<User>;
	users: UserConnection;
	websiteFeaturedCollection: Maybe<FavoriteEntityUnion>;
	websiteRecentRecordings: RecordingConnection;
	websites: WebsiteConnection;
};

export type QueryAdminImageArgs = {
	imageType: ImageContainer;
	name: Scalars['String'];
};

export type QueryAdminImagesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	imageType: ImageContainer;
};

export type QueryAudiobibleArgs = {
	id: Scalars['ID'];
};

export type QueryAudiobibleChapterArgs = {
	id: Scalars['ID'];
};

export type QueryAudiobiblesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryAudiobookArgs = {
	id: Scalars['ID'];
};

export type QueryAudiobookSeriesArgs = {
	id: Scalars['ID'];
};

export type QueryAudiobookSeriesesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryAudiobookTrackArgs = {
	id: Scalars['ID'];
};

export type QueryAudiobookTracksArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryAudiobooksArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryBlogPostArgs = {
	id: Scalars['ID'];
};

export type QueryBlogPostsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<BlogPostOrder>>;
};

export type QueryCollectionArgs = {
	id: Scalars['ID'];
};

export type QueryCollectionsArgs = {
	after: InputMaybe<Scalars['String']>;
	contentType: InputMaybe<CollectionContentType>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryConferenceArgs = {
	id: Scalars['ID'];
};

export type QueryConferencesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryDistributionAgreementArgs = {
	id: Scalars['ID'];
};

export type QueryDistributionAgreementsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	isDefault: InputMaybe<Scalars['Boolean']>;
	isRetired: InputMaybe<Scalars['Boolean']>;
	language: Language;
	licenseId: InputMaybe<Scalars['ID']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<DistributionAgreementsOrder>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryFaqArgs = {
	id: Scalars['ID'];
};

export type QueryFaqCategoriesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryFaqsArgs = {
	after: InputMaybe<Scalars['String']>;
	faqCategoryId: InputMaybe<Scalars['Int']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<FaqsOrder>>;
};

export type QueryFeaturedBlogPostsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryFeaturedRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	contentType: InputMaybe<RecordingContentType>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryLicenseArgs = {
	id: Scalars['ID'];
};

export type QueryLicensesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isDefault: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<LicensesOrder>>;
	search: InputMaybe<Scalars['String']>;
};

export type QueryMediaFileUploadsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	hasUploaded: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<MediaFileUploadsOrder>>;
	search: InputMaybe<Scalars['String']>;
};

export type QueryMediaFilesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<MediaFilesOrder>>;
	transcodingStatuses: InputMaybe<Array<MediaFileTranscodingStatus>>;
};

export type QueryMediaReleaseArgs = {
	id: Scalars['ID'];
};

export type QueryMediaReleaseFormArgs = {
	id: Scalars['ID'];
};

export type QueryMediaReleaseFormTemplatesArgs = {
	language: Language;
};

export type QueryMediaReleaseFormsArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	entityContentType: InputMaybe<MediaReleaseFormEntityContentType>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<MediaReleaseFormOrder>>;
	recordingId: InputMaybe<Scalars['ID']>;
	search: InputMaybe<Scalars['String']>;
	seriesId: InputMaybe<Scalars['ID']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	type: InputMaybe<MediaReleaseFormType>;
};

export type QueryMediaReleasesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	mediaReleaseFormId: InputMaybe<Scalars['ID']>;
	mediaReleaseFormType: InputMaybe<MediaReleaseFormType>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<MediaReleaseOrder>>;
	personId: InputMaybe<Scalars['ID']>;
	recordingId: InputMaybe<Scalars['ID']>;
	search: InputMaybe<Scalars['String']>;
	seriesId: InputMaybe<Scalars['ID']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryMusicAlbumArgs = {
	id: Scalars['ID'];
};

export type QueryMusicAlbumsArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryMusicBookTagsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryMusicMoodTagsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryMusicSeriesesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryMusicTrackArgs = {
	id: Scalars['ID'];
};

export type QueryMusicTracksArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryNotificationChannelsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryPageArgs = {
	id: Scalars['ID'];
};

export type QueryPageMenusArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryPagesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<PagesOrder>>;
	pageMenuId: InputMaybe<Scalars['Int']>;
};

export type QueryPersonArgs = {
	id: Scalars['ID'];
};

export type QueryPersonLetterCountsArgs = {
	language: Language;
};

export type QueryPersonsArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<PersonsOrder>>;
	role: InputMaybe<PersonsRoleField>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	startsWith: InputMaybe<Scalars['String']>;
	withContentTypes: InputMaybe<Array<RecordingContentType>>;
};

export type QueryPopularRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	contentType: InputMaybe<RecordingContentType>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryRecordingArgs = {
	allowArchived: InputMaybe<Scalars['Boolean']>;
	id: Scalars['ID'];
};

export type QueryRecordingScreeningIssueTypeArgs = {
	id: Scalars['ID'];
};

export type QueryRecordingScreeningIssueTypesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	contentType: InputMaybe<RecordingContentType>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QuerySequenceArgs = {
	id: Scalars['ID'];
};

export type QuerySequencesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentType: InputMaybe<SequenceContentType>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QuerySeriesArgs = {
	id: Scalars['ID'];
};

export type QuerySeriesesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QuerySermonArgs = {
	id: Scalars['ID'];
};

export type QuerySermonsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QuerySponsorArgs = {
	id: Scalars['ID'];
};

export type QuerySponsorLetterCountsArgs = {
	language: Language;
};

export type QuerySponsorsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SponsorsOrder>>;
	search: InputMaybe<Scalars['String']>;
	startsWith: InputMaybe<Scalars['String']>;
	withMusic: InputMaybe<Scalars['Boolean']>;
};

export type QueryStoriesArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	language: Language;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryStoryArgs = {
	id: Scalars['ID'];
};

export type QueryStoryProgramArgs = {
	id: Scalars['ID'];
};

export type QueryStoryProgramsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryStorySeasonArgs = {
	id: Scalars['ID'];
};

export type QueryStorySeasonsArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryTagsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<TagsOrder>>;
	search: InputMaybe<Scalars['String']>;
};

export type QueryTestimoniesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<TestimoniesOrder>>;
};

export type QueryTestimonyArgs = {
	id: Scalars['ID'];
};

export type QueryUserArgs = {
	id: Scalars['ID'];
};

export type QueryUsersArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	hasAnyRoles: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<UsersOrder>>;
	search: InputMaybe<Scalars['String']>;
	withReadAccess: InputMaybe<UserLanguageEntityInput>;
	withRole: InputMaybe<UserLanguageRoleInput>;
};

export type QueryWebsiteRecentRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
};

export type QueryWebsitesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type Recording = Node &
	UniformResourceLocatable & {
		__typename?: 'Recording';
		/** Requires `ADMINISTRATION` role. */
		archiveDate: Maybe<Scalars['DateTime']>;
		/** Requires `ADMINISTRATION` role. */
		archiveReason: Maybe<Scalars['String']>;
		/** Requires `ADMINISTRATION` role. */
		archiveUser: Maybe<User>;
		attachments: Array<Attachment>;
		audioFiles: Array<AudioFile>;
		bibleReferences: BibleReferenceRangeConnection;
		/** Whether the current viewer may archive the recording. */
		canArchive: Maybe<Scalars['Boolean']>;
		/** Whether the current viewer may delete the recording. */
		canDelete: Maybe<Scalars['Boolean']>;
		/** Whether the recording can be manually enqueued for transcribing. */
		canRequestTranscription: Maybe<Scalars['Boolean']>;
		/** The canonical HTML path to this resource. */
		canonicalPath: Scalars['String'];
		/** The canonical URL to this resource. */
		canonicalUrl: Scalars['URL'];
		collection: Maybe<Collection>;
		contentScreeningCheckouts: Maybe<Array<RecordingScreeningCheckout>>;
		contentScreeningEvaluations: Maybe<
			Array<RecordingContentScreeningEvaluation>
		>;
		contentScreeningStatus: Maybe<RecordingContentScreeningStatus>;
		contentType: RecordingContentType;
		copyrightYear: Maybe<Scalars['Int']>;
		coverImage: Maybe<Image>;
		description: Maybe<Scalars['String']>;
		distributionAgreement: Maybe<DistributionAgreement>;
		/** @deprecated Recording.downloadDisabled is replaced with Recording.isDownloadAllowed */
		downloadDisabled: Scalars['Boolean'];
		/** The duration of the primary audio source in seconds. */
		duration: Scalars['Float'];
		hasAudio: Scalars['Boolean'];
		hasVideo: Scalars['Boolean'];
		hidingReason: Maybe<Scalars['String']>;
		history: Maybe<CatalogHistoryItemConnection>;
		id: Scalars['ID'];
		imageWithFallback: Image;
		isDownloadAllowed: Scalars['Boolean'];
		isFeatured: Scalars['Boolean'];
		/** Whether the recording has been hidden. `isHidden` being `false` does not indicate the recording is published. Use `stage` to determine published status. */
		isHidden: Scalars['Boolean'];
		language: Language;
		legalScreeningCheckouts: Maybe<Array<RecordingScreeningCheckout>>;
		legalScreeningStatus: Maybe<RecordingLegalScreeningStatus>;
		mediaReleaseForm: Maybe<MediaReleaseForm>;
		persons: Array<Person>;
		publishDate: Maybe<Scalars['DateTime']>;
		recordingDate: Maybe<Scalars['RelativeDateTime']>;
		recordingTagSuggestions: RecordingTagSuggestionConnection;
		recordingTags: RecordingTagConnection;
		screeningIssues: Maybe<RecordingScreeningIssueConnection>;
		sequence: Maybe<Sequence>;
		/** The index of the recording within its sequence. */
		sequenceIndex: Maybe<Scalars['Int']>;
		/** The next recording within this recording's sequence. */
		sequenceNextRecording: Maybe<Recording>;
		/** The previous recording within this recording's sequence. */
		sequencePreviousRecording: Maybe<Recording>;
		/** A shareable short URL to this resource. */
		shareUrl: Scalars['URL'];
		sponsor: Maybe<Sponsor>;
		stage: RecordingStage;
		technicalScreeningCheckouts: Maybe<Array<RecordingScreeningCheckout>>;
		technicalScreeningStatus: Maybe<RecordingTechnicalScreeningStatus>;
		title: Scalars['String'];
		transcript: Maybe<Transcript>;
		transcriptionStatus: Maybe<RecordingTranscriptionStatus>;
		videoFiles: Array<VideoFile>;
		viewerHasFavorited: Scalars['Boolean'];
		viewerPlaybackSession: Maybe<RecordingPlaybackSession>;
		websites: Array<Website>;
	};

export type RecordingAttachmentsArgs = {
	allowedContainers: InputMaybe<Array<MediaFileContainer>>;
};

export type RecordingAudioFilesArgs = {
	allowedContainers: InputMaybe<Array<MediaFileContainer>>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
};

export type RecordingBibleReferencesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type RecordingCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type RecordingCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type RecordingHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type RecordingPersonsArgs = {
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	role: InputMaybe<PersonsRoleField>;
};

export type RecordingRecordingTagSuggestionsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type RecordingRecordingTagsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type RecordingScreeningIssuesArgs = {
	after: InputMaybe<Scalars['String']>;
	category: InputMaybe<RecordingScreeningIssueCategory>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<RecordingScreeningIssueOrder>>;
};

export type RecordingVideoFilesArgs = {
	allowedContainers: InputMaybe<Array<MediaFileContainer>>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
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
	Reject: 'REJECT',
} as const;

export type RecordingContentScreeningEvaluationRecommendation =
	typeof RecordingContentScreeningEvaluationRecommendation[keyof typeof RecordingContentScreeningEvaluationRecommendation];
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
	Unevaluated: 'UNEVALUATED',
} as const;

export type RecordingContentScreeningStatus =
	typeof RecordingContentScreeningStatus[keyof typeof RecordingContentScreeningStatus];
/** The available types of recordings. */
export const RecordingContentType = {
	AudiobookTrack: 'AUDIOBOOK_TRACK',
	BibleChapter: 'BIBLE_CHAPTER',
	MusicTrack: 'MUSIC_TRACK',
	Sermon: 'SERMON',
	Story: 'STORY',
} as const;

export type RecordingContentType =
	typeof RecordingContentType[keyof typeof RecordingContentType];
export type RecordingCreateInput = {
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	contentScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
	contentType: RecordingContentType;
	copyrightYear: InputMaybe<Scalars['Int']>;
	coverImage: InputMaybe<ImageInput>;
	description: InputMaybe<Scalars['String']>;
	distributionAgreementId: Scalars['ID'];
	hidingReason: InputMaybe<Scalars['String']>;
	isDownloadAllowed: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	legalScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
	/** Requires `ADMINISTRATION` role. */
	publishDate: InputMaybe<Scalars['DateTime']>;
	recordingDate: InputMaybe<Scalars['RelativeDateTime']>;
	recordingPersons: InputMaybe<Array<RecordingPersonRoleInput>>;
	recordingTags: InputMaybe<Array<RecordingTagInput>>;
	sequenceId: InputMaybe<Scalars['ID']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipTechnicalScreening: InputMaybe<Scalars['Boolean']>;
	sponsorId: Scalars['ID'];
	technicalScreeningCheckouts: InputMaybe<
		Array<RecordingScreeningCheckoutInput>
	>;
	title: Scalars['String'];
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type RecordingEdge = {
	__typename?: 'RecordingEdge';
	cursor: Scalars['String'];
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
	Unevaluated: 'UNEVALUATED',
} as const;

export type RecordingLegalScreeningStatus =
	typeof RecordingLegalScreeningStatus[keyof typeof RecordingLegalScreeningStatus];
export type RecordingPayload = {
	__typename?: 'RecordingPayload';
	errors: Array<InputValidationError>;
	recording: Maybe<Recording>;
};

export type RecordingPersonInput = {
	/** The ID of a person associated with the recording. */
	personId: Scalars['ID'];
	/** The role a person has with the recording. */
	role: InputMaybe<PersonsRoleField>;
};

export type RecordingPersonRoleInput = {
	/** The ID of a person associated with the recording. */
	personId: Scalars['ID'];
	/** The role a person has with the recording. */
	role: PersonsRoleField;
};

export type RecordingPlaybackSession = {
	__typename?: 'RecordingPlaybackSession';
	createdAt: Scalars['DateTime'];
	/** The playback position as a percentage of the recording duration. */
	positionPercentage: Scalars['Float'];
	updatedAt: Scalars['DateTime'];
};

/** The available bitrates of recordings. */
export const RecordingQuality = {
	Highest: 'HIGHEST',
	Low: 'LOW',
	Lowest: 'LOWEST',
} as const;

export type RecordingQuality =
	typeof RecordingQuality[keyof typeof RecordingQuality];
export type RecordingScreeningCheckout = {
	__typename?: 'RecordingScreeningCheckout';
	/** The user who assigned the screener. */
	assigner: User;
	createdAt: Scalars['DateTime'];
	/** The screener user. */
	screener: User;
};

export type RecordingScreeningCheckoutInput = {
	userId: Scalars['ID'];
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
	Unassigned: 'UNASSIGNED',
} as const;

export type RecordingScreeningContentViewFilter =
	typeof RecordingScreeningContentViewFilter[keyof typeof RecordingScreeningContentViewFilter];
export type RecordingScreeningIssue = Node & {
	__typename?: 'RecordingScreeningIssue';
	/** In HH:mm:ss format. */
	endTime: Maybe<Scalars['String']>;
	id: Scalars['ID'];
	notes: Scalars['String'];
	screener: User;
	/** In HH:mm:ss format. */
	startTime: Maybe<Scalars['String']>;
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
	Technical: 'TECHNICAL',
} as const;

export type RecordingScreeningIssueCategory =
	typeof RecordingScreeningIssueCategory[keyof typeof RecordingScreeningIssueCategory];
export type RecordingScreeningIssueConnection = {
	__typename?: 'RecordingScreeningIssueConnection';
	aggregate: Maybe<Aggregate>;
	edges: Maybe<Array<RecordingScreeningIssueEdge>>;
	nodes: Maybe<Array<RecordingScreeningIssue>>;
	pageInfo: PageInfo;
};

export type RecordingScreeningIssueEdge = {
	__typename?: 'RecordingScreeningIssueEdge';
	cursor: Scalars['String'];
	node: RecordingScreeningIssue;
};

export type RecordingScreeningIssueInput = {
	/** In HH:mm:ss format. */
	endTime: InputMaybe<Scalars['String']>;
	notes: InputMaybe<Scalars['String']>;
	recordingScreeningIssueTypeId: Scalars['ID'];
	/** In HH:mm:ss format. */
	startTime: InputMaybe<Scalars['String']>;
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
	Video: 'VIDEO',
} as const;

export type RecordingScreeningIssueTarget =
	typeof RecordingScreeningIssueTarget[keyof typeof RecordingScreeningIssueTarget];
export type RecordingScreeningIssueType = Node & {
	__typename?: 'RecordingScreeningIssueType';
	category: RecordingScreeningIssueCategory;
	id: Scalars['ID'];
	notes: Scalars['String'];
	title: Scalars['String'];
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
	cursor: Scalars['String'];
	node: RecordingScreeningIssueType;
};

/** Properties by which recording screening issue connections can be ordered. */
export const RecordingScreeningIssuesSortableField = {
	CreatedAt: 'CREATED_AT',
	Id: 'ID',
} as const;

export type RecordingScreeningIssuesSortableField =
	typeof RecordingScreeningIssuesSortableField[keyof typeof RecordingScreeningIssuesSortableField];
/** The supported screening evaluation methods. */
export const RecordingScreeningMethod = {
	Live: 'LIVE',
	Recording: 'RECORDING',
	ThirdPartyInfo: 'THIRD_PARTY_INFO',
	Transcript: 'TRANSCRIPT',
} as const;

export type RecordingScreeningMethod =
	typeof RecordingScreeningMethod[keyof typeof RecordingScreeningMethod];
/** The stages a recording may be in. */
export const RecordingStage = {
	Draft: 'DRAFT',
	Published: 'PUBLISHED',
	Scheduling: 'SCHEDULING',
	Screening: 'SCREENING',
	Withdrawn: 'WITHDRAWN',
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
	cursor: Scalars['String'];
	node: RecordingTag;
};

export type RecordingTagInput = {
	/** The name of a tag. */
	tagName: Scalars['String'];
};

export type RecordingTagSuggestion = {
	__typename?: 'RecordingTagSuggestion';
	name: Scalars['String'];
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
	cursor: Scalars['String'];
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
	Unevaluated: 'UNEVALUATED',
} as const;

export type RecordingTechnicalScreeningStatus =
	typeof RecordingTechnicalScreeningStatus[keyof typeof RecordingTechnicalScreeningStatus];
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
	Unstarted: 'UNSTARTED',
} as const;

export type RecordingTranscriptionStatus =
	typeof RecordingTranscriptionStatus[keyof typeof RecordingTranscriptionStatus];
export type RecordingUpdateInput = {
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	contentScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
	copyrightYear: InputMaybe<Scalars['Int']>;
	coverImage: InputMaybe<ImageInput>;
	description: InputMaybe<Scalars['String']>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	hidingReason: InputMaybe<Scalars['String']>;
	isDownloadAllowed: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	legalScreeningCheckouts: InputMaybe<Array<RecordingScreeningCheckoutInput>>;
	/** Requires `ADMINISTRATION` role. */
	publishDate: InputMaybe<Scalars['DateTime']>;
	recordingDate: InputMaybe<Scalars['RelativeDateTime']>;
	recordingPersons: InputMaybe<Array<RecordingPersonRoleInput>>;
	recordingTags: InputMaybe<Array<RecordingTagInput>>;
	sequenceId: InputMaybe<Scalars['ID']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipTechnicalScreening: InputMaybe<Scalars['Boolean']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	technicalScreeningCheckouts: InputMaybe<
		Array<RecordingScreeningCheckoutInput>
	>;
	title: InputMaybe<Scalars['String']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

/** Whether a viewer has played a recording or sequence. */
export const RecordingViewerPlaybackStatus = {
	Finished: 'FINISHED',
	Started: 'STARTED',
	Unstarted: 'UNSTARTED',
} as const;

export type RecordingViewerPlaybackStatus =
	typeof RecordingViewerPlaybackStatus[keyof typeof RecordingViewerPlaybackStatus];
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
	UpdatedAt: 'UPDATED_AT',
} as const;

export type RecordingsSortableField =
	typeof RecordingsSortableField[keyof typeof RecordingsSortableField];
export type Sequence = Node &
	UniformResourceLocatable & {
		__typename?: 'Sequence';
		/** The canonical HTML path to this resource. */
		canonicalPath: Scalars['String'];
		/** The canonical URL to this resource. */
		canonicalUrl: Scalars['URL'];
		collection: Maybe<Collection>;
		contentType: SequenceContentType;
		description: Scalars['String'];
		/** The combined duration of the sequence's recordings in seconds. */
		duration: Scalars['Float'];
		endDate: Maybe<Scalars['Date']>;
		hidingReason: Maybe<Scalars['String']>;
		history: Maybe<CatalogHistoryItemConnection>;
		id: Scalars['ID'];
		image: Maybe<Image>;
		imageWithFallback: Image;
		isHidden: Maybe<Scalars['Boolean']>;
		language: Language;
		/** @deprecated Sequence.logoImage is replaced with Sequence.image */
		logoImage: Maybe<Image>;
		/** @deprecated Sequence.logoImageWithFallback is replaced with Sequence.imageWithFallback */
		logoImageWithFallback: Image;
		mediaReleaseForm: Maybe<MediaReleaseForm>;
		persons: PersonConnection;
		recordings: RecordingConnection;
		/** A shareable short URL to this resource. */
		shareUrl: Scalars['URL'];
		/** Requires `ADMINISTRATION` role. */
		skipContentScreening: Maybe<Scalars['Boolean']>;
		/** Requires `ADMINISTRATION` role. */
		skipLegalScreening: Maybe<Scalars['Boolean']>;
		sponsor: Maybe<Sponsor>;
		startDate: Maybe<Scalars['Date']>;
		summary: Scalars['String'];
		title: Scalars['String'];
		viewerHasFavorited: Scalars['Boolean'];
		/** The percentage of the associated recordings the viewer has finished playing. */
		viewerPlaybackCompletedPercentage: Scalars['Float'];
	};

export type SequenceCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type SequenceCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type SequenceHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type SequencePersonsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<PersonsOrder>>;
	role: InputMaybe<PersonsRoleField>;
	search: InputMaybe<Scalars['String']>;
	startsWith: InputMaybe<Scalars['String']>;
};

export type SequenceRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
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
	StorySeason: 'STORY_SEASON',
} as const;

export type SequenceContentType =
	typeof SequenceContentType[keyof typeof SequenceContentType];
export type SequenceCreateInput = {
	collectionId: InputMaybe<Scalars['ID']>;
	contentType: SequenceContentType;
	description: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	sponsorId: Scalars['ID'];
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type SequenceEdge = {
	__typename?: 'SequenceEdge';
	cursor: Scalars['String'];
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
	Title: 'TITLE',
} as const;

export type SequenceSortableField =
	typeof SequenceSortableField[keyof typeof SequenceSortableField];
export type SequenceUpdateInput = {
	collectionId: InputMaybe<Scalars['ID']>;
	description: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	summary: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
};

export type Sponsor = Node &
	UniformResourceLocatable & {
		__typename?: 'Sponsor';
		address: Maybe<Scalars['String']>;
		/** The canonical HTML path to this resource. */
		canonicalPath: Scalars['String'];
		/** The canonical URL to this resource. */
		canonicalUrl: Scalars['URL'];
		collections: CollectionConnection;
		defaultDistributionAgreement: Maybe<DistributionAgreement>;
		description: Scalars['String'];
		distributionAgreements: Maybe<DistributionAgreementConnection>;
		email: Maybe<Scalars['String']>;
		hidingReason: Maybe<Scalars['String']>;
		history: Maybe<CatalogHistoryItemConnection>;
		id: Scalars['ID'];
		image: Maybe<Image>;
		imageWithFallback: Image;
		internalContact: Maybe<InternalContact>;
		isHidden: Scalars['Boolean'];
		language: Language;
		location: Maybe<Scalars['String']>;
		/** @deprecated Sponsor.logoImage is replaced with Sponsor.image */
		logoImage: Maybe<Image>;
		/** @deprecated Sponsor.logoImageWithFallback is replaced with Sponsor.imageWithFallback */
		logoImageWithFallback: Image;
		mediaReleaseForm: Maybe<MediaReleaseForm>;
		phone: Maybe<Scalars['String']>;
		recordings: RecordingConnection;
		sequences: SequenceConnection;
		/** A shareable short URL to this resource. */
		shareUrl: Scalars['URL'];
		/** Requires `ADMINISTRATION` role. */
		skipContentScreening: Maybe<Scalars['Boolean']>;
		/** Requires `ADMINISTRATION` role. */
		skipLegalScreening: Maybe<Scalars['Boolean']>;
		summary: Scalars['String'];
		title: Scalars['String'];
		viewerHasFavorited: Scalars['Boolean'];
		website: Maybe<Scalars['URL']>;
	};

export type SponsorCanonicalPathArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type SponsorCanonicalUrlArgs = {
	useFuturePath?: InputMaybe<Scalars['Boolean']>;
};

export type SponsorCollectionsArgs = {
	after: InputMaybe<Scalars['String']>;
	contentType: InputMaybe<CollectionContentType>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CollectionsOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type SponsorDistributionAgreementsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	isDefault: InputMaybe<Scalars['Boolean']>;
	isRetired: InputMaybe<Scalars['Boolean']>;
	licenseId: InputMaybe<Scalars['ID']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<DistributionAgreementsOrder>>;
	search: InputMaybe<Scalars['String']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type SponsorHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type SponsorRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	contentType: InputMaybe<RecordingContentType>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type SponsorSequencesArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentType?: InputMaybe<SequenceContentType>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<SequenceOrder>>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	search: InputMaybe<Scalars['String']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type SponsorConnection = {
	__typename?: 'SponsorConnection';
	aggregate: Maybe<Aggregate>;
	edges: Maybe<Array<SponsorEdge>>;
	nodes: Maybe<Array<Sponsor>>;
	pageInfo: PageInfo;
};

export type SponsorCreateInput = {
	address: InputMaybe<Scalars['String']>;
	description: InputMaybe<Scalars['String']>;
	distributionAgreements: InputMaybe<Array<SponsorDistributionAgreementInput>>;
	email: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	internalContact: InputMaybe<InternalContactInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	language: Language;
	location: InputMaybe<Scalars['String']>;
	phone: InputMaybe<Scalars['String']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
	website: InputMaybe<Scalars['URL']>;
};

export type SponsorDistributionAgreementInput = {
	isDefault: InputMaybe<Scalars['Boolean']>;
	isRetired: InputMaybe<Scalars['Boolean']>;
	licenseId: Scalars['ID'];
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type SponsorEdge = {
	__typename?: 'SponsorEdge';
	cursor: Scalars['String'];
	node: Sponsor;
};

export type SponsorPayload = {
	__typename?: 'SponsorPayload';
	errors: Array<InputValidationError>;
	sponsor: Maybe<Sponsor>;
};

export type SponsorUpdateInput = {
	address: InputMaybe<Scalars['String']>;
	description: InputMaybe<Scalars['String']>;
	distributionAgreements: InputMaybe<Array<SponsorDistributionAgreementInput>>;
	email: InputMaybe<Scalars['String']>;
	hidingReason: InputMaybe<Scalars['String']>;
	image: InputMaybe<ImageInput>;
	internalContact: InputMaybe<InternalContactInput>;
	isHidden: InputMaybe<Scalars['Boolean']>;
	location: InputMaybe<Scalars['String']>;
	phone: InputMaybe<Scalars['String']>;
	/** Requires `ADMINISTRATION` role. */
	skipContentScreening: InputMaybe<Scalars['Boolean']>;
	/** Requires `ADMINISTRATION` role. */
	skipLegalScreening: InputMaybe<Scalars['Boolean']>;
	summary: InputMaybe<Scalars['String']>;
	title: InputMaybe<Scalars['String']>;
	website: InputMaybe<Scalars['URL']>;
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
	Title: 'TITLE',
} as const;

export type SponsorsSortableField =
	typeof SponsorsSortableField[keyof typeof SponsorsSortableField];
export type SuccessPayload = {
	__typename?: 'SuccessPayload';
	errors: Array<InputValidationError>;
	success: Scalars['Boolean'];
};

export type Tag = Node & {
	__typename?: 'Tag';
	id: Scalars['ID'];
	name: Scalars['String'];
	recordings: RecordingConnection;
};

export type TagRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	contentType: InputMaybe<RecordingContentType>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
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
	cursor: Scalars['String'];
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
	SermonCount: 'SERMON_COUNT',
} as const;

export type TagsSortableField =
	typeof TagsSortableField[keyof typeof TagsSortableField];
export type TestimoniesOrder = {
	direction: OrderByDirection;
	field: TestimoniesSortableField;
};

/** Properties by which testimony connections can be ordered. */
export const TestimoniesSortableField = {
	WrittenDate: 'WRITTEN_DATE',
} as const;

export type TestimoniesSortableField =
	typeof TestimoniesSortableField[keyof typeof TestimoniesSortableField];
/** A user testimony. */
export type Testimony = Node & {
	__typename?: 'Testimony';
	author: Scalars['String'];
	body: Scalars['String'];
	id: Scalars['ID'];
	publishDate: Scalars['DateTime'];
	writtenDate: Scalars['DateTime'];
};

export type TestimonyConnection = {
	__typename?: 'TestimonyConnection';
	aggregate: Maybe<Aggregate>;
	edges: Maybe<Array<TestimonyEdge>>;
	nodes: Maybe<Array<Testimony>>;
	pageInfo: PageInfo;
};

export type TestimonyCreateInput = {
	author: Scalars['String'];
	body: Scalars['String'];
	language: Language;
	publishDate: Scalars['DateTime'];
	writtenDate: Scalars['DateTime'];
};

export type TestimonyEdge = {
	__typename?: 'TestimonyEdge';
	cursor: Scalars['String'];
	node: Testimony;
};

export type TestimonyPayload = {
	__typename?: 'TestimonyPayload';
	errors: Array<InputValidationError>;
	testimony: Maybe<Testimony>;
};

export type TestimonyUpdateInput = {
	author: InputMaybe<Scalars['String']>;
	body: InputMaybe<Scalars['String']>;
	publishDate: InputMaybe<Scalars['DateTime']>;
	writtenDate: InputMaybe<Scalars['DateTime']>;
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
	UsSamoa: 'US_SAMOA',
} as const;

export type Timezone = typeof Timezone[keyof typeof Timezone];
export type Transcript = Node & {
	__typename?: 'Transcript';
	id: Scalars['ID'];
	text: Scalars['String'];
};

export type TranscriptUpdateInput = {
	transcript: Scalars['String'];
};

/** Represents a type that can be retrieved by a URL. */
export type UniformResourceLocatable = {
	canonicalPath: Scalars['String'];
	canonicalUrl: Scalars['URL'];
	shareUrl: Scalars['URL'];
};

export type User = Node & {
	__typename?: 'User';
	/** The first line of the address. Typically the street address or PO Box number. */
	address1: Maybe<Scalars['String']>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2: Maybe<Scalars['String']>;
	/** Whether recordings should autoplay by default. */
	autoplay: Scalars['Boolean'];
	/** The name of the city, district, village, or town. */
	city: Maybe<Scalars['String']>;
	/** The name of the country. */
	country: Maybe<Scalars['String']>;
	createdAt: Scalars['DateTime'];
	downloadHistory: UserDownloadHistoryConnection;
	/** The user's email address. */
	email: Scalars['String'];
	favoritePersons: PersonConnection;
	favoriteRecordings: RecordingConnection;
	favorites: UserFavoriteConnection;
	/** The user's first name. */
	givenName: Maybe<Scalars['String']>;
	id: Scalars['ID'];
	/** The user's avatar image. */
	image: Maybe<Image>;
	/** Whether the user has permission to perform all administrative functions. */
	isSuperuser: Scalars['Boolean'];
	/** Whether the user has verified their email. */
	isVerified: Scalars['Boolean'];
	/** The user's preferred interface language. */
	language: UserLanguage;
	/** The last date the user had activity. */
	lastActivity: Scalars['DateTime'];
	/** The full name of the user, based on the values for givenName and surname. */
	name: Scalars['String'];
	/** Available only for viewer `User`. */
	notificationSubscriptions: Maybe<NotificationSubscriptionConnection>;
	/** Available only for viewer `User`. */
	notifications: Maybe<CatalogHistoryItemConnection>;
	playlist: Maybe<UserPlaylist>;
	playlists: UserPlaylistConnection;
	/** The postal or zip code. */
	postalCode: Maybe<Scalars['String']>;
	/** The user's preferred audio bitrate in kbps. */
	preferredAudioQuality: RecordingQuality;
	/** The name of the region, such as the province, state, or district. */
	province: Maybe<Scalars['String']>;
	/** The user's administrative roles. */
	roles: Array<UserLanguageRole>;
	/** The user's last name. */
	surname: Maybe<Scalars['String']>;
	/** The user's timezone. */
	timezone: Timezone;
};

export type UserDownloadHistoryArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<UserDownloadHistoryOrder>>;
};

export type UserFavoritePersonsArgs = {
	after: InputMaybe<Scalars['String']>;
	collectionId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<PersonsOrder>>;
	role: InputMaybe<PersonsRoleField>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	startsWith: InputMaybe<Scalars['String']>;
	withContentTypes: InputMaybe<Array<RecordingContentType>>;
};

export type UserFavoriteRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	orderBy: InputMaybe<Array<RecordingsOrder>>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type UserFavoritesArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	groupSequences: InputMaybe<Scalars['Boolean']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<FavoritesOrder>>;
	recordingContentType: InputMaybe<RecordingContentType>;
	recordingDuration: InputMaybe<IntegerRangeInput>;
	types: InputMaybe<Array<FavoritableCatalogEntityType>>;
	viewerPlaybackStatus: InputMaybe<RecordingViewerPlaybackStatus>;
};

export type UserNotificationSubscriptionsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	offset: InputMaybe<Scalars['Int']>;
};

export type UserNotificationsArgs = {
	after: InputMaybe<Scalars['String']>;
	dateRange: InputMaybe<DateRangeInput>;
	first: InputMaybe<Scalars['Int']>;
	isSticky: InputMaybe<Scalars['Boolean']>;
	isUnread: InputMaybe<Scalars['Boolean']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
	orderBy: InputMaybe<Array<CatalogHistoryItemOrder>>;
	viewFilters: InputMaybe<Array<CatalogHistoryItemViewFilter>>;
};

export type UserPlaylistArgs = {
	id: Scalars['ID'];
};

export type UserPlaylistsArgs = {
	after: InputMaybe<Scalars['String']>;
	first: InputMaybe<Scalars['Int']>;
	language: Language;
	offset: InputMaybe<Scalars['Int']>;
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
	address1: InputMaybe<Scalars['String']>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2: InputMaybe<Scalars['String']>;
	/** Whether recordings should autoplay by default. */
	autoplay: InputMaybe<Scalars['Boolean']>;
	/** The name of the city, district, village, or town. */
	city: InputMaybe<Scalars['String']>;
	/** The name of the country. */
	country: InputMaybe<Scalars['String']>;
	/** The user's email address. */
	email: Scalars['String'];
	/** The user's first name. */
	givenName: InputMaybe<Scalars['String']>;
	/** The user's avatar image. */
	image: InputMaybe<Scalars['Upload']>;
	/** Whether the user has permission to perform all administrative functions. */
	isSuperuser: InputMaybe<Scalars['Boolean']>;
	/** The user's preferred interface language. */
	language: InputMaybe<Language>;
	notificationSubscriptions: InputMaybe<Array<NotificationSubscriptionInput>>;
	/** The user's password. */
	password: InputMaybe<Scalars['String']>;
	/** The postal or zip code. */
	postalCode: InputMaybe<Scalars['String']>;
	/** The user's preferred audio bitrate in kbps. */
	preferredAudioQuality: InputMaybe<RecordingQuality>;
	/** The name of the region, such as the province, state, or district. */
	province: InputMaybe<Scalars['String']>;
	/** The user's administrative roles. Viewers with `ADMINISTRATION` role(s) may only manage roles for the languages they hold `ADMINISTRATION` role(s) for. */
	roles: InputMaybe<Array<UserLanguageRoleInput>>;
	/** The user's last name. */
	surname: InputMaybe<Scalars['String']>;
	/** The user's timezone. */
	timezone: InputMaybe<Timezone>;
};

export type UserDownloadHistory = {
	__typename?: 'UserDownloadHistory';
	createdAt: Scalars['DateTime'];
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
	cursor: Scalars['String'];
	node: UserDownloadHistory;
};

export type UserDownloadHistoryOrder = {
	direction: OrderByDirection;
	field: UserDownloadHistorySortableField;
};

/** Properties by which user history connections can be ordered. */
export const UserDownloadHistorySortableField = {
	CreatedAt: 'CREATED_AT',
} as const;

export type UserDownloadHistorySortableField =
	typeof UserDownloadHistorySortableField[keyof typeof UserDownloadHistorySortableField];
export type UserEdge = {
	__typename?: 'UserEdge';
	cursor: Scalars['String'];
	node: User;
};

export type UserFavorite = {
	__typename?: 'UserFavorite';
	createdAt: Scalars['DateTime'];
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
	cursor: Scalars['String'];
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
	Zulu: 'ZULU',
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
	email: Scalars['String'];
	password: Scalars['String'];
};

export type UserLoginSocialInput = {
	givenName: InputMaybe<Scalars['String']>;
	socialId: Scalars['String'];
	socialName: UserSocialServiceName;
	socialToken: Scalars['String'];
	surname: InputMaybe<Scalars['String']>;
};

export type UserPayload = {
	__typename?: 'UserPayload';
	errors: Array<InputValidationError>;
	user: Maybe<User>;
};

export type UserPlaylist = Node & {
	__typename?: 'UserPlaylist';
	createdAt: Scalars['DateTime'];
	hasRecording: Scalars['Boolean'];
	id: Scalars['ID'];
	isPublic: Scalars['Boolean'];
	language: Language;
	recordings: RecordingConnection;
	summary: Scalars['String'];
	title: Scalars['String'];
	updatedAt: Scalars['DateTime'];
};

export type UserPlaylistHasRecordingArgs = {
	id: Scalars['ID'];
};

export type UserPlaylistRecordingsArgs = {
	after: InputMaybe<Scalars['String']>;
	bibleReferences: InputMaybe<Array<BibleReferenceRangeInput>>;
	collectionId: InputMaybe<Scalars['ID']>;
	collectionIds: InputMaybe<Array<Scalars['ID']>>;
	contentScreeningStatus: InputMaybe<RecordingContentScreeningStatus>;
	distributionAgreementId: InputMaybe<Scalars['ID']>;
	first: InputMaybe<Scalars['Int']>;
	hasVideo: InputMaybe<Scalars['Boolean']>;
	includeUnpublished: InputMaybe<Scalars['Boolean']>;
	isFeatured: InputMaybe<Scalars['Boolean']>;
	legalScreeningStatus: InputMaybe<RecordingLegalScreeningStatus>;
	offset: InputMaybe<Scalars['Int']>;
	onlyArchived: InputMaybe<Scalars['Boolean']>;
	person: InputMaybe<RecordingPersonInput>;
	persons: InputMaybe<Array<RecordingPersonInput>>;
	presenterId: InputMaybe<Scalars['ID']>;
	publishDates: InputMaybe<Array<DateRangeInput>>;
	recordingDates: InputMaybe<Array<DateRangeInput>>;
	screeningContentViewFilter: InputMaybe<RecordingScreeningContentViewFilter>;
	search: InputMaybe<Scalars['String']>;
	sequenceId: InputMaybe<Scalars['ID']>;
	sequenceIds: InputMaybe<Array<Scalars['ID']>>;
	sponsorId: InputMaybe<Scalars['ID']>;
	sponsorIds: InputMaybe<Array<Scalars['ID']>>;
	stage: InputMaybe<RecordingStage>;
	tagName: InputMaybe<Scalars['String']>;
	technicalScreeningStatus: InputMaybe<RecordingTechnicalScreeningStatus>;
	updatedDates: InputMaybe<Array<DateRangeInput>>;
	viewerHasFavorited: InputMaybe<Scalars['Boolean']>;
	websiteIds: InputMaybe<Array<Scalars['ID']>>;
};

export type UserPlaylistAddInput = {
	isPublic: Scalars['Boolean'];
	language: Language;
	recordingIds: InputMaybe<Array<Scalars['ID']>>;
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
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
	cursor: Scalars['String'];
	node: UserPlaylist;
};

export type UserPlaylistUpdateInput = {
	isPublic: Scalars['Boolean'];
	summary: InputMaybe<Scalars['String']>;
	title: Scalars['String'];
};

export type UserPlaylistsOrder = {
	direction: OrderByDirection;
	field: UserPlaylistsSortableField;
};

/** Properties by which a user's playlists connection can be ordered. */
export const UserPlaylistsSortableField = {
	CreatedAt: 'CREATED_AT',
	Id: 'ID',
	Title: 'TITLE',
} as const;

export type UserPlaylistsSortableField =
	typeof UserPlaylistsSortableField[keyof typeof UserPlaylistsSortableField];
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
	TechnicalScreener: 'TECHNICAL_SCREENER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];
export type UserSignupInput = {
	email: Scalars['String'];
	givenName: InputMaybe<Scalars['String']>;
	password: Scalars['String'];
	surname: InputMaybe<Scalars['String']>;
};

/** The supported social login services. */
export const UserSocialServiceName = {
	Apple: 'APPLE',
	Facebook: 'FACEBOOK',
	Google: 'GOOGLE',
} as const;

export type UserSocialServiceName =
	typeof UserSocialServiceName[keyof typeof UserSocialServiceName];
export type UserUpdateInput = {
	/** The first line of the address. Typically the street address or PO Box number. */
	address1: InputMaybe<Scalars['String']>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2: InputMaybe<Scalars['String']>;
	/** Whether recordings should autoplay by default. */
	autoplay: InputMaybe<Scalars['Boolean']>;
	/** The name of the city, district, village, or town. */
	city: InputMaybe<Scalars['String']>;
	/** The name of the country. */
	country: InputMaybe<Scalars['String']>;
	/** The user's email address. */
	email: InputMaybe<Scalars['String']>;
	/** The user's first name. */
	givenName: InputMaybe<Scalars['String']>;
	/** The user's avatar image. */
	image: InputMaybe<Scalars['Upload']>;
	/** Whether the user has permission to perform all administrative functions. */
	isSuperuser: InputMaybe<Scalars['Boolean']>;
	/** The user's preferred interface language. */
	language: InputMaybe<Language>;
	notificationSubscriptions: InputMaybe<Array<NotificationSubscriptionInput>>;
	/** The user's password. */
	password: InputMaybe<Scalars['String']>;
	/** The postal or zip code. */
	postalCode: InputMaybe<Scalars['String']>;
	/** The user's preferred audio bitrate in kbps. */
	preferredAudioQuality: InputMaybe<RecordingQuality>;
	/** The name of the region, such as the province, state, or district. */
	province: InputMaybe<Scalars['String']>;
	/** The user's administrative roles. Viewers with `ADMINISTRATION` role(s) may only manage roles for the languages they hold `ADMINISTRATION` role(s) for. */
	roles: InputMaybe<Array<UserLanguageRoleInput>>;
	/** The user's last name. */
	surname: InputMaybe<Scalars['String']>;
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
	Id: 'ID',
} as const;

export type UsersSortableField =
	typeof UsersSortableField[keyof typeof UsersSortableField];
export type VideoFile = Node & {
	__typename?: 'VideoFile';
	/** Bitrate of the video file in kbps. */
	bitrate: Scalars['Int'];
	/** Whether the current viewer may delete the file. */
	canDelete: Maybe<Scalars['Boolean']>;
	container: Scalars['String'];
	/** The duration of the video file in seconds. */
	duration: Scalars['Float'];
	filename: Scalars['String'];
	/** In bytes */
	filesize: Scalars['String'];
	height: Scalars['Int'];
	id: Scalars['ID'];
	/** The URL to record video views for analytics. */
	logUrl: Maybe<Scalars['URL']>;
	mimeType: Scalars['String'];
	recording: Recording;
	transcodingStatus: MediaFileTranscodingStatus;
	updatedAt: Maybe<Scalars['DateTime']>;
	url: Scalars['URL'];
	width: Scalars['Int'];
};

export type VideoFileUrlArgs = {
	requestType?: InputMaybe<MediaFileRequestType>;
	skipAnalytics: InputMaybe<Scalars['Boolean']>;
};

export type Website = Node & {
	__typename?: 'Website';
	id: Scalars['ID'];
	title: Scalars['String'];
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
	cursor: Scalars['String'];
	node: Website;
};
