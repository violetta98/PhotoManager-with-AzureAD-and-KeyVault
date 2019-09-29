import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Validation } from '../../../helpers/validation';
import * as albumActions from '../../../actions/album.actions';
import * as photoActions from '../../../actions/photo.actions';
import { AddOrEditAlbumPopupComponent } from './AddOrEditAlbumPopupComponent';
import { config } from '../../../config';

class AddOrEditAlbumPopupContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            album: this.initAlbum(this.props.currentAlbum),
            submitted: false
        };

        this.onChangeField = this.onChangeField.bind(this);
        this.onClickContinue = this.onClickContinue.bind(this);
        this.toggleAddOrEditAlbumPopup = this.toggleAddOrEditAlbumPopup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.showAddOrEditAlbumPopup !== nextProps.showAddOrEditAlbumPopup) {
            this.setState({
                album: this.initAlbum(nextProps.currentAlbum),
                submitted: false
            });
        }
    }

    initAlbum(album) {
        return {
            name: album === null ? '' : album.name,
            description: album === null ? '' : album.description,
            validationMessages: {
                name: '',
                description: ''
            },
            userId: this.props.userId,
            albumId: album === null ? undefined : album.albumId,
            albumIndex: album === null ? undefined : album.albumIndex
        };
    }

    onChangeField(e) {
        const field = e.target.name;
        const album = this.state.album;

        album[field] = e.target.value;
        album.validationMessages[field] = this.getValidationMessage(field, album[field], this.state.submitted);

        this.setState({ album });
    }

    getValidationMessage(propertyType, property, submitted) {
        if (!submitted) {
            return '';
        }

        switch (propertyType) {
            case 'name':
                return Validation.getAlbumNameValidationMessage(property);
            case 'description':
                return Validation.getAlbumDescriptionValidationMessage(property);
        }
    }

    onClickContinue() {
        let modelIsValid = true;
        const album = this.state.album;

        const validationMessages = album.validationMessages;
        Object.keys(validationMessages).forEach((propertyType) => {
            validationMessages[propertyType] = this.getValidationMessage(propertyType, album[propertyType], true);
            modelIsValid = modelIsValid && validationMessages[propertyType] === '';
        });

        this.setState({
            submitted: true,
            album
        });

        if (modelIsValid) {
            let action = null;

            if (this.props.action === 'add') {
                action = this.props.actions.addAlbum(album);
            }
            else if (this.props.action === 'edit') {
                action = this.props.actions.editAlbum(album)
            }

            action.then((response) => {
                if (response.ok) {
                    if (this.props.location.startsWith('/album/')) {
                        this.props.actions.getAlbum(album.albumId, config.albumPhotos.pageSize, this.props.albumPageIndex);
                    }
                    else {
                        this.props.actions.getAlbums(this.props.userId, config.albums.pageSize, this.props.albumsPageIndex);
                    }
                }
            });
        }
    }

    toggleAddOrEditAlbumPopup() {
        if (this.props.location.startsWith('/album/')) {
            this.props.actions.toggleAddOrEditAlbumPopup('', this.props.currentAlbum);
        }
        else {
            this.props.actions.toggleAddOrEditAlbumPopup();
        }
    }

    render() {
        return (
            <AddOrEditAlbumPopupComponent
                album={this.state.album}
                albumExistsFlag={this.props.albumExistsFlag}
                action={this.props.action}
                loading={this.props.addOrEditAlbumLoading}
                showAddOrEditAlbumPopup={this.props.showAddOrEditAlbumPopup}
                toggleAddOrEditAlbumPopup={this.toggleAddOrEditAlbumPopup}
                onChangeField={this.onChangeField}
                onClickContinue={this.onClickContinue}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        showAddOrEditAlbumPopup: state.album.showAddOrEditAlbumPopup,
        action: state.album.action,
        currentAlbum: state.album.currentAlbum,
        loading: state.album.addOrEditAlbumLoading,
        pageIndex: state.album.pageIndex,
        location: state.routing.location.pathname,
        albumPageIndex: state.photo.albumPageIndex,
        albumsPageIndex: state.album.albumsPageIndex,
        albumExistsFlag: state.album.albumExistsFlag
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, albumActions, photoActions), dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditAlbumPopupContainer);