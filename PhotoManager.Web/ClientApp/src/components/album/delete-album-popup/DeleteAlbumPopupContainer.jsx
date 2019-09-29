import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import * as albumActions from '../../../actions/album.actions';
import { DeleteAlbumPopupComponent } from './DeleteAlbumPopupComponent';
import { config } from '../../../config';

class DeleteAlbumPopupContainer extends Component {

    constructor(props) {
        super(props);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.toggleDeleteAlbumPopup = this.toggleDeleteAlbumPopup.bind(this);
    }

    toggleDeleteAlbumPopup() {
        if (this.props.location.startsWith('/album/')) {
            this.props.actions.toggleDeleteAlbumPopup(this.props.currentAlbum);
        }
        else {
            this.props.actions.toggleDeleteAlbumPopup();
        }
    }

    onClickConfirm() {
        this.props.actions.deleteAlbum(this.props.currentAlbum.albumId)
            .then(() => {
                if (this.props.location.startsWith('/album/')) {
                    this.props.history.push('/albums');
                }
                else {
                    const pageIndex = this.props.albums.length === 1 ? Math.max(1, this.props.pageIndex - 1) : this.props.pageIndex;
                    this.props.actions.updateAlbumsPageIndex(pageIndex);
                    this.props.actions.getAlbums(this.props.userId, config.albums.pageSize, pageIndex);
                }
            });
    }

    render() {
        return (
            <DeleteAlbumPopupComponent
                showDeleteAlbumPopup={this.props.showDeleteAlbumPopup}
                toggleDeleteAlbumPopup={this.toggleDeleteAlbumPopup}
                onClickConfirm={this.onClickConfirm}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showDeleteAlbumPopup: state.album.showDeleteAlbumPopup,
        currentAlbum: state.album.currentAlbum,
        userId: state.auth.userId,
        location: state.routing.location.pathname,
        pageIndex: state.album.albumsPageIndex,
        albums: state.album.albums
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(albumActions, dispatch)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteAlbumPopupContainer));