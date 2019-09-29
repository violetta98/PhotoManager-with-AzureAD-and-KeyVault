import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as photoActions from '../../../actions/photo.actions';
import { DeletePhotoPopupComponent } from './DeletePhotoPopupComponent';
import { config } from '../../../config';

class DeletePhotoPopupContainer extends Component {

    constructor(props) {
        super(props);

        this.onClickGallery = this.onClickGallery.bind(this);
        this.onClickThisAlbum = this.onClickThisAlbum.bind(this);
        this.toggleDeletePhotoPopup = this.toggleDeletePhotoPopup.bind(this);
    }

    toggleDeletePhotoPopup() {
        let currentPhoto = this.props.showDisplayPhotoPopup ? this.props.currentPhoto : null;
        this.props.actions.toggleDeletePhotoPopup(currentPhoto);
    }

    onClickGallery() {
        this.props.actions.deletePhoto(this.props.currentPhoto.photoId, null)
            .then(() => {
                if (this.props.location.startsWith('/gallery')) {
                    const pageIndex = this.props.photos.length === 1 ? Math.max(1, this.props.galleryPageIndex - 1) : this.props.galleryPageIndex;
                    this.props.actions.updateGalleryPageIndex(pageIndex);
                    this.props.actions.getPhotosByUserId(this.props.userId, config.gallery.pageSize, pageIndex);
                }
                else {
                    const pageIndex = this.props.photos.length === 1 ? Math.max(1, this.props.albumPageIndex - 1) : this.props.albumPageIndex;
                    this.props.actions.updateAlbumPageIndex(pageIndex);
                    this.props.actions.getPhotosByAlbumId(this.props.currentAlbum.albumId, config.gallery.pageSize, pageIndex);
                }
            });
    }

    onClickThisAlbum() {
        this.props.actions.deletePhoto(this.props.currentPhoto.photoId, this.props.currentAlbum.albumId)
            .then(() => {
                const pageIndex = this.props.photos.length === 1 ? Math.max(1, this.props.albumPageIndex - 1) : this.props.albumPageIndex;
                this.props.actions.updateAlbumPageIndex(pageIndex);
                this.props.actions.getPhotosByAlbumId(this.props.currentAlbum.albumId, config.gallery.pageSize, pageIndex);
            });
    }

    render() {
        return (
            <DeletePhotoPopupComponent
                showDeletePhotoPopup={this.props.showDeletePhotoPopup}
                toggleDeletePhotoPopup={this.toggleDeletePhotoPopup}
                location={this.props.location}
                onClickGallery={this.onClickGallery}
                onClickThisAlbum={this.onClickThisAlbum}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showDeletePhotoPopup: state.photo.showDeletePhotoPopup,
        showDisplayPhotoPopup: state.photo.showDisplayPhotoPopup,
        currentPhoto: state.photo.currentPhoto,
        location: state.routing.location.pathname,
        userId: state.auth.userId,
        currentAlbum: state.album.currentAlbum,
        galleryPageIndex: state.photo.galleryPageIndex,
        albumPageIndex: state.photo.albumPageIndex,
        photos: state.photo.displayedPhotos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(photoActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePhotoPopupContainer);