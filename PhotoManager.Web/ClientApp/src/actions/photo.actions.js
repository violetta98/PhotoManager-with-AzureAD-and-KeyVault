import { photoConstants } from '../constants/photo.constants';
import { authConstants } from '../constants/auth.constants';
import { PhotoService } from '../services/photo.service';
import { history } from '../helpers/history';

const photoService = new PhotoService();

export const toggleDisplayPhotoPopup = (photoId, photoIndex) => {
    return (dispatch) => {
        dispatch({ type: photoConstants.TOGGLE_DISPLAY_PHOTO_POPUP });
        if (photoId) {
            return photoService.getPhoto(photoId)
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => {
                            result.photoIndex = photoIndex;
                            dispatch({
                                type: photoConstants.GET_PHOTO_SUCCESS,
                                currentPhoto: result
                            });
                        });
                    }
                    else if (response.status === 401) {
                        dispatch({ type: authConstants.UNAUTHORIZED });
                        history.push('/sign-in');
                    }
                    else {
                        dispatch({ type: photoConstants.GET_PHOTO_FAILURE });
                    }
                });
        }
    };
}

export const updateCurrentPhoto = (currentPhoto) => {
    return (dispatch) => {
        dispatch({
            type: photoConstants.UPDATE_CURRENT_PHOTO,
            currentPhoto: currentPhoto
        });
    }
}

export const getPhotosByUserId = (userId, pageSize, pageIndex) => {
    return (dispatch) => {
        dispatch({ type: photoConstants.GET_PHOTOS_LOADING });
        return photoService.getPhotosByUserId(userId, pageSize, pageIndex)
            .then(response => {
                if (response.ok) {
                    const responseJson = response.json();
                    responseJson.then(result => {
                        dispatch({
                            type: photoConstants.GET_PHOTOS_SUCCESS,
                            displayedPhotos: result.photos.map((photo, photoIndex) => {
                                photo.photoIndex = (pageIndex - 1) * pageSize + photoIndex;
                                return photo;
                            }),
                            totalDisplayedPhotos: result.totalPhotos
                        });
                    });

                    return responseJson;
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: photoConstants.GET_PHOTOS_FAILURE });
                }
            });
    };
}

export const updateGalleryPageIndex = (pageIndex) => {
    return (dispatch) => {
        dispatch({
            type: photoConstants.UPDATE_GALLERY_PAGE_INDEX,
            pageIndex
        });
    }
}

export const getPhotosByAlbumId = (albumId, pageSize, pageIndex) => {
    return (dispatch) => {
        dispatch({ type: photoConstants.GET_PHOTOS_LOADING });
        return photoService.getPhotosByAlbumId(albumId, pageSize, pageIndex)
            .then(response => {
                if (response.ok) {
                    const responseJson = response.json();
                    responseJson.then(result => {
                        dispatch({
                            type: photoConstants.GET_PHOTOS_SUCCESS,
                            displayedPhotos: result.photos.map((photo, photoIndex) => {
                                photo.photoIndex = (pageIndex - 1) * pageSize + photoIndex;
                                return photo;
                            }),
                            totalDisplayedPhotos: result.totalPhotos
                        });
                    });

                    return responseJson;
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: photoConstants.GET_PHOTOS_FAILURE });
                }
            });
    };
}

export const updateAlbumPageIndex = (pageIndex) => {
    return (dispatch) => {
        dispatch({
            type: photoConstants.UPDATE_ALBUM_PAGE_INDEX,
            pageIndex
        });
    }
}

export const toggleAddOrEditPhotosPopup = (action = '', location = '', currentPhoto = null) => {
    return (dispatch) => {
        dispatch({
            type: photoConstants.TOGGLE_ADD_OR_EDIT_PHOTOS_POPUP,
            action,
            location,
            currentPhoto
        });
    };
}

export const continueAddingOrEditingPhotos = (uploadedPhotos, openDisplayPhotoPopup = false) => {
    return (dispatch) => {
        history.push('/additional-photos-info');
        dispatch({
            type: photoConstants.CONTINUE_ADDING_OR_EDITING_PHOTOS,
            uploadedPhotos,
            openDisplayPhotoPopup
        });
    };
}

export const addPhotos = (photos, location) => {
    return (dispatch) => {
        dispatch({ type: photoConstants.ADD_OR_EDIT_PHOTOS_LOADING });
        return photoService.addPhotos(photos)
            .then(response => {
                if (response.ok) {
                    dispatch({ type: photoConstants.ADD_OR_EDIT_PHOTOS_SUCCESS });
                    history.push(location);
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: photoConstants.ADD_OR_EDIT_PHOTOS_FAILURE });
                    history.push(location);
                }
            }).catch(error => {
                alert(error);
            });
    };
}

export const editPhoto = (photo, location) => {
    return (dispatch) => {
        dispatch({ type: photoConstants.ADD_OR_EDIT_PHOTOS_LOADING });
        return photoService.editPhoto(photo)
            .then(response => {
                if (response.ok) {
                    dispatch({ type: photoConstants.ADD_OR_EDIT_PHOTOS_SUCCESS });
                    history.push(location);
                }
                else if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
                else {
                    dispatch({ type: photoConstants.ADD_OR_EDIT_PHOTOS_FAILURE });
                    history.push(location);
                }
            });
    };
}

export const toggleDeletePhotoPopup = (currentPhoto = null) => {
    return (dispatch) => {
        dispatch({
            type: photoConstants.TOGGLE_DELETE_PHOTO_POPUP,
            currentPhoto
        });
    };
}

export const deletePhoto = (photoId, albumId) => {
    return (dispatch) => {
        dispatch({ type: photoConstants.DELETE_PHOTO_LOADING });
        return photoService.deletePhoto(photoId, albumId)
            .then(response => {
                if (response.status === 401) {
                    dispatch({ type: authConstants.UNAUTHORIZED });
                    history.push('/sign-in');
                }
        
                dispatch({ type: photoConstants.DELETE_PHOTO });
            });
    };
}