import React, { Component } from 'react';

import { Button } from '../../controls/Button';
import { Form } from '../../controls/Form';

export class SignInComponent extends Component {
    render() {
        return (
            <div>
                <Form>
                    <span className="form-title p-b-26">Sign in to Photo Manager</span>
                    <div className="p-b-60">
                        <Button
                            name={'Sign in'}
                            onClick={this.props.onClickSignIn}
                        />
                    </div>
                </Form>
            </div>
        );
    }
}