import React, { Component } from 'react';

import { formatDate } from '../../../helpers/formatDate';
import { Image } from '../../controls/image-resizer/Image';

export class PhotoItemComponent extends Component {

    get textNearDate() {
        return this.props.location.startsWith('/gallery') ? 'Created' : 'Added';
    }

    render() {
        return (
            <div className="div-photo-component">
                <div
                    className="center-white"
                    onClick={this.props.toggleDisplayPhotoPopup}
                >{this.props.photo.name}</div>
                <Image
                    src={this.props.photo.path}
                    onClick={this.props.toggleDisplayPhotoPopup}
                    height={220}
                    width={300}
                    style={{ 'position': 'relative' }}
                />
                <div className="center-white">{this.textNearDate} on {formatDate(new Date(this.props.photo.createDate))} &nbsp;|&nbsp;
                    <span
                        className="pointer-blue"
                        onClick={this.props.toggleAddOrEditPhotosPopup}
                    ><i className="fa fa-edit"></i></span> |&nbsp;
                    <span
                        className="pointer-blue"
                        onClick={this.props.toggleDeletePhotoPopup}
                    ><i className="fa fa-trash"></i></span>
                </div>
            </div>
        )
    }
}