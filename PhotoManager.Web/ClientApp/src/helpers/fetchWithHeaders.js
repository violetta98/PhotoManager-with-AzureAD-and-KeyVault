import { AuthService } from '../services/auth.service';
import { getHeaders } from './getHeaders';

export const fetchWithHeaders = (apiUrl, options) => {
    return new AuthService().getAccessToken()
        .then(token => {
            options.headers = getHeaders(token.accessToken);
            return fetch(apiUrl, options);
        });
};