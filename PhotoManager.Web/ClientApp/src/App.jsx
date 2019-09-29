import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import PrivateRouteContainer from './components/core/private-route/PrivateRouteContainer';
import SignInRouteContainer from './components/core/sign-in-route/SignInRouteContainer';
import LayoutContainer from './components/core/layout/LayoutContainer';
import SignInContainer from './components/auth/sign-in/SignInContainer';
import GalleryPageContainer from './components/gallery-page/GalleryPageContainer';
import AlbumsPageContainer from './components/albums-page/AlbumsPageContainer';
import AlbumPageContainer from './components/album-page/AlbumPageContainer';
import DisplayPhotoPopupContainer from './components/photo/display-photo-popup/DisplayPhotoPopupContainer';
import AddOrEditPhotosPopupContainer from './components/photo/add-or-edit-photos-popup/AddOrEditPhotosPopupContainer';
import AdditionalPhotosInfoContainer from './components/photo/additional-photos-info/AdditionalPhotosInfoContainer';
import DeletePhotoPopupContainer from './components/photo/delete-photo-popup/DeletePhotoPopupContainer';
import AddOrEditAlbumPopupContainer from './components/album/add-or-edit-album-popup/AddOrEditAlbumPopupContainer';
import DeleteAlbumPopupContainer from './components/album/delete-album-popup/DeleteAlbumPopupContainer';

export default () => (
    <div>
        <LayoutContainer>
            <Switch>
                <PrivateRouteContainer path='/gallery' component={GalleryPageContainer} />
                <PrivateRouteContainer path='/albums' component={AlbumsPageContainer} />
                <PrivateRouteContainer path='/additional-photos-info' component={AdditionalPhotosInfoContainer} />
                <PrivateRouteContainer path='/album/:albumId' component={AlbumPageContainer} />
                <SignInRouteContainer path='/sign-in' exact component={SignInContainer} />
                <Redirect to="/gallery" />
            </Switch>
        </LayoutContainer>
        <DisplayPhotoPopupContainer />
        <AddOrEditPhotosPopupContainer />
        <DeletePhotoPopupContainer />
        <AddOrEditAlbumPopupContainer />
        <DeleteAlbumPopupContainer />
    </div>
);
