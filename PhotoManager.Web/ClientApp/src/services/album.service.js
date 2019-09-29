import { config } from './../config';
import { fetchWithHeaders } from '../helpers/fetchWithHeaders';

export class AlbumService {

    getAlbum(albumId, pageSize, pageIndex) {
        return fetchWithHeaders(`${config.apiUrl}/api/albums/${albumId}?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET'
        });
    }

    getAlbums(userId, pageSize, pageIndex) {
        return fetchWithHeaders(`${config.apiUrl}/api/albums?userId=${userId}&pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET'
        });
    }

    getAlbumSuggestions(userId, maxSuggestions, search) {
        let url = `${config.apiUrl}/api/album-suggestions?userId=${userId}&maxSuggestions=${maxSuggestions}`;
        if (search)
            url += `&${search}`;

        return fetchWithHeaders(url, {
            method: 'GET'
        });
    }

    addAlbum(album) {
        return fetchWithHeaders(`${config.apiUrl}/api/albums`, {
            method: 'POST',
            body: JSON.stringify(album)
        });
    }

    editAlbum(album) {
        return fetchWithHeaders(`${config.apiUrl}/api/albums`, {
            method: 'PATCH',
            body: JSON.stringify(album)
        });
    }

    deleteAlbum(albumId) {
        return fetchWithHeaders(`${config.apiUrl}/api/albums/${albumId}`, {
            method: 'DELETE'
        });
    }
}