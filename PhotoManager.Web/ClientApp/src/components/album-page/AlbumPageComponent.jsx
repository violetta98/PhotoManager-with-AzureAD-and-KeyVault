import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

import { PhotoItemComponent } from '../photo/photo-item/PhotoItemComponent';
import { formatDate } from '../../helpers/formatDate';
import { Spinner } from '../controls/Spinner';

export class AlbumPageComponent extends Component {

    renderPhotos() {
        return this.props.photos.map(photo => {
            return (
                <PhotoItemComponent
                    key={photo.photoId}
                    photo={photo}
                    location={this.props.location}
                    toggleDisplayPhotoPopup={() => this.props.toggleDisplayPhotoPopup(photo.photoId, photo.photoIndex)}
                    toggleAddOrEditPhotosPopup={() => this.props.toggleAddOrEditPhotosPopup('edit', this.props.location, photo)}
                    toggleDeletePhotoPopup={() => this.props.toggleDeletePhotoPopup(photo)}
                />
            );
        });
    }

    render() {
        return (
            <div className="container body-content">
                <div className="jumbotron jumbotron-opacity">
                    <div className="custom-container">
                        {this.props.currentAlbum === null ? null : 
                            <div>
                                {this.props.albumLoading ?
                                    <Spinner
                                        height={500}
                                        width={500}
                                    /> :
                                    <div>
                                        <h4 className="title-background">📸 {this.props.currentAlbum.name} 👀</h4><hr />
                                        <div className="album-update-date" align="center">
                                            Created on {formatDate(new Date(this.props.currentAlbum.createDate))}&nbsp;|&nbsp;
                                            <span
                                                className="pointer-blue"
                                                onClick={this.props.toggleAddOrEditAlbumPopup}
                                            ><i className="fa fa-edit"></i></span> |&nbsp;
                                            <span
                                                className="pointer-blue"
                                                onClick={this.props.toggleDeleteAlbumPopup}
                                            ><i className="fa fa-trash"></i></span>
                                        </div><br />
                                        <div className="album-description">
                                            <div className="modal-text" align="center">Description</div>
                                            <div align="justify">
                                                {this.props.currentAlbum.description ? this.props.currentAlbum.description : 'There is not description yet.'}
                                            </div>
                                        </div><hr />
                                        <div className="container-add-form-btn">
                                            <div className="wrap-add-form-btn">
                                                <div className="add-form-bgbtn"></div>
                                                <button
                                                    onClick={() => this.props.toggleAddOrEditPhotosPopup('add', this.props.location)}
                                                    className="add-form-btn"
                                                    type="button"
                                                ><i className="fa fa-plus"></i>&nbsp;Add New Photos</button>
                                            </div>
                                        </div><br />
                                        {!this.props.photosLoading && this.props.totalPhotos === 0 ?
                                            <div className="no-records">There are not photos yet.</div>
                                            : null}
                                        <div className="custom-pagination">
                                            {this.props.totalPhotos > 0 ?
                                                <Pagination
                                                    activePage={this.props.pageIndex}
                                                    itemsCountPerPage={this.props.pageSize}
                                                    totalItemsCount={this.props.totalPhotos}
                                                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                                                    onChange={this.props.onPageChange}
                                                />
                                                : null}
                                        </div>
                                        {this.props.photosLoading ?
                                            <Spinner
                                                height={500}
                                                width={500}
                                            /> :
                                            <div className="gallery-grid">{this.renderPhotos()}</div>
                                        }
                                        <div className="custom-pagination">
                                            {this.props.totalPhotos > 0 ?
                                                <Pagination
                                                    activePage={this.props.pageIndex}
                                                    itemsCountPerPage={this.props.pageSize}
                                                    totalItemsCount={this.props.totalPhotos}
                                                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                                                    onChange={this.props.onPageChange}
                                                />
                                                : null}
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}