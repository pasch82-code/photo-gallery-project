import { takeEvery, all } from 'redux-saga/effects'
import { searchPostsByChannelNameSaga } from './posts/searchPostsByChannelNameSaga';
import { loadMorePostsSaga } from './posts/loadMorePostsSaga';
import { getFavoritesPostsSaga } from './favorites/getFavoritesPostsSaga';
import { loadMoreFavoritesSaga } from './favorites/loadMoreFavoritesSaga';
import { loadMorePostsStart, searchPostsByChannelNameStart } from '../state/posts/postsSlice';
import { getFavoritesPostsStart, loadMoreFavoritesStart } from '../state/favorites/favoritesSlice';

function* saga(): Generator {

    yield all([
        takeEvery(searchPostsByChannelNameStart.type, searchPostsByChannelNameSaga),
        takeEvery(loadMorePostsStart.type, loadMorePostsSaga),
        takeEvery(getFavoritesPostsStart.type, getFavoritesPostsSaga),
        takeEvery(loadMoreFavoritesStart.type, loadMoreFavoritesSaga)
    ]);
}

export default saga;