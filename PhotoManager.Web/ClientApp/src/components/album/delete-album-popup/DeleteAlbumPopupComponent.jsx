import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export class DeleteAlbumPopupComponent extends Component {

    render() {
        return (
            <Modal show={this.props.showDeleteAlbumPopup} onHide={this.props.toggleDeleteAlbumPopup}>
                <Modal.Header closeButton>
                    <Modal.Title><p className="modal-header-text">Delete album</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-body-text">Are you sure you want to delete this album?</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-footer-content">
                        <div className="wrap-form-btn fine-button">
                            <div className="form-bgbtn"></div>
                            <button
                                onClick={this.props.onClickConfirm}
                                className="form-btn fine-color">
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}