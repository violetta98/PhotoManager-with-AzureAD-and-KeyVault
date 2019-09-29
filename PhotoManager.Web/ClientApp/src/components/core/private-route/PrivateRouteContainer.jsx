import React from 'react';
import { Route } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteContainer = ({ component: Component, signedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        signedIn
            ? <Component {...props} />
            : <Redirect to='/sign-in' />
    )} />
)

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.signedIn
    };
};

export default withRouter(connect(mapStateToProps)(PrivateRouteContainer));