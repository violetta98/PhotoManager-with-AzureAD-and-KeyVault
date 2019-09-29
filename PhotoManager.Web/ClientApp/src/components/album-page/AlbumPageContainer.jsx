import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as photoActions from '../../actions/photo.actions';
import * as albumActions from '../../actions/album.actions';
import { AlbumPageComponent } from './AlbumPageComponent';
import { config } from '../../config';
import { Validation } from '../../helpers/validation';

export class AlbumPageContainer extends Component {

    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        this.props.actions.getAlbum(this.props.match.params.albumId, config.albumPhotos.pageSize, this.props.pageIndex);
    }

    onPageChange(pageIndex) {
        this.props.actions.updateAlbumPageIndex(pageIndex);
        this.props.actions.getPhotosByAlbumId(this.props.match.params.albumId, config.albumPhotos.pageSize, pageIndex);
    }

    render() {
        return (
            <AlbumPageComponent
                currentAlbum={this.props.currentAlbum}
                photos={this.props.photos}
                albumLoading={this.props.albumLoading}
                photosLoading={this.props.photosLoading}
                toggleAddOrEditAlbumPopup={() => this.props.actions.toggleAddOrEditAlbumPopup('edit', this.props.currentAlbum)}
                toggleDeleteAlbumPopup={() => this.props.actions.toggleDeleteAlbumPopup(this.props.currentAlbum)}
                toggleDisplayPhotoPopup={this.props.actions.toggleDisplayPhotoPopup}
                toggleAddOrEditPhotosPopup={this.props.actions.toggleAddOrEditPhotosPopup}
                toggleDeletePhotoPopup={this.props.actions.toggleDeletePhotoPopup}
                pageIndex={this.props.pageIndex}
                pageSize={config.albumPhotos.pageSize}
                totalPhotos={this.props.totalPhotos}
                pageRangeDisplayed={config.albumPhotos.pageRangeDisplayed}
                onPageChange={this.onPageChange}
                location={this.props.location}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentAlbum: state.album.currentAlbum,
        albumLoading: state.album.getAlbumLoading,
        photosLoading: state.photo.getPhotosLoading || state.photo.deletePhotoLoading,
        photos: state.photo.displayedPhotos,
        pageIndex: state.photo.albumPageIndex,
        totalPhotos: state.photo.totalDisplayedPhotos,
        location: state.routing.location.pathname
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, photoActions, albumActions), dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPageContainer);