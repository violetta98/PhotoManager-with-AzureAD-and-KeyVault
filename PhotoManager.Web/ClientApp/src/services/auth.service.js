import * as Msal from 'msal';

import { config } from './../config';

export class AuthService {

    constructor() {
        this.msalApp = new Msal.UserAgentApplication({
            auth: config.msal,
            cache: {
                cacheLocation: 'localStorage'
            }
        });
    }

    signIn() {
        return this.msalApp.loginPopup(config.msal);
    }

    getAccessToken() {
        return this.msalApp.acquireTokenSilent(config.msal)
          .then(accessToken => {
              return accessToken;
            },
            error => {
                console.log(error);
                if (this.requiresInteraction(error.errorCode)) {
                    return this.msalApp.acquireTokenPopup(config.msal)
                        .then(accessToken => {
                            return accessToken;
                        },
                        err => {
                            console.error(err);
                        }
                    );
                }
            }
          );
    }

    requiresInteraction(errorCode) {
        if (!errorCode || !errorCode.length) {
            return false;
        }
        
        return errorCode === 'consent_required' ||
            errorCode === 'interaction_required' ||
            errorCode === 'login_required';
    }

    signedIn() {
        const account = this.msalApp.getAccount();
        return account != null;
    }

    signOut() {
        this.msalApp.logout();
    }

    getUserId() {
        return this.msalApp.getAccount().accountIdentifier;
    }

    getName() {
        return this.msalApp.getAccount().name;
    }
}
