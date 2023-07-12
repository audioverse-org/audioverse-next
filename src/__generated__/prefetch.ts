
import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';

import { GetWithAuthGuardDataQueryVariables, getWithAuthGuardData } from '~src/components/HOCs/__generated__/withAuthGuard';
import { GetHelpWidgetDataQueryVariables, getHelpWidgetData } from '~src/components/molecules/__generated__/helpWidget';
import { GetSectionBlogPostsQueryVariables, getSectionBlogPosts } from '~src/components/organisms/cardSlider/section/__generated__/blogPosts';
import { GetSectionConferencesQueryVariables, getSectionConferences } from '~src/components/organisms/cardSlider/section/__generated__/conferences';
import { GetSectionFeaturedTeachingsQueryVariables, getSectionFeaturedTeachings } from '~src/components/organisms/cardSlider/section/__generated__/featuredTeachings';
import { GetSectionRecentTeachingsQueryVariables, getSectionRecentTeachings } from '~src/components/organisms/cardSlider/section/__generated__/recentTeachings';
import { GetSectionStorySeasonsQueryVariables, getSectionStorySeasons } from '~src/components/organisms/cardSlider/section/__generated__/storySeasons';
import { GetSectionTopicsQueryVariables, getSectionTopics } from '~src/components/organisms/cardSlider/section/__generated__/topics';
import { GetSectionTrendingTeachingsQueryVariables, getSectionTrendingTeachings } from '~src/components/organisms/cardSlider/section/__generated__/trendingTeachings';
import { GetNotFoundPageDataQueryVariables, getNotFoundPageData } from '~src/components/organisms/__generated__/notFound';
import { GetSearchRecordingsQueryVariables, GetSearchSeriesQueryVariables, GetSearchConferencesQueryVariables, GetSearchSponsorsQueryVariables, GetSearchPersonsQueryVariables, GetSearchAudiobooksQueryVariables, GetSearchMusicTracksQueryVariables, GetSearchStoryProgramsQueryVariables, getSearchRecordings, getSearchSeries, getSearchConferences, getSearchSponsors, getSearchPersons, getSearchAudiobooks, getSearchMusicTracks, getSearchStoryPrograms } from '~src/components/organisms/__generated__/searchResults';
import { GetRecordingPlaybackProgressQueryVariables, getRecordingPlaybackProgress } from '~src/components/templates/__generated__/andMiniplayer';
import { GetAboutPageDataQueryVariables, getAboutPageData } from '~src/containers/about/__generated__/index';
import { GetAccountPreferencesDataQueryVariables, getAccountPreferencesData } from '~src/containers/account/__generated__/preferences';
import { GetProfileDataQueryVariables, getProfileData } from '~src/containers/account/__generated__/profile';
import { GetAudiobookDetailPageDataQueryVariables, GetAudiobookFeedDataQueryVariables, getAudiobookDetailPageData, getAudiobookFeedData } from '~src/containers/audiobook/__generated__/detail';
import { GetAudiobookListPageDataQueryVariables, getAudiobookListPageData } from '~src/containers/audiobook/__generated__/list';
import { GetAudiobookTrackDetailDataQueryVariables, getAudiobookTrackDetailData } from '~src/containers/audiobook/tracks/__generated__/detail';
import { GetAudiobibleBookDetailDataQueryVariables, getAudiobibleBookDetailData } from '~src/containers/bible/__generated__/book';
import { GetAudiobibleVersionDataQueryVariables, getAudiobibleVersionData } from '~src/containers/bible/__generated__/version';
import { GetAudiobibleVersionsDataQueryVariables, getAudiobibleVersionsData } from '~src/containers/bible/__generated__/versions';
import { GetBlogPageDataQueryVariables, getBlogPageData } from '~src/containers/__generated__/blog';
import { GetBlogDetailDataQueryVariables, getBlogDetailData } from '~src/containers/blog/__generated__/detail';
import { GetCollectionDetailPageDataQueryVariables, GetCollectionFeedDataQueryVariables, getCollectionDetailPageData, getCollectionFeedData } from '~src/containers/collection/__generated__/detail';
import { GetCollectionListPageDataQueryVariables, getCollectionListPageData } from '~src/containers/collection/__generated__/list';
import { GetCollectionPresentersPageDataQueryVariables, getCollectionPresentersPageData } from '~src/containers/collection/__generated__/presenters';
import { GetCollectionSequencesPageDataQueryVariables, getCollectionSequencesPageData } from '~src/containers/collection/__generated__/sequences';
import { GetCollectionTeachingsPageDataQueryVariables, getCollectionTeachingsPageData } from '~src/containers/collection/__generated__/teachings';
import { GetDiscoverCollectionsPageDataQueryVariables, getDiscoverCollectionsPageData } from '~src/containers/discover/__generated__/collections';
import { GetHomeStaticPropsQueryVariables, getHomeStaticProps } from '~src/containers/__generated__/home';
import { GetLibraryHistoryPageDataQueryVariables, getLibraryHistoryPageData } from '~src/containers/library/__generated__/history';
import { GetLibraryDataQueryVariables, getLibraryData } from '~src/containers/library/__generated__/library';
import { GetLibraryPlaylistPageDataQueryVariables, getLibraryPlaylistPageData } from '~src/containers/library/playlist/__generated__/detail';
import { GetLibraryPlaylistsDataQueryVariables, getLibraryPlaylistsData } from '~src/containers/library/playlist/__generated__/list';
import { GetCustomDetailPageDataQueryVariables, getCustomDetailPageData } from '~src/containers/page/__generated__/detail';
import { GetPresenterAppearsPageDataQueryVariables, getPresenterAppearsPageData } from '~src/containers/presenter/__generated__/appears';
import { GetPresenterDetailPageDataQueryVariables, getPresenterDetailPageData } from '~src/containers/presenter/__generated__/detail';
import { GetPresenterListAllPageDataQueryVariables, getPresenterListAllPageData } from '~src/containers/presenter/list/__generated__/all';
import { GetPresenterListLetterPageDataQueryVariables, getPresenterListLetterPageData } from '~src/containers/presenter/list/__generated__/letter';
import { GetPersonListLetterCountsQueryVariables, getPersonListLetterCounts } from '~src/containers/presenter/list/__generated__/list';
import { GetPresenterRecordingsPageDataQueryVariables, GetPresenterRecordingsFeedDataQueryVariables, getPresenterRecordingsPageData, getPresenterRecordingsFeedData } from '~src/containers/presenter/__generated__/recordings';
import { GetPresenterSequencesPageDataQueryVariables, getPresenterSequencesPageData } from '~src/containers/presenter/__generated__/sequences';
import { GetPresenterTopPageDataQueryVariables, getPresenterTopPageData } from '~src/containers/presenter/__generated__/top';
import { GetMediaReleaseFormsPageDataQueryVariables, getMediaReleaseFormsPageData } from '~src/containers/release/__generated__/detail';
import { GetSearchResultsCollectionsQueryVariables, getSearchResultsCollections } from '~src/containers/search/__generated__/collections';
import { GetSearchResultsPersonsQueryVariables, getSearchResultsPersons } from '~src/containers/search/__generated__/persons';
import { GetSearchResultsSequencesQueryVariables, getSearchResultsSequences } from '~src/containers/search/__generated__/sequences';
import { GetSearchResultsSponsorsQueryVariables, getSearchResultsSponsors } from '~src/containers/search/__generated__/sponsors';
import { GetSearchResultsRecordingsQueryVariables, getSearchResultsRecordings } from '~src/containers/search/__generated__/teachings';
import { GetSeriesDetailPageDataQueryVariables, GetSeriesFeedDataQueryVariables, getSeriesDetailPageData, getSeriesFeedData } from '~src/containers/series/__generated__/detail';
import { GetSeriesListPageDataQueryVariables, getSeriesListPageData } from '~src/containers/series/__generated__/list';
import { GetSermonDetailDataQueryVariables, getSermonDetailData } from '~src/containers/sermon/__generated__/detail';
import { GetSermonListPageDataQueryVariables, GetSermonListFeedDataQueryVariables, getSermonListPageData, getSermonListFeedData } from '~src/containers/sermon/__generated__/list';
import { GetTrendingTeachingsPageDataQueryVariables, getTrendingTeachingsPageData } from '~src/containers/sermon/__generated__/trending';
import { GetSongAlbumsDetailPageDataQueryVariables, GetSongAlbumFeedDataQueryVariables, getSongAlbumsDetailPageData, getSongAlbumFeedData } from '~src/containers/song/albums/__generated__/detail';
import { GetSongAlbumsListPageDataQueryVariables, getSongAlbumsListPageData } from '~src/containers/song/albums/__generated__/list';
import { GetSongBooksDetailPageDataQueryVariables, getSongBooksDetailPageData } from '~src/containers/song/books/__generated__/detail';
import { GetBookSongDetailDataQueryVariables, getBookSongDetailData } from '~src/containers/song/books/__generated__/track';
import { GetSongDetailDataQueryVariables, getSongDetailData } from '~src/containers/song/__generated__/detail';
import { GetSponsorConferencesPageDataQueryVariables, getSponsorConferencesPageData } from '~src/containers/sponsor/__generated__/conferences';
import { GetSponsorDetailPageDataQueryVariables, getSponsorDetailPageData } from '~src/containers/sponsor/__generated__/detail';
import { GetSponsorListAllPageDataQueryVariables, getSponsorListAllPageData } from '~src/containers/sponsor/list/__generated__/all';
import { GetSponsorListLetterPageDataQueryVariables, getSponsorListLetterPageData } from '~src/containers/sponsor/list/__generated__/letter';
import { GetSponsorListLetterCountsQueryVariables, getSponsorListLetterCounts } from '~src/containers/sponsor/list/__generated__/list';
import { GetSponsorSeriesPageDataQueryVariables, getSponsorSeriesPageData } from '~src/containers/sponsor/__generated__/series';
import { GetSponsorTeachingsPageDataQueryVariables, GetSponsorTeachingsFeedDataQueryVariables, getSponsorTeachingsPageData, getSponsorTeachingsFeedData } from '~src/containers/sponsor/__generated__/teachings';
import { GetStoryAlbumDetailPageDataQueryVariables, GetStoryAlbumFeedDataQueryVariables, getStoryAlbumDetailPageData, getStoryAlbumFeedData } from '~src/containers/story/albums/__generated__/detail';
import { GetStoriesAlbumsPageDataQueryVariables, GetStoriesAlbumsPathDataQueryVariables, getStoriesAlbumsPageData, getStoriesAlbumsPathData } from '~src/containers/story/albums/__generated__/list';
import { GetStoryDetailDataQueryVariables, getStoryDetailData } from '~src/containers/story/__generated__/detail';
import { GetTestimoniesPageDataQueryVariables, getTestimoniesPageData } from '~src/containers/__generated__/testimonies';
import { GetTopicDetailDataQueryVariables, getTopicDetailData } from '~src/containers/topic/__generated__/detail';
import { GetBibleBookContentQueryVariables, getBibleBookContent } from '~src/lib/api/__generated__/bibleContent';
import { CollectionIsFavoritedQueryVariables, collectionIsFavorited } from '~src/lib/api/__generated__/collectionIsFavorited';
import { PersonIsFavoritedQueryVariables, personIsFavorited } from '~src/lib/api/__generated__/personIsFavorited';
import { RecordingIsFavoritedQueryVariables, recordingIsFavorited } from '~src/lib/api/__generated__/recordingIsFavorited';
import { SequenceIsFavoritedQueryVariables, sequenceIsFavorited } from '~src/lib/api/__generated__/sequenceIsFavorited';
import { SponsorIsFavoritedQueryVariables, sponsorIsFavorited } from '~src/lib/api/__generated__/sponsorIsFavorited';

type Fn<T> = (vars: T) => Promise<unknown>;
type Key = keyof typeof fns;
type Vars = {
	[K in Key]?: Parameters<typeof fns[K]>[0];
};

const options = { cacheTime: 24 * 60 * 60 * 1000 };

async function doPrefetch<T extends Key>(k: T, v: Vars[T], client: QueryClient) {
	const r = await fns[k](v as any);
	await client.prefetchQuery([k, v], () => r, options);
	await client.prefetchInfiniteQuery([`${k}.infinite`, v], () => r, options);	
}

export async function prefetchQueries(
	vars: Vars,
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const queries = Object.keys(vars) as Key[];

	await Promise.all(
		queries.map(k => doPrefetch(k, vars[k], client))
	);
	
	return client;
}

const fns = {
	getWithAuthGuardData: getWithAuthGuardData as Fn<GetWithAuthGuardDataQueryVariables>,
	getHelpWidgetData: getHelpWidgetData as Fn<GetHelpWidgetDataQueryVariables>,
	getSectionBlogPosts: getSectionBlogPosts as Fn<GetSectionBlogPostsQueryVariables>,
	getSectionConferences: getSectionConferences as Fn<GetSectionConferencesQueryVariables>,
	getSectionFeaturedTeachings: getSectionFeaturedTeachings as Fn<GetSectionFeaturedTeachingsQueryVariables>,
	getSectionRecentTeachings: getSectionRecentTeachings as Fn<GetSectionRecentTeachingsQueryVariables>,
	getSectionStorySeasons: getSectionStorySeasons as Fn<GetSectionStorySeasonsQueryVariables>,
	getSectionTopics: getSectionTopics as Fn<GetSectionTopicsQueryVariables>,
	getSectionTrendingTeachings: getSectionTrendingTeachings as Fn<GetSectionTrendingTeachingsQueryVariables>,
	getNotFoundPageData: getNotFoundPageData as Fn<GetNotFoundPageDataQueryVariables>,
	getSearchRecordings: getSearchRecordings as Fn<GetSearchRecordingsQueryVariables>,
	getSearchSeries: getSearchSeries as Fn<GetSearchSeriesQueryVariables>,
	getSearchConferences: getSearchConferences as Fn<GetSearchConferencesQueryVariables>,
	getSearchSponsors: getSearchSponsors as Fn<GetSearchSponsorsQueryVariables>,
	getSearchPersons: getSearchPersons as Fn<GetSearchPersonsQueryVariables>,
	getSearchAudiobooks: getSearchAudiobooks as Fn<GetSearchAudiobooksQueryVariables>,
	getSearchMusicTracks: getSearchMusicTracks as Fn<GetSearchMusicTracksQueryVariables>,
	getSearchStoryPrograms: getSearchStoryPrograms as Fn<GetSearchStoryProgramsQueryVariables>,
	getRecordingPlaybackProgress: getRecordingPlaybackProgress as Fn<GetRecordingPlaybackProgressQueryVariables>,
	getAboutPageData: getAboutPageData as Fn<GetAboutPageDataQueryVariables>,
	getAccountPreferencesData: getAccountPreferencesData as Fn<GetAccountPreferencesDataQueryVariables>,
	getProfileData: getProfileData as Fn<GetProfileDataQueryVariables>,
	getAudiobookDetailPageData: getAudiobookDetailPageData as Fn<GetAudiobookDetailPageDataQueryVariables>,
	getAudiobookFeedData: getAudiobookFeedData as Fn<GetAudiobookFeedDataQueryVariables>,
	getAudiobookListPageData: getAudiobookListPageData as Fn<GetAudiobookListPageDataQueryVariables>,
	getAudiobookTrackDetailData: getAudiobookTrackDetailData as Fn<GetAudiobookTrackDetailDataQueryVariables>,
	getAudiobibleBookDetailData: getAudiobibleBookDetailData as Fn<GetAudiobibleBookDetailDataQueryVariables>,
	getAudiobibleVersionData: getAudiobibleVersionData as Fn<GetAudiobibleVersionDataQueryVariables>,
	getAudiobibleVersionsData: getAudiobibleVersionsData as Fn<GetAudiobibleVersionsDataQueryVariables>,
	getBlogPageData: getBlogPageData as Fn<GetBlogPageDataQueryVariables>,
	getBlogDetailData: getBlogDetailData as Fn<GetBlogDetailDataQueryVariables>,
	getCollectionDetailPageData: getCollectionDetailPageData as Fn<GetCollectionDetailPageDataQueryVariables>,
	getCollectionFeedData: getCollectionFeedData as Fn<GetCollectionFeedDataQueryVariables>,
	getCollectionListPageData: getCollectionListPageData as Fn<GetCollectionListPageDataQueryVariables>,
	getCollectionPresentersPageData: getCollectionPresentersPageData as Fn<GetCollectionPresentersPageDataQueryVariables>,
	getCollectionSequencesPageData: getCollectionSequencesPageData as Fn<GetCollectionSequencesPageDataQueryVariables>,
	getCollectionTeachingsPageData: getCollectionTeachingsPageData as Fn<GetCollectionTeachingsPageDataQueryVariables>,
	getDiscoverCollectionsPageData: getDiscoverCollectionsPageData as Fn<GetDiscoverCollectionsPageDataQueryVariables>,
	getHomeStaticProps: getHomeStaticProps as Fn<GetHomeStaticPropsQueryVariables>,
	getLibraryHistoryPageData: getLibraryHistoryPageData as Fn<GetLibraryHistoryPageDataQueryVariables>,
	getLibraryData: getLibraryData as Fn<GetLibraryDataQueryVariables>,
	getLibraryPlaylistPageData: getLibraryPlaylistPageData as Fn<GetLibraryPlaylistPageDataQueryVariables>,
	getLibraryPlaylistsData: getLibraryPlaylistsData as Fn<GetLibraryPlaylistsDataQueryVariables>,
	getCustomDetailPageData: getCustomDetailPageData as Fn<GetCustomDetailPageDataQueryVariables>,
	getPresenterAppearsPageData: getPresenterAppearsPageData as Fn<GetPresenterAppearsPageDataQueryVariables>,
	getPresenterDetailPageData: getPresenterDetailPageData as Fn<GetPresenterDetailPageDataQueryVariables>,
	getPresenterListAllPageData: getPresenterListAllPageData as Fn<GetPresenterListAllPageDataQueryVariables>,
	getPresenterListLetterPageData: getPresenterListLetterPageData as Fn<GetPresenterListLetterPageDataQueryVariables>,
	getPersonListLetterCounts: getPersonListLetterCounts as Fn<GetPersonListLetterCountsQueryVariables>,
	getPresenterRecordingsPageData: getPresenterRecordingsPageData as Fn<GetPresenterRecordingsPageDataQueryVariables>,
	getPresenterRecordingsFeedData: getPresenterRecordingsFeedData as Fn<GetPresenterRecordingsFeedDataQueryVariables>,
	getPresenterSequencesPageData: getPresenterSequencesPageData as Fn<GetPresenterSequencesPageDataQueryVariables>,
	getPresenterTopPageData: getPresenterTopPageData as Fn<GetPresenterTopPageDataQueryVariables>,
	getMediaReleaseFormsPageData: getMediaReleaseFormsPageData as Fn<GetMediaReleaseFormsPageDataQueryVariables>,
	getSearchResultsCollections: getSearchResultsCollections as Fn<GetSearchResultsCollectionsQueryVariables>,
	getSearchResultsPersons: getSearchResultsPersons as Fn<GetSearchResultsPersonsQueryVariables>,
	getSearchResultsSequences: getSearchResultsSequences as Fn<GetSearchResultsSequencesQueryVariables>,
	getSearchResultsSponsors: getSearchResultsSponsors as Fn<GetSearchResultsSponsorsQueryVariables>,
	getSearchResultsRecordings: getSearchResultsRecordings as Fn<GetSearchResultsRecordingsQueryVariables>,
	getSeriesDetailPageData: getSeriesDetailPageData as Fn<GetSeriesDetailPageDataQueryVariables>,
	getSeriesFeedData: getSeriesFeedData as Fn<GetSeriesFeedDataQueryVariables>,
	getSeriesListPageData: getSeriesListPageData as Fn<GetSeriesListPageDataQueryVariables>,
	getSermonDetailData: getSermonDetailData as Fn<GetSermonDetailDataQueryVariables>,
	getSermonListPageData: getSermonListPageData as Fn<GetSermonListPageDataQueryVariables>,
	getSermonListFeedData: getSermonListFeedData as Fn<GetSermonListFeedDataQueryVariables>,
	getTrendingTeachingsPageData: getTrendingTeachingsPageData as Fn<GetTrendingTeachingsPageDataQueryVariables>,
	getSongAlbumsDetailPageData: getSongAlbumsDetailPageData as Fn<GetSongAlbumsDetailPageDataQueryVariables>,
	getSongAlbumFeedData: getSongAlbumFeedData as Fn<GetSongAlbumFeedDataQueryVariables>,
	getSongAlbumsListPageData: getSongAlbumsListPageData as Fn<GetSongAlbumsListPageDataQueryVariables>,
	getSongBooksDetailPageData: getSongBooksDetailPageData as Fn<GetSongBooksDetailPageDataQueryVariables>,
	getBookSongDetailData: getBookSongDetailData as Fn<GetBookSongDetailDataQueryVariables>,
	getSongDetailData: getSongDetailData as Fn<GetSongDetailDataQueryVariables>,
	getSponsorConferencesPageData: getSponsorConferencesPageData as Fn<GetSponsorConferencesPageDataQueryVariables>,
	getSponsorDetailPageData: getSponsorDetailPageData as Fn<GetSponsorDetailPageDataQueryVariables>,
	getSponsorListAllPageData: getSponsorListAllPageData as Fn<GetSponsorListAllPageDataQueryVariables>,
	getSponsorListLetterPageData: getSponsorListLetterPageData as Fn<GetSponsorListLetterPageDataQueryVariables>,
	getSponsorListLetterCounts: getSponsorListLetterCounts as Fn<GetSponsorListLetterCountsQueryVariables>,
	getSponsorSeriesPageData: getSponsorSeriesPageData as Fn<GetSponsorSeriesPageDataQueryVariables>,
	getSponsorTeachingsPageData: getSponsorTeachingsPageData as Fn<GetSponsorTeachingsPageDataQueryVariables>,
	getSponsorTeachingsFeedData: getSponsorTeachingsFeedData as Fn<GetSponsorTeachingsFeedDataQueryVariables>,
	getStoryAlbumDetailPageData: getStoryAlbumDetailPageData as Fn<GetStoryAlbumDetailPageDataQueryVariables>,
	getStoryAlbumFeedData: getStoryAlbumFeedData as Fn<GetStoryAlbumFeedDataQueryVariables>,
	getStoriesAlbumsPageData: getStoriesAlbumsPageData as Fn<GetStoriesAlbumsPageDataQueryVariables>,
	getStoriesAlbumsPathData: getStoriesAlbumsPathData as Fn<GetStoriesAlbumsPathDataQueryVariables>,
	getStoryDetailData: getStoryDetailData as Fn<GetStoryDetailDataQueryVariables>,
	getTestimoniesPageData: getTestimoniesPageData as Fn<GetTestimoniesPageDataQueryVariables>,
	getTopicDetailData: getTopicDetailData as Fn<GetTopicDetailDataQueryVariables>,
	getBibleBookContent: getBibleBookContent as Fn<GetBibleBookContentQueryVariables>,
	collectionIsFavorited: collectionIsFavorited as Fn<CollectionIsFavoritedQueryVariables>,
	personIsFavorited: personIsFavorited as Fn<PersonIsFavoritedQueryVariables>,
	recordingIsFavorited: recordingIsFavorited as Fn<RecordingIsFavoritedQueryVariables>,
	sequenceIsFavorited: sequenceIsFavorited as Fn<SequenceIsFavoritedQueryVariables>,
	sponsorIsFavorited: sponsorIsFavorited as Fn<SponsorIsFavoritedQueryVariables>,
};
