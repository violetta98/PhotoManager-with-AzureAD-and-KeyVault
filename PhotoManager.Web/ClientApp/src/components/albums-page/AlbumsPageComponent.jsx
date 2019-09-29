import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

import { AlbumItemComponent } from '../album/album-item/AlbumItemComponent';
import { Spinner } from '../controls/Spinner';

export class AlbumsPageComponent extends Component {

    renderAlbums() {
        return this.props.albums.map(album => {
            return (
                <AlbumItemComponent
                    key={album.albumId}
                    album={album}
                    toggleAddOrEditAlbumPopup={() => this.props.toggleAddOrEditAlbumPopup('edit', album)}
                    toggleDeleteAlbumPopup={() => this.props.toggleDeleteAlbumPopup(album)}
                    goToAlbumPage={() => this.props.goToAlbumPage(album.albumId)}
                    albumCoverPath={this.props.albumCoverPath}
                />
            );
        });
    }

    render() {
        return (
            <div className="container body-content">
                <div className="jumbotron jumbotron-opacity">
                    <div className="custom-container">
                        <h1 className="title-background">🗂️ Albums 🤳</h1>
                        <div className="container-add-form-btn">
                            <div className="wrap-add-form-btn">
                                <div className="add-form-bgbtn"></div>
                                <button
                                    onClick={() => this.props.toggleAddOrEditAlbumPopup('add')}
                                    className="add-form-btn"
                                    type="button"
                                ><i className="fa fa-plus"></i>&nbsp;Add New Album</button>
                            </div>
                        </div><br />
                        {!this.props.loading && this.props.totalAlbums === 0 ?
                            <div className="no-records">There are not albums yet.</div>
                            : null}
                        <div className="custom-pagination">
                            {this.props.totalAlbums > 0 ?
                                <Pagination
                                    activePage={this.props.pageIndex}
                                    itemsCountPerPage={this.props.pageSize}
                                    totalItemsCount={this.props.totalAlbums}
                                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                                    onChange={this.props.onPageChange}
                                />
                                : null}
                        </div>
                        {this.props.loading ?
                            <Spinner
                                height={500}
                                width={500}
                            /> :
                            <div className="gallery-grid">{this.renderAlbums()}</div>
                        }
                        <div className="custom-pagination">
                            {this.props.totalAlbums > 0 ?
                                <Pagination
                                    activePage={this.props.pageIndex}
                                    itemsCountPerPage={this.props.pageSize}
                                    totalItemsCount={this.props.totalAlbums}
                                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                                    onChange={this.props.onPageChange}
                                />
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
