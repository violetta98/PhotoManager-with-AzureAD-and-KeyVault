import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { config } from '../../../config';
import { Validation } from '../../../helpers/validation';
import * as photoActions from '../../../actions/photo.actions';
import * as albumActions from '../../../actions/album.actions';
import { AdditionalPhotosInfoComponent } from './AdditionalPhotosInfoComponent';

class AdditionalPhotosInfoContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photos: this.props.uploadedPhotos.map((uploadedPhoto, id) => ({
                id: id,
                url: URL.createObjectURL(uploadedPhoto),
                base64: '',
                name: this.props.action === 'add' ? uploadedPhoto.name : this.props.currentPhoto.name,
                description: this.props.action === 'add' ? '' : this.props.currentPhoto.description,
                size: uploadedPhoto.size,
                validationMessages: {
                    name: '',
                    description: ''
                },
                albums: this.getInitialAlbums(),
                userId: this.props.userId,
                photoId: this.props.action === 'add' ? undefined : this.props.currentPhoto.photoId,
                photoIndex: this.props.action === 'add' ? undefined : this.props.currentPhoto.photoIndex
            })),
            submitted: false,
            photosInfoNotValid: false
        };

        this.onClickContinue = this.onClickContinue.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
        this.onFocusAlbums = this.onFocusAlbums.bind(this);
        this.onInputAlbums = this.onInputAlbums.bind(this);
        this.onAddAlbum = this.onAddAlbum.bind(this);
        this.onRemoveAlbum = this.onRemoveAlbum.bind(this);
    }

    componentWillMount() {
        if (this.props.uploadedPhotos.length === 0) {
            this.props.history.push('/gallery');
            return;
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.getAlbumSuggestions(this.props.userId, 5, '');
        this.props.uploadedPhotos.forEach((file, id) => {
            this.getBase64(file).then(data => {
                const photos = this.state.photos;
                photos[id].base64 = data;
                this.setState({ photos });
            });
        });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    getInitialAlbums() {
        if (this.props.action === 'add') {
            if (this.props.location.startsWith('/album/')) {
                return [{
                    albumId: this.props.currentAlbum.albumId,
                    name: this.props.currentAlbum.name
                }];
            } else {
                return [];
            }
        } else {
            return this.props.currentPhoto.albums.map(album => ({ albumId: album.item1, name: album.item2 }));
        }
    }

    onFocusAlbums() {
        this.props.actions.getAlbumSuggestions(this.props.userId, 5, '');
    }

    onInputAlbums(search) {
        this.props.actions.getAlbumSuggestions(this.props.userId, 5, search);
    }

    onAddAlbum(album, photoId) {
        const photos = this.state.photos;
        if (!photos[photoId].albums.some(e => e.albumId === album.albumId)) {
            photos[photoId].albums = [].concat(photos[photoId].albums, album);
            this.setState({ photos });
            this.props.actions.getAlbumSuggestions(this.props.userId, 5, '');
        }
    }

    onRemoveAlbum(albumId, photoId) {
        const photos = this.state.photos;
        const albums = photos[photoId].albums.slice(0);
        albums.splice(albumId, 1);
        photos[photoId].albums = albums;
        this.setState({ photos });
    }

    onChangeField(e) {
        const field = e.target.name;
        const id = Number(e.target.id);

        const photos = this.state.photos;
        photos[id][field] = e.target.value;
        photos[id].validationMessages[field] = this.getValidationMessage(field, photos[id][field], this.state.submitted);

        this.setState({ photos });

        if (this.state.submitted) {
            let modelIsValid = true;
            photos.forEach(photo => {
                Object.keys(photo.validationMessages).forEach((propertyType) => {
                    modelIsValid = modelIsValid && photo.validationMessages[propertyType] === '';
                });
            });
            this.setState({ photosInfoNotValid: !modelIsValid });
        }
    }

    onClickContinue() {
        let modelIsValid = true;
        const photos = this.state.photos;

        photos.forEach(photo => {
            const validationMessages = photo.validationMessages;
            Object.keys(validationMessages).forEach((propertyType) => {
                validationMessages[propertyType] = this.getValidationMessage(propertyType, photo[propertyType], true);
                modelIsValid = modelIsValid && validationMessages[propertyType] === '';
            });
        });

        this.setState({
            submitted: true,
            photos
        });

        if (modelIsValid) {
            const photosData = this.state.photos.map(photo => ({
                base64: photo.base64,
                name: photo.name,
                description: photo.description,
                size: photo.size,
                userId: photo.userId,
                photoId: photo.photoId,
                photoIndex: photo.photoIndex,
                albumIds: photo.albums.map(album => album.albumId)
            }));

            let isAlbumPage = this.props.location.startsWith('/album/');

            if (this.props.action === 'add') {
                this.props.actions.addPhotos(photosData, this.props.location);
            }
            else if (this.props.action === 'edit') {
                this.props.actions.editPhoto(photosData[0], this.props.location)
                    .then(() => {
                        if (this.props.openDisplayPhotoPopup) {
                            if (isAlbumPage && !photosData[0].albumIds.includes(this.props.currentAlbum.albumId)) {
                                return;
                            } else {
                                this.props.actions.toggleDisplayPhotoPopup(photosData[0].photoId, photosData[0].photoIndex);
                            }
                        }
                    });
            }
        }
        else {
            this.setState({ photosInfoNotValid: true });
        }
    }

    getValidationMessage(propertyType, property, submitted) {
        if (!submitted) {
            return '';
        }

        switch (propertyType) {
            case 'name':
                return Validation.getPhotoNameValidationMessage(property);
            case 'description':
                return Validation.getPhotoDescriptionValidationMessage(property);
        }
    }

    render() {
        return (
            <div>
                <AdditionalPhotosInfoComponent
                    photos={this.state.photos}
                    photosInfoNotValid={this.state.photosInfoNotValid}
                    loading={this.props.loading}
                    onChangeField={this.onChangeField}
                    albumsPlaceholder={config.albumsTagsInput.placeholder}
                    albumsMinQueryLength={config.albumsTagsInput.minQueryLength}
                    albumSuggestions={this.props.albumSuggestions}
                    onFocusAlbums={this.onFocusAlbums}
                    autofocus={false}
                    onInputAlbums={this.onInputAlbums}
                    onAddAlbum={this.onAddAlbum}
                    onRemoveAlbum={this.onRemoveAlbum}
                    onClickContinue={this.onClickContinue}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uploadedPhotos: state.photo.uploadedPhotos,
        userId: state.auth.userId,
        loading: state.photo.addOrEditPhotosLoading,
        action: state.photo.action,
        currentPhoto: state.photo.currentPhoto,
        location: state.photo.location,
        openDisplayPhotoPopup: state.photo.openDisplayPhotoPopup,
        albumSuggestions: state.album.albumSuggestions,
        currentAlbum: state.album.currentAlbum
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, photoActions, albumActions), dispatch)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdditionalPhotosInfoContainer));