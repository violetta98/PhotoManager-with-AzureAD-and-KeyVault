import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { formatDate } from '../../../helpers/formatDate';
import { Image } from '../../controls/image-resizer/Image';

export class DisplayPhotoPopupComponent extends Component {

    renderAlbums() {
        return this.props.currentPhoto.albums.map(album => {
            return (
                <div key={album.item1}
                    onClick={() => this.props.onClickAlbum(album.item1)}
                    className="photo-album-link">
                    <div className="album-link"
                    >{album.item2}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <Modal
                dialogClassName="display-photo-popup-dialog"
                show={this.props.showDisplayPhotoPopup}
                onHide={this.props.toggleDisplayPhotoPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p className="modal-header-text">
                            {this.props.currentPhoto.name} &nbsp;&nbsp;&nbsp;&nbsp;
                            <span
                                className="pointer-blue"
                                onClick={this.props.toggleAddOrEditPhotosPopup}
                            ><i className="fa fa-edit"></i></span>&nbsp;
                            <span
                                className="pointer-blue"
                                onClick={this.props.toggleDeletePhotoPopup}
                            ><i className="fa fa-trash"></i></span>
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="display-photo-main-wrap">
                        <div
                            className="display-photo-left-bar"
                            onClick={this.props.getPrevPhoto}>
                            <button className='modal-prev'>&lsaquo;</button>&nbsp;
                                </div>
                        <div
                            className="display-photo-photo-bar"
                            onClick={this.props.getNextPhoto}>
                            <Image
                                src={this.props.currentPhoto.path}
                                height={510}
                                width={775}
                                style={{ 'position': 'relative' }}
                            />&nbsp;
                                </div>
                        <div
                            className="display-photo-right-bar"
                            onClick={this.props.getNextPhoto}>
                            <button className='modal-next'>&rsaquo;</button>
                        </div>
                    </div>
                    <div className="display-photo-footer">
                        <div className="upload-date">
                            Created on {formatDate(new Date(this.props.currentPhoto.createDate))}
                        </div><hr />
                        <div className="modal-text">Description</div>
                        <div align="justify">
                            {this.props.currentPhoto.description ? this.props.currentPhoto.description : 'There is not description yet.'}
                        </div><hr />
                        <div className="modal-text">Albums</div><hr />
                        <div align="center">
                            {this.props.currentPhoto.albums.length === 0
                            ? <div className="no-photo-albums">This photo is not added to any album.</div>
                            : <div className="photo-albums-grid" >{this.renderAlbums()}</div> }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
