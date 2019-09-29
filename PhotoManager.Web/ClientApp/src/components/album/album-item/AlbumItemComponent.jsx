import React, { Component } from 'react';

import { formatDate } from '../../../helpers/formatDate';
import { Image } from '../../controls/image-resizer/Image';

export class AlbumItemComponent extends Component {

    render() {
        return (
            <div className="div-album-component">
                <div
                    className="center-white"
                    onClick={this.props.goToAlbumPage}
                >{this.props.album.name}</div>
                <Image
                    src={this.props.albumCoverPath}
                    onClick={this.props.goToAlbumPage}
                    height={220}
                    width={300}
                    style={{ 'position': 'relative' }}
                />
                <div className="center-white">Created on {formatDate(new Date(this.props.album.createDate))} &nbsp;|&nbsp;
                    <span
                        className="pointer-blue"
                        onClick={this.props.toggleAddOrEditAlbumPopup}
                    ><i className="fa fa-edit"></i></span> |&nbsp;
                    <span
                        className="pointer-blue"
                        onClick={this.props.toggleDeleteAlbumPopup}
                    ><i className="fa fa-trash"></i></span>
                </div>
            </div>
        )
    }
}