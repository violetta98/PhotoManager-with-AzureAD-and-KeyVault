import { photoConstants } from '../constants/photo.constants';

const initialState = {
    showDisplayPhotoPopup: false,
    currentPhoto: null,
    getPhotoLoading: false,
    showAddOrEditPhotosPopup: false,
    uploadedPhotos: [],
    addOrEditPhotosLoading: false,
    getPhotosLoading: false,
    displayedPhotos: [],
    totalDisplayedPhotos: 0,
    action: '',
    location: '',
    openDisplayPhotoPopup: false,
    showDeletePhotoPopup: false,
    deletePhotoLoading: false,
    galleryPageIndex: 1,
    albumPageIndex: 1
};

export const photo = (state = initialState, action) => {
    switch (action.type) {
        case photoConstants.TOGGLE_DISPLAY_PHOTO_POPUP:
            return {
                ...state,
                currentPhoto: null,
                showDisplayPhotoPopup: !state.showDisplayPhotoPopup,
                getPhotoLoading: !state.showDisplayPhotoPopup
            };
        case photoConstants.GET_PHOTO_SUCCESS:
            return {
                ...state,
                currentPhoto: action.currentPhoto,
                getPhotoLoading: false
            };
        case photoConstants.GET_NEXT_PHOTO_SUCCESS:
        case photoConstants.GET_PREV_PHOTO_SUCCESS:
            return {
                ...state,
                currentPhoto: action.currentPhoto
            }
        case photoConstants.GET_NEXT_PHOTO_FAILURE:
        case photoConstants.GET_PREV_PHOTO_FAILURE:
            return {
                ...state,
                currentPhoto: null
            }
        case photoConstants.GET_PHOTO_FAILURE:
            return {
                ...state,
                getPhotoLoading: false
            };
        case photoConstants.GET_PHOTOS_LOADING:
            return {
                ...state,
                getPhotosLoading: true
            }
        case photoConstants.GET_PHOTOS_SUCCESS:
            return {
                ...state,
                displayedPhotos: action.displayedPhotos,
                totalDisplayedPhotos: action.totalDisplayedPhotos,
                getPhotosLoading: false
            }
        case photoConstants.GET_PHOTOS_FAILURE:
            return {
                ...state,
                getPhotosLoading: false
            }
        case photoConstants.TOGGLE_ADD_OR_EDIT_PHOTOS_POPUP:
            return {
                ...state,
                showAddOrEditPhotosPopup: !state.showAddOrEditPhotosPopup,
                action: action.action,
                location: action.location,
                currentPhoto: action.currentPhoto
            };
        case photoConstants.CONTINUE_ADDING_OR_EDITING_PHOTOS:
            return {
                ...state,
                showAddOrEditPhotosPopup: !state.showAddOrEditPhotosPopup,
                uploadedPhotos: action.uploadedPhotos,
                openDisplayPhotoPopup: action.openDisplayPhotoPopup,
                showDisplayPhotoPopup: false
            }
        case photoConstants.ADD_OR_EDIT_PHOTOS_LOADING:
            return {
                ...state,
                addOrEditPhotosLoading: true
            }
        case photoConstants.ADD_OR_EDIT_PHOTOS_SUCCESS:
            return {
                ...state,
                uploadedPhotos: [],
                addOrEditPhotosLoading: false,
                action: '',
                location: ''
            }
        case photoConstants.ADD_OR_EDIT_PHOTOS_FAILURE:
            return {
                ...state,
                addOrEditPhotosLoading: false,
                action: '',
                location: ''
            }
        case photoConstants.TOGGLE_DELETE_PHOTO_POPUP:
            return {
                ...state,
                showDeletePhotoPopup: !state.showDeletePhotoPopup,
                currentPhoto: action.currentPhoto
            };
        case photoConstants.DELETE_PHOTO_LOADING:
            return {
                ...state,
                deletePhotoLoading: true,
                showDeletePhotoPopup: false,
                showDisplayPhotoPopup: false
            }
        case photoConstants.DELETE_PHOTO:
            return {
                ...state,
                deletePhotoLoading: false
            }
        case photoConstants.UPDATE_CURRENT_PHOTO:
            return {
                ...state,
                currentPhoto: action.currentPhoto
            }
        case photoConstants.UPDATE_GALLERY_PAGE_INDEX: {
            return {
                ...state,
                galleryPageIndex: action.pageIndex
            }
        }
        case photoConstants.UPDATE_ALBUM_PAGE_INDEX: {
            return {
                ...state,
                albumPageIndex: action.pageIndex
            }
        }
        default:
            return state;
    }
}