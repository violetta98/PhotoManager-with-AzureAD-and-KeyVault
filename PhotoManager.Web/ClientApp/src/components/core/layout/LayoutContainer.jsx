import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../../actions/auth.actions';
import { LayoutComponent } from './LayoutComponent';
import { SignOutComponent } from '../../auth/sign-out/SignOutComponent';

class LayoutContainer extends Component {

    render() {
        return (
            <div>
                <LayoutComponent
                    signedIn={this.props.signedIn}
                    name={this.props.name}
                    toggleSignOutPopup={this.props.actions.toggleSignOutPopup}
                    children={this.props.children}
                />
                <SignOutComponent
                    showSignOutPopup={this.props.showSignOutPopup}
                    toggleSignOutPopup={this.props.actions.toggleSignOutPopup}
                    signOut={this.props.actions.signOut}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.signedIn,
        name: state.auth.name,
        showSignOutPopup: state.auth.showSignOutPopup
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);