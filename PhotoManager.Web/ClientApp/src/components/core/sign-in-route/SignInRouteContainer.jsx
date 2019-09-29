import React from 'react';
import { Route } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const SignInRouteContainer = ({ component: Component, signedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        signedIn
            ? <Redirect to='/gallery' />
            : <Component {...props} />
    )} />
)

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.signedIn
    };
};

export default withRouter(connect(mapStateToProps)(SignInRouteContainer));