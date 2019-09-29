import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export class DeletePhotoPopupComponent extends Component {

    get modalBodyText() {
        if (this.props.location.startsWith('/gallery')) {
            return 'Would you like to delete this photo from gallery?';
        }
        else {
            return 'Would you like to delete this photo from gallery or only this album?';
        }
    }

    get firstButtonText() {
        return this.props.location.startsWith('/gallery') ? 'Confirm' : 'Gallery';
    }

    get footerButtons() {
        return (
            <div className="modal-footer-content">
                {this.props.location.startsWith('/gallery') ?
                    <div className="wrap-form-btn fine-button">
                        <div className="form-bgbtn"></div>
                        <button
                            onClick={this.props.onClickGallery}
                            className="form-btn fine-color">
                            {this.firstButtonText}
                        </button>
                    </div>
                    :
                    <div>
                        <div className="wrap-form-btn fine-button inline">
                            <div className="form-bgbtn"></div>
                            <button
                                onClick={this.props.onClickGallery}
                                className="form-btn fine-color">
                                {this.firstButtonText}
                            </button>
                        </div>
                        <div className="wrap-form-btn fine-button inline">
                            <div className="form-bgbtn"></div>
                            <button
                                onClick={this.props.onClickThisAlbum}
                                className="form-btn fine-color">
                                This album
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }

    render() {
        return (
            <Modal show={this.props.showDeletePhotoPopup} onHide={this.props.toggleDeletePhotoPopup}>
                <Modal.Header closeButton>
                    <Modal.Title><p className="modal-header-text">Delete photo</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-body-text">{this.modalBodyText}</p>
                </Modal.Body>
                <Modal.Footer>
                    {this.footerButtons}
                </Modal.Footer>
            </Modal>
        );
    }
}