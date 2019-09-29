import { authConstants } from '../constants/auth.constants';
import { AuthService } from '../services/auth.service';
import { history } from '../helpers/history';

const authService = new AuthService();

export const signIn = () => {
    return (dispatch) => {
        return authService.signIn()
            .then(response => {
                dispatch({
                    type: authConstants.SIGN_IN_SUCCESS,
                    name: response.account.name,
                    userId: response.account.accountIdentifier
                });

                history.push('/gallery');
            });
    }
}
        
export const toggleSignOutPopup = () => {
    return (dispatch) => {
        dispatch({
            type: authConstants.TOGGLE_SIGN_OUT_POPUP
        });
    };
}

export const signOut = () => {
    return (dispatch) => {
        authService.signOut();
    };
}
