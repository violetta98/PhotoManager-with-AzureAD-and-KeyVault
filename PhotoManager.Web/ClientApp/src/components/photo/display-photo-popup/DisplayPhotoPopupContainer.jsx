import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import * as photoActions from '../../../actions/photo.actions';
import * as albumActions from '../../../actions/album.actions';
import { config } from '../../../config';
import { DisplayPhotoPopupComponent } from './DisplayPhotoPopupComponent';

class DisplayPhotoPopupContainer extends Component {

    constructor(props) {
        super(props);

        this.getPrevPhoto = this.getPrevPhoto.bind(this);
        this.getNextPhoto = this.getNextPhoto.bind(this);
        this.toggleAddOrEditPhotosPopup = this.toggleAddOrEditPhotosPopup.bind(this);
        this.toggleDeletePhotoPopup = this.toggleDeletePhotoPopup.bind(this);
        this.onClickAlbum = this.onClickAlbum.bind(this);
    }

    getPrevPhoto() {
        const photoIndex = this.props.currentPhoto.photoIndex;
        const prevPhotoIndex = photoIndex === 0 ? this.props.totalPhotos - 1 : photoIndex - 1;
        let prevCurrentPhoto = this.props.photos.find(photo => photo.photoIndex === prevPhotoIndex);

        if (prevCurrentPhoto === undefined) {
            if (this.props.location.startsWith('/gallery')) {
                const lastPage = parseInt((this.props.totalPhotos - 1) / config.gallery.pageSize + 1);
                const prevPageIndex = prevPhotoIndex === this.props.totalPhotos - 1 ? lastPage : this.props.galleryPageIndex - 1;
                this.updateGalleryPageAndPhoto(prevPageIndex, prevPhotoIndex);
            } else {
                const lastPage = parseInt((this.props.totalPhotos - 1) / config.albumPhotos.pageSize + 1);
                const prevPageIndex = prevPhotoIndex === this.props.totalPhotos - 1 ? lastPage : this.props.albumPageIndex - 1;
                this.updateAlbumPageAndPhoto(prevPageIndex, prevPhotoIndex);
            }
        } else {
            this.props.actions.updateCurrentPhoto(prevCurrentPhoto);
        }
    }

    getNextPhoto() {
        const photoIndex = this.props.currentPhoto.photoIndex;
        const nextPhotoIndex = photoIndex + 1 === this.props.totalPhotos ? 0 : photoIndex + 1;
        let nextCurrentPhoto = this.props.photos.find(photo => photo.photoIndex === nextPhotoIndex);

        if (nextCurrentPhoto === undefined) {
            if (this.props.location.startsWith('/gallery')) {
                const nextPageIndex = nextPhotoIndex === 0 ? 1 : this.props.galleryPageIndex + 1;
                this.updateGalleryPageAndPhoto(nextPageIndex, nextPhotoIndex);
            } else {
                const nextPageIndex = nextPhotoIndex === 0 ? 1 : this.props.albumPageIndex + 1;
                this.updateAlbumPageAndPhoto(nextPageIndex, nextPhotoIndex);
            }
        } else {
            this.props.actions.updateCurrentPhoto(nextCurrentPhoto);
        }
    }

    updateGalleryPageAndPhoto(newPageIndex, newPhotoIndex) {
        this.props.actions.updateGalleryPageIndex(newPageIndex);
        this.props.actions.getPhotosByUserId(this.props.userId, config.gallery.pageSize, newPageIndex)
            .then(result => {
                if (result !== undefined && result !== null) {
                    const newCurrentPhoto = result.photos.find(photo => photo.photoIndex === newPhotoIndex);
                    this.props.actions.updateCurrentPhoto(newCurrentPhoto);
                }
            });
    }

    updateAlbumPageAndPhoto(newPageIndex, newPhotoIndex) {
        this.props.actions.updateAlbumPageIndex(newPageIndex);
        this.props.actions.getPhotosByAlbumId(this.props.currentAlbum.albumId, config.albumPhotos.pageSize, newPageIndex)
            .then(result => {
                if (result !== undefined && result !== null) {
                    const newCurrentPhoto = result.photos.find(photo => photo.photoIndex === newPhotoIndex);
                    this.props.actions.updateCurrentPhoto(newCurrentPhoto);
                }
            });
    }

    toggleAddOrEditPhotosPopup() {
        this.props.actions.toggleAddOrEditPhotosPopup('edit', this.props.location, this.props.currentPhoto)
    }

    toggleDeletePhotoPopup() {
        this.props.actions.toggleDeletePhotoPopup(this.props.currentPhoto);
    }

    onClickAlbum(albumId) {
        this.props.history.push(`/album/${albumId}`);

        if (this.props.currentAlbum === null || albumId !== this.props.currentAlbum.albumId) {
            this.props.actions.getAlbum(albumId, config.albumPhotos.pageSize, 1);
        }

        this.props.actions.toggleDisplayPhotoPopup();
    }

    render() {
        return (
            <div>
                {this.props.currentPhoto == null ? null :
                    <DisplayPhotoPopupComponent
                        showDisplayPhotoPopup={this.props.showDisplayPhotoPopup}
                        currentPhoto={this.props.currentPhoto}
                        toggleDisplayPhotoPopup={() => this.props.actions.toggleDisplayPhotoPopup(null, null)}
                        toggleAddOrEditPhotosPopup={this.toggleAddOrEditPhotosPopup}
                        toggleDeletePhotoPopup={this.toggleDeletePhotoPopup}
                        getPrevPhoto={this.getPrevPhoto}
                        getNextPhoto={this.getNextPhoto}
                        onClickAlbum={this.onClickAlbum}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showDisplayPhotoPopup: state.photo.showDisplayPhotoPopup,
        currentPhoto: state.photo.currentPhoto,
        photos: state.photo.displayedPhotos,
        totalPhotos: state.photo.totalDisplayedPhotos,
        location: state.routing.location.pathname,
        userId: state.auth.userId,
        currentAlbum: state.album.currentAlbum,
        galleryPageIndex: state.photo.galleryPageIndex,
        albumPageIndex: state.photo.albumPageIndex
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, photoActions, albumActions), dispatch)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPhotoPopupContainer));