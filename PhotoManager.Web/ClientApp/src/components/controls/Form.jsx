import React, { Component } from 'react';

export class Form extends Component {
    render() {
        return (
            <div className="limiter">
                <div className="form-container">
                    <div className="form-wrap">
                        <form
                            onKeyPress={this.props.onEnterKeyPress}
                            className="form validate-form">
                            {this.props.children}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}