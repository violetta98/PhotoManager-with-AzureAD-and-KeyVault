import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { config } from '../../../config';
import * as photoActions from '../../../actions/photo.actions';
import { AddOrEditPhotosPopupComponent } from './AddOrEditPhotosPopupComponent';

const configServer = {
    process: (fieldName, file, metadata, load) => {
        setTimeout(() => {
            load(Date.now())
        }, 3500);
    },
    load: (source, load) => {
        fetch(source)
            .then(res => res.blob())
            .then(load);
    }
};

class AddOrEditPhotosPopupContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            errorFiles: [],
            noFiles: false,
            filesNotValid: false
        };

        this.onInit = this.onInit.bind(this);
        this.onUpdateFiles = this.onUpdateFiles.bind(this);
        this.onError = this.onError.bind(this);
        this.onClickContinue = this.onClickContinue.bind(this);
        this.toggleAddOrEditPhotosPopup = this.toggleAddOrEditPhotosPopup.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    onInit() {
        if (this.props.action === 'edit') {
            this.setState({
                files: [{
                    source: `${config.proxyUrl}${this.props.currentPhoto.path}`,
                    options: { type: 'local' }
                }]
            });
        }

        this.setState({
            noFiles: false,
            filesNotValid: false
        });
    }

    onUpdateFiles(fileItems) {
        this.setState({
            files: fileItems.map(fileItem => fileItem.file),
            noFiles: fileItems.length === 0
        });

        let intersection = this.state.files.filter(x => this.state.errorFiles.includes(x));
        this.setState({ filesNotValid: intersection.length !== 0 });
    }

    onError(error, fileItem) {
        this.setState({
            errorFiles: [].concat(this.state.errorFiles, fileItem.file)
        });
    }

    onClickContinue() {
        if (this.state.files.length === 0 || (this.state.files.length > 0 && this.state.files[0].size === 0)) {
            this.setState({ noFiles: true });
            return;
        }

        // we need this because error files can be added and then removed before clicking continue
        let intersection = this.state.files.filter(x => this.state.errorFiles.includes(x));
        if (intersection.length !== 0) {
            this.setState({ filesNotValid: true });
            return;
        }

        this.props.actions.continueAddingOrEditingPhotos(this.state.files, this.props.showDisplayPhotoPopup);
        this.resetState();
    }

    toggleAddOrEditPhotosPopup() {
        this.resetState();
        let currentPhoto = this.props.showDisplayPhotoPopup ? this.props.currentPhoto : null;
        this.props.actions.toggleAddOrEditPhotosPopup('', '', currentPhoto);
    }

    resetState() {
        this.setState({
            files: [],
            errorFiles: [],
            noFiles: false,
            filesNotValid: false
        });
    }

    render() {
        return (
            <AddOrEditPhotosPopupComponent
                files={this.state.files}
                noFiles={this.state.noFiles}
                filesNotValid={this.state.filesNotValid}
                showAddOrEditPhotosPopup={this.props.showAddOrEditPhotosPopup}
                toggleAddOrEditPhotosPopup={this.toggleAddOrEditPhotosPopup}
                action={this.props.action}
                allowMultiple={this.props.action === 'add'}
                onupdatefiles={this.onUpdateFiles}
                onerror={this.onError}
                onInit={this.onInit}
                maxFiles={config.photo.maxFiles}
                acceptedFileTypes={config.photo.acceptedFileTypes}
                maxFileSize={config.photo.maxFileSize} 
                imageValidateSizeMaxWidth={config.photo.imageValidateSizeMaxWidth}
                imageValidateSizeMaxHeight={config.photo.imageValidateSizeMaxHeight}
                onClickContinue={this.onClickContinue}
                server={configServer}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showAddOrEditPhotosPopup: state.photo.showAddOrEditPhotosPopup,
        action: state.photo.action,
        currentPhoto: state.photo.currentPhoto,
        showDisplayPhotoPopup: state.photo.showDisplayPhotoPopup
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(photoActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPhotosPopupContainer);