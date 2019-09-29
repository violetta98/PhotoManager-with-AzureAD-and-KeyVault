import { albumConstants } from '../constants/album.contants';
import { photoConstants } from '../constants/photo.constants';
import { authConstants } from '../constants/auth.constants';
import { AlbumService } from '../services/album.service';
import { history } from '../helpers/history';

const albumService = new AlbumService();

export const getAlbum = (albumId, pageSize, pageIndex) => {
    return (dispatch) => {
        dispatch({ type: albumConstants.GET_ALBUM_LOADING });
        return albumService.getAlbum(albumId, pageSize, pageIndex)
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {
                        dispatch({
                            type: albumConstants.GET_ALBUM_SUCCESS,
                            currentAlbum: result.album
                        });

                        dispatch({
                            type: photoConstants.GET_PHOTOS_SUCCESS,
                            displayedPhotos: result.photos.map((photo, photoIndex) => {
                                photo.photoIndex = (pageIndex - 1) * pageSize + photoIndex;
                                return photo;
                            }),
                            totalDisplayedPhotos: result.totalPhotos
                        });
                    });
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: albumConstants.GET_ALBUM_FAILURE });
                    history.push('/albums');
                }

                return response;
            });
    };
}

export const getAlbums = (userId, pageSize, pageIndex) => {
    return (dispatch) => {
        dispatch({ type: albumConstants.GET_ALBUMS_LOADING });
        return albumService.getAlbums(userId, pageSize, pageIndex)
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {
                        dispatch({
                            type: albumConstants.GET_ALBUMS_SUCCESS,
                            albums: result.albums.map((album, albumIndex) => {
                                album.albumIndex = (pageIndex - 1) * pageSize + albumIndex;
                                return album;
                            }),
                            totalAlbums: result.totalAlbums,
                            pageIndex
                        });
                    });
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: albumConstants.GET_ALBUMS_FAILURE });
                }
            });
    };
}

export const updateAlbumsPageIndex = (pageIndex) => {
    return (dispatch) => {
        dispatch({
            type: albumConstants.UPDATE_ALBUMS_PAGE_INDEX,
            pageIndex
        });
    }
}

export const getAlbumSuggestions = (userId, maxSuggestions, search = '') => {
    return (dispatch) => {
        return albumService.getAlbumSuggestions(userId, maxSuggestions, search)
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {
                        dispatch({
                            type: albumConstants.GET_ALBUM_SUGGESTIONS_SUCCESS,
                            albumSuggestions: result
                        });
                    });
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: albumConstants.GET_ALBUM_SUGGESTIONS_FAILURE });
                }
            });
    };
}

export const toggleAddOrEditAlbumPopup = (action = '', currentAlbum = null) => {
    return (dispatch) => {
        dispatch({
            type: albumConstants.TOGGLE_ADD_OR_EDIT_ALBUM_POPUP,
            action,
            currentAlbum
        });
        dispatch({
            type: albumConstants.SET_ALBUM_EXISTS_FLAG_AS_FALSE
        });
    };
}

export const addAlbum = (album) => {
    return (dispatch) => {
        dispatch({ type: albumConstants.ADD_OR_EDIT_ALBUM_LOADING });
        return albumService.addAlbum(album)
            .then(response => {
                if (response.ok) {
                    dispatch({ type: albumConstants.ADD_OR_EDIT_ALBUM_SUCCESS });
                    dispatch({ type: albumConstants.SET_ALBUM_EXISTS_FLAG_AS_FALSE });
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: albumConstants.ADD_OR_EDIT_ALBUM_FAILURE });
                    if (response.status === 409) {
                        dispatch({ type: albumConstants.SET_ALBUM_EXISTS_FLAG_AS_TRUE });
                    }
                }

                return response;
            });
    };
}

export const editAlbum = (album) => {
    return (dispatch) => {
        dispatch({ type: albumConstants.ADD_OR_EDIT_ALBUM_LOADING });
        return albumService.editAlbum(album)
            .then(response => {
                if (response.ok) {
                    dispatch({ type: albumConstants.ADD_OR_EDIT_ALBUM_SUCCESS });
                    dispatch({ type: albumConstants.SET_ALBUM_EXISTS_FLAG_AS_FALSE });
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: albumConstants.ADD_OR_EDIT_ALBUM_FAILURE });
                    if (response.status === 409) {
                        dispatch({ type: albumConstants.SET_ALBUM_EXISTS_FLAG_AS_TRUE });
                    }
                }

                return response;
            });
    };
}

export const toggleDeleteAlbumPopup = (currentAlbum = null) => {
    return (dispatch) => {
        dispatch({
            type: albumConstants.TOGGLE_DELETE_ALBUM_POPUP,
            currentAlbum
        });
    };
}

export const deleteAlbum = (albumId) => {
    return (dispatch) => {
        dispatch({ type: albumConstants.DELETE_ALBUM_LOADING });
        return albumService.deleteAlbum(albumId)
            .then(response => {
                if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }

                dispatch({ type: albumConstants.DELETE_ALBUM });
            });
    };
}