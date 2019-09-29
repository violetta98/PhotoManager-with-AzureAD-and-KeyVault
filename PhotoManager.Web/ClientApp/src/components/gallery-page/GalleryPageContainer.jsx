import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as photoActions from '../../actions/photo.actions';
import { GalleryPageComponent } from './GalleryPageComponent';
import { config } from '../../config';

export class GalleryPageContainer extends Component {

    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        this.props.actions.getPhotosByUserId(this.props.userId, config.gallery.pageSize, this.props.pageIndex);
    }

    onPageChange(pageIndex) {
        this.props.actions.updateGalleryPageIndex(pageIndex);
        this.props.actions.getPhotosByUserId(this.props.userId, config.gallery.pageSize, pageIndex);
    }

    render() {
        return (
            <GalleryPageComponent
                photos={this.props.photos}
                loading={this.props.loading}
                toggleDisplayPhotoPopup={this.props.actions.toggleDisplayPhotoPopup}
                toggleAddOrEditPhotosPopup={this.props.actions.toggleAddOrEditPhotosPopup}
                toggleDeletePhotoPopup={this.props.actions.toggleDeletePhotoPopup}
                pageIndex={this.props.pageIndex}
                pageSize={config.gallery.pageSize}
                totalPhotos={this.props.totalPhotos}
                pageRangeDisplayed={config.gallery.pageRangeDisplayed}
                onPageChange={this.onPageChange}
                location={this.props.location}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        photos: state.photo.displayedPhotos,
        pageIndex: state.photo.galleryPageIndex,
        loading: state.photo.getPhotosLoading || state.photo.deletePhotoLoading,
        totalPhotos: state.photo.totalDisplayedPhotos,
        location: state.routing.location.pathname
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(photoActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPageContainer);