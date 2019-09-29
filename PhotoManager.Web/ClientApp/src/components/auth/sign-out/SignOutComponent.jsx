import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export class SignOutComponent extends Component {
    render() {
        return (
            <Modal show={this.props.showSignOutPopup} onHide={this.props.toggleSignOutPopup}>
                <Modal.Header closeButton>
                    <Modal.Title><p className="modal-header-text">Sign out confirmation</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-body-text">Are you sure you want to leave your account?</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-footer-content">
                        <div className="wrap-form-btn fine-button">
                            <div className="form-bgbtn"></div>
                            <button onClick={this.props.signOut}
                                    className="add-form-btn"
                                    type="button"
                                >Confirm</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}