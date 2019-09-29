import React, { Component } from 'react';

import { AdditionalPhotoInfoComponent } from '../additional-photo-info/AdditionalPhotoInfoComponent';
import { Spinner } from '../../controls/Spinner';

export class AdditionalPhotosInfoComponent extends Component {

    renderAdditionalPhotoInfo() {
        return this.props.photos.map(photo => {
            return (
                <AdditionalPhotoInfoComponent
                    key={photo.id}
                    photo={photo}
                    onChangeField={this.props.onChangeField}
                    albumsPlaceholder={this.props.albumsPlaceholder}
                    albumsMinQueryLength={this.props.albumsMinQueryLength}
                    albumSuggestions={this.props.albumSuggestions}
                    onFocusAlbums={this.props.onFocusAlbums}
                    autofocus={this.props.autofocus}
                    onInputAlbums={this.props.onInputAlbums}
                    onAddAlbum={(album) => this.props.onAddAlbum(album, photo.id)}
                    onRemoveAlbum={(albumId) => this.props.onRemoveAlbum(albumId, photo.id)}
                />
            );
        });
    }

    render() {
        return (
            <div className="container body-content">
                <div className="jumbotron jumbotron-opacity">
                    {this.props.loading ?
                        <Spinner
                            height={500}
                            width={500}
                        /> : 
                        <div className="custom-container">
                            <div id="add-info-header">
                                <h1 className="title-background">Additional info</h1>
                            </div><hr />
                            {this.renderAdditionalPhotoInfo()}
                        </div>
                    }
                    {this.props.photosInfoNotValid
                        ? <div align="center" className="red transparent">
                            Sorry, but some photo names and descriptions are not valid!<br />
                            Please check them one more time!</div>
                        : null
                    }
                    {this.props.loading ? null :
                        <div className="container-add-form-btn">
                            <div className="wrap-add-form-btn">
                                <div className="add-form-bgbtn"></div>
                                <button
                                    onClick={this.props.onClickContinue}
                                    className="add-form-btn"
                                    type="button"
                                >Continue</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}