import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { Input } from '../../controls/Input';
import { Textarea } from '../../controls/Textarea';
import { Spinner } from '../../controls/Spinner';

export class AddOrEditAlbumPopupComponent extends Component {

    render() {
        return (
            <Modal
                dialogClassName="add-album-popup-dialog"
                show={this.props.showAddOrEditAlbumPopup}
                onHide={this.props.toggleAddOrEditAlbumPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p className="modal-header-text">
                            {this.props.action === 'add' ? 'Add new album' : this.props.action === 'edit' ? 'Edit album' : ''}
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.loading ?
                        <Spinner
                            height={150}
                            width={150}
                        /> :
                        <div className="add-album-info-bar">
                            <Input
                                name={'name'}
                                value={this.props.album.name}
                                validationMessage={this.props.album.validationMessages.name}
                                onChange={this.props.onChangeField}
                                placeholder={'Album name'}
                            />
                            <Textarea
                                name={'description'}
                                value={this.props.album.description}
                                validationMessage={this.props.album.validationMessages.description}
                                onChange={this.props.onChangeField}
                                placeholder={'Description'}
                                rows={3}
                                cols={33}
                            />
                            {this.props.albumExistsFlag
                                ? <div align="center" className="red"><br/>Album with such name already exists!</div>
                                : null
                            }
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-footer-content">
                        <div className="wrap-form-btn fine-button">
                            <div className="form-bgbtn"></div>
                            <button
                                onClick={this.props.onClickContinue}
                                className="form-btn fine-color">Continue</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}
