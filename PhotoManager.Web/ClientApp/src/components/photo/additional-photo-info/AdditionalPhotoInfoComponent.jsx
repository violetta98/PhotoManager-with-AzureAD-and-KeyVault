import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';

import { Input } from '../../controls/Input';
import { Textarea } from '../../controls/Textarea';
import { Image } from '../../controls/image-resizer/Image';

export class AdditionalPhotoInfoComponent extends Component {

    render() {
        return (
            <div>
                <div className="add-info-main-wrap">
                    <div className="add-info-photo-bar">
                        <Image
                            src={this.props.photo.url}
                            height={350}
                            width={490}
                            style={{ 'position': 'relative' }}
                        />
                    </div>
                    <div className="add-info-details-bar">
                        <Input
                            id={this.props.photo.id}
                            name={'name'}
                            value={this.props.photo.name}
                            validationMessage={this.props.photo.validationMessages.name}
                            onChange={this.props.onChangeField}
                            placeholder={'Photo name'}
                        />
                        <Textarea
                            id={this.props.photo.id}
                            name={'description'}
                            value={this.props.photo.description}
                            validationMessage={this.props.photo.validationMessages.description}
                            onChange={this.props.onChangeField}
                            placeholder={'Description'}
                            rows={3}
                            cols={33}
                        />
                        <br />
                        <ReactTags
                            tags={this.props.photo.albums}
                            placeholder={this.props.albumsPlaceholder}
                            minQueryLength={this.props.albumsMinQueryLength}
                            suggestions={this.props.albumSuggestions}
                            handleFocus={this.props.onFocusAlbums}
                            autofocus={this.props.autofocus}
                            handleInputChange={this.props.onInputAlbums}
                            handleAddition={this.props.onAddAlbum}
                            handleDelete={this.props.onRemoveAlbum}
                        />
                    </div>
                </div>
                <div className="add-info-footer"><hr /></div>
            </div >
        );
    }
}