import React, { Component } from 'react';
import classNames from 'classnames/bind';

export class Textarea extends Component {
    get validationClassNames() {
        return classNames({
            'validate-input': true,
            'textarea-alert-validate': this.props.validationMessage !== ''
        });
    }

    render() {
        return (
            <div className={this.validationClassNames}
                data-validate={this.props.validationMessage}>
                <textarea
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className="form-control custom-textarea"
                    rows={this.props.rows}
                    cols={this.props.cols}
                    placeholder={this.props.placeholder}
                ></textarea>
            </div>
        );
    }
}