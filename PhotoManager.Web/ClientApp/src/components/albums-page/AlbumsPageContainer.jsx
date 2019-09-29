import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as albumActions from '../../actions/album.actions';
import { AlbumsPageComponent } from './AlbumsPageComponent';
import { config } from '../../config';

export class AlbumsPageContainer extends Component {

    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
        this.goToAlbumPage = this.goToAlbumPage.bind(this);
    }

    componentDidMount() {
        this.props.actions.getAlbums(this.props.userId, config.albums.pageSize, this.props.pageIndex);
    }

    onPageChange(pageIndex) {
        this.props.actions.updateAlbumsPageIndex(pageIndex);
        this.props.actions.getAlbums(this.props.userId, config.albums.pageSize, pageIndex);
    }

    goToAlbumPage(albumId) {
        this.props.history.push(`/album/${albumId}`);
    }

    render() {
        return (
            <AlbumsPageComponent
                albums={this.props.albums}
                loading={this.props.loading}
                toggleAddOrEditAlbumPopup={this.props.actions.toggleAddOrEditAlbumPopup}
                toggleDeleteAlbumPopup={this.props.actions.toggleDeleteAlbumPopup}
                pageIndex={this.props.pageIndex}
                pageSize={config.albums.pageSize}
                totalAlbums={this.props.totalAlbums}
                pageRangeDisplayed={config.albums.pageRangeDisplayed}
                onPageChange={this.onPageChange}
                goToAlbumPage={this.goToAlbumPage}
                albumCoverPath={config.album.coverPath}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        albums: state.album.albums,
        pageIndex: state.album.albumsPageIndex,
        loading: state.album.getAlbumsLoading || state.album.deleteAlbumLoading,
        totalAlbums: state.album.totalAlbums
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(albumActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPageContainer);