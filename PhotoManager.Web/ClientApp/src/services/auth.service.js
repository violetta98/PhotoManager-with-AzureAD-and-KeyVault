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
          });
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
