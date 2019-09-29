import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SignInComponent } from './SignInComponent';
import * as authActions from '../../../actions/auth.actions';

class SignInContainer extends Component {
    constructor(props) {
        super(props);
        this.onClickSignIn = this.onClickSignIn.bind(this);
    }

    onClickSignIn() {
        this.props.actions.signIn();
    }

    render() {
        return (
            <SignInComponent
                onClickSignIn={this.onClickSignIn}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(SignInContainer);