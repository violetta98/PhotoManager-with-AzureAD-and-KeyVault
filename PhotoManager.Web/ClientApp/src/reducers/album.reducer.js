import { albumConstants } from '../constants/album.contants';

const initialState = {
    currentAlbum: null,
    showAddOrEditAlbumsPopup: false,
    addOrEditAlbumLoading: false,
    getAlbumsLoading: false,
    albums: [],
    totalAlbums: 0,
    action: '',
    showDeleteAlbumPopup: false,
    deleteAlbumLoading: false,
    getAlbumLoading: false,
    albumSuggestions: [],
    albumsPageIndex: 1,
    albumExistsFlag: false
};

export const album = (state = initialState, action) => {
    switch (action.type) {
        case albumConstants.GET_ALBUM_LOADING:
            return {
                ...state,
                getAlbumLoading: true
            };
        case albumConstants.GET_ALBUM_SUCCESS:
            return {
                ...state,
                currentAlbum: action.currentAlbum,
                getAlbumLoading: false
            };
        case albumConstants.GET_ALBUM_FAILURE:
            return {
                ...state,
                getAlbumLoading: false
            };
        case albumConstants.GET_ALBUMS_LOADING:
            return {
                ...state,
                getAlbumsLoading: true
            }
        case albumConstants.GET_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.albums,
                totalAlbums: action.totalAlbums,
                getAlbumsLoading: false
            }
        case albumConstants.GET_ALBUMS_FAILURE:
            return {
                ...state,
                getAlbumsLoading: false
            }
        case albumConstants.TOGGLE_ADD_OR_EDIT_ALBUM_POPUP:
            return {
                ...state,
                showAddOrEditAlbumPopup: !state.showAddOrEditAlbumPopup,
                action: action.action,
                currentAlbum: action.currentAlbum
            };
        case albumConstants.ADD_OR_EDIT_ALBUM_LOADING:
            return {
                ...state,
                addOrEditAlbumLoading: true
            }
        case albumConstants.ADD_OR_EDIT_ALBUM_SUCCESS:
            return {
                ...state,
                showAddOrEditAlbumPopup: false,
                addOrEditAlbumLoading: false,
                currentAlbum: null,
                action: ''
            }
        case albumConstants.ADD_OR_EDIT_ALBUM_FAILURE:
            return {
                ...state,
                addOrEditAlbumLoading: false
            }
        case albumConstants.TOGGLE_DELETE_ALBUM_POPUP:
            return {
                ...state,
                showDeleteAlbumPopup: !state.showDeleteAlbumPopup,
                currentAlbum: action.currentAlbum
            };
        case albumConstants.DELETE_ALBUM_LOADING:
            return {
                ...state,
                deleteAlbumLoading: true,
                showDeleteAlbumPopup: false
            }
        case albumConstants.DELETE_ALBUM:
            return {
                ...state,
                deleteAlbumLoading: false
            }
        case albumConstants.GET_ALBUM_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                albumSuggestions: action.albumSuggestions
            }
        case albumConstants.GET_ALBUM_SUGGESTIONS_FAILURE:
            return {
                ...state,
                albumSuggestions: []
            }
        case albumConstants.UPDATE_ALBUMS_PAGE_INDEX: {
            return {
                ...state,
                albumsPageIndex: action.pageIndex
            }
        }
        case albumConstants.SET_ALBUM_EXISTS_FLAG_AS_FALSE: {
            return {
                ...state,
                albumExistsFlag: false
            }
        }
        case albumConstants.SET_ALBUM_EXISTS_FLAG_AS_TRUE: {
            return {
                ...state,
                albumExistsFlag: true
            }
        }
        default:
            return state;
    }
}