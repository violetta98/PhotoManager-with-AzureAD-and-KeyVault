import React, { Component } from 'react';

import { HeaderComponent } from '../header/HeaderComponent';

export class LayoutComponent extends Component {

    get header() {
        return this.props.signedIn
            ? <HeaderComponent
                name={this.props.name}
                toggleSignOutPopup={this.props.toggleSignOutPopup}
            />
            : null;
    }

    render() {
        return (
            <div>
                {this.header}
                {this.props.children}
            </div>
        );
    }
}