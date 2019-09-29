import React, { Component } from 'react';

export class Button extends Component {
    render() {
        return (
            <div className="container-form-btn">
                <div className="wrap-form-btn">
                    <div className="form-bgbtn"></div>
                    <button
                        onClick={this.props.onClick}
                        className="form-btn"
                        type="button">{this.props.name}</button>
                </div>
            </div>
        );
    }
}