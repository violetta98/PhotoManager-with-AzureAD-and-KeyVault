import React, { Component } from 'react';
import classNames from 'classnames/bind';

export class Input extends Component {

    get classNames() {
        return classNames({
            'input100': true,
            'has-val': this.props.value.trim() !== ''
        });
    }

    get validationClassNames() {
        return classNames({
            'wrap-input100': true,
            'validate-input': true,
            'alert-validate': this.props.validationMessage !== ''
        });
    }

    get passwordEyeClassNames() {
        return classNames({
            'zmdi': true,
            'zmdi-eye-off': this.props.showPassword,
            'zmdi-eye': !this.props.showPassword
        });
    }

    get passwordEye() {
        if (this.props.name.startsWith('password')) {
            return (
                <span onClick={this.props.onClickPasswordEye} className="btn-show-pass">
                    <i className={this.passwordEyeClassNames}></i>
                </span>
            );
        }

        return null;
    }

    get type() {
        if (this.props.name.startsWith('password') && !this.props.showPassword) {
            return 'password';
        }

        return 'text';
    }

    render() {
        return (
            <div className={this.validationClassNames}
                data-validate={this.props.validationMessage}>
                {this.passwordEye}
                <input
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className={this.classNames}
                    type={this.type} />
                <span
                    className="focus-input100"
                    data-placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}