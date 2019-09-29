export const config = {
    apiUrl: 'https://localhost:5001',
    albumsTagsInput: {
        minQueryLength: 0,
        placeholder: 'Add to albums'
    },
    photo: {
        maxFiles: 5,
        acceptedFileTypes: ['image/*'],
        maxFileSize: 5000000,
        imageValidateSizeMaxWidth: 10000,
        imageValidateSizeMaxHeight: 10000,
        name: {
            maxLength: 25
        },
        description: {
            maxLength: 500
        }
    },
    gallery: {
        pageSize: 12,
        pageRangeDisplayed: 5
    },
    albums: {
        pageSize: 9,
        pageRangeDisplayed: 5
    },
    album: {
        name: {
            maxLength: 25
        },
        description: {
            maxLength: 500
        },
        coverPath: 'https://res.cloudinary.com/daxuhqfm2/image/upload/v1554233275/default_album_cover.png'
    },
    albumPhotos: {
        pageSize: 12,
        pageRangeDisplayed: 5
    },
    proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    backgroundImageUrl: 'https://res.cloudinary.com/daxuhqfm2/image/upload/v1567377967/background-image.jpg',
    msal: {
        authority: 'https://login.microsoftonline.com/a5116faa-911a-41df-92a0-84e46c13d833',
        clientId: 'a96ae440-028d-4839-8120-5850b69d268c',
        redirectUri: 'https://localhost:5001/sign-in/',
        postLogoutRedirectUri: 'https://localhost:5001/sign-in/',
        scopes: ['api://1b6e9751-1f78-484a-8220-606bbcf76360/api-access'],
    }
};