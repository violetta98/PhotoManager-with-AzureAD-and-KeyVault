import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImageValidateSize
);

export class AddOrEditPhotosPopupComponent extends Component {

    render() {
        return (
            <Modal
                dialogClassName="add-photo-popup-dialog"
                show={this.props.showAddOrEditPhotosPopup}
                onHide={this.props.toggleAddOrEditPhotosPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p className="modal-header-text">
                            {this.props.action === 'add' ? 'Add new photos' : this.props.action === 'edit' ? 'Edit photo' : ''}
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FilePond
                        files={this.props.files}
                        allowMultiple={this.props.allowMultiple}
                        onupdatefiles={this.props.onupdatefiles}
                        onerror={this.props.onerror}
                        oninit={this.props.onInit}
                        maxFiles={this.props.maxFiles}
                        acceptedFileTypes={this.props.acceptedFileTypes}
                        maxFileSize={this.props.maxFileSize}
                        imageValidateSizeMaxWidth={this.props.imageValidateSizeMaxWidth}
                        imageValidateSizeMaxHeight={this.props.imageValidateSizeMaxWidth}
                        server={this.props.server}
                    />
                    {this.props.noFiles
                        ? <div align="center" className="red"><br />Please choose files to continue!</div>
                        : null
                    }
                    {this.props.filesNotValid
                        ? <div align="center" className="red"><br />Some files are not valid! Please check them one more time!</div>
                        : null
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
