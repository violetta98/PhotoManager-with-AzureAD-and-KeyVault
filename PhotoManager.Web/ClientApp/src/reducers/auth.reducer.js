import { authConstants } from '../constants/auth.constants';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();
const initialState = authService.signedIn() ?
    {
        signedIn: true,
        userId: authService.getUserId(),
        name: authService.getName()
    }
    :
    {
        signedIn: false,
        userId: null,
        name: null
    };

initialState.showSignOutPopup = false;

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                signedIn: true,
                name: action.name,
                userId: action.userId
            };
        case authConstants.UNAUTHORIZED:
            return {
                ...state,
                signedIn: false,
                name: null,
                userId: null,
                showSignOutPopup: false
            };
        case authConstants.TOGGLE_SIGN_OUT_POPUP:
            return {
                ...state,
                showSignOutPopup: !state.showSignOutPopup
            };
        default:
            return state;
    }
}