import { config } from './../config';
import { fetchWithHeaders } from '../helpers/fetchWithHeaders';

export class PhotoService {

    getPhoto(photoId) {
        return fetchWithHeaders(`${config.apiUrl}/api/photos/${photoId}`, {
            method: 'GET'
        });
    }

    getPhotosByUserId(userId, pageSize, pageIndex) {
        return fetchWithHeaders(`${config.apiUrl}/api/users/${userId}/photos?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET'
        });
    }

    getPhotosByAlbumId(albumId, pageSize, pageIndex) {
        return fetchWithHeaders(`${config.apiUrl}/api/albums/${albumId}/photos?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET'
        });
    }

    addPhotos(photos) {
        return fetchWithHeaders(`${config.apiUrl}/api/photos`, {
            method: 'POST',
            body: JSON.stringify(photos)
        });
    }

    editPhoto(photo) {
        return fetchWithHeaders(`${config.apiUrl}/api/photos`, {
            method: 'PATCH',
            body: JSON.stringify(photo)
        });
    }

    deletePhoto(photoId, albumId) {
        let url = `${config.apiUrl}/api/photos/${photoId}`;
        if (albumId !== null)
            url += `?albumId=${albumId}`;

        return fetchWithHeaders(url, {
            method: 'DELETE'
        });
    }
}