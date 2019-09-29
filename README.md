# Preliminary settings before launch

* Clone this repository.

* Register on Azure portal (https://portal.azure.com).

* Register PhotoManager API application in Azure Active Directory and tune AzureAD in appsettings.json:
   * **Instance** - The instance is used to specify if your app is signing users from the Azure public cloud or from national clouds. If you don't specify an instance, your app will target the Azure public cloud instance (the instance of URL https://login.onmicrosoftonline.com).

   * **TenantId** - The tenant ID is the directory ID. A tenant is a representation of an organization. It's a dedicated instance of Azure AD that an organization or app developer receives when the organization or app developer creates a relationship with Microsoft like signing up for Azure, Microsoft Intune, or Microsoft 365.
   
   * **ClientId** - The client ID is the unique application (client) ID assigned to your app by Azure AD when the app was registered.
   
   * **ClientSecret** - A secret string that the application uses to prove its identity when requesting a token. Also can be referred to as application password.

* Tune api url in PhotoManager.Web/ClientApp/src/config.js.

* Register PhotoManager Client application in Azure Active Directory and tune msal configuration in PhotoManager.Web/ClientApp/src/config.js:
   * **authority** - composed of the identity provider instance and sign-in audience for the app, and possibly the tenant ID. Common authority is https://login.microsoftonline.com/<tenantId>/, where <tenantId> is the tenant ID of the Azure Active Directory (Azure AD) tenant or a domain associated with this Azure AD tenant. Used only to sign in users of a specific organization.

   * **clientId** - The client ID is the unique application (client) ID assigned to your app by Azure AD when the app was registered.
   * **redirectUri** - The redirect URI is the URI the identity provider will send the security tokens back to. This URI should also be registered as the Redirect URI in your application registration.

   * **postLogoutRedirectUri** - You can configure the URI to which it should redirect after sign out by setting the postLogoutRedirectUri. 
   This URI should also be registered as the Logout URI in your application registration.

   * **scopes** - Scopes are the permissions that a web API exposes for client applications to request access to. Client applications request the user's consent for these scopes when making authentication requests to get tokens to access the web APIs.

* Create Key Vault in your Azure account and add Access Policy for already created PhotoManager API application. For secrets permissions    set 'get' and 'list'. Tune AzureKeyVault in appsettings.json:
   * **Dns** - dns name, URL of your key vault.

* Intall MongoDB. Here is video how to install MongoDB on:
   * **Windows** - https://www.youtube.com/watch?v=FwMwO8pXfq0
   * **Linux** - https://www.youtube.com/watch?v=IsQNErFOelc,
   * **Mac OS** - https://www.youtube.com/watch?v=DX15WbKidXY

* Add MongoConnectionString secret to created Key Vault. ConnectionString has the following form:
   **mongodb://[username:password@]hostname[:port][/[database][?options]]**
   (example: mongodb://user:pass@localhost/db1?authSource=userDb, in this case, the user with "user" login and password "pass" connects to the "db1" database on localhost. 
   In addition, the optional authSource parameter is also set with the value of "userDb".)
   If the port is not specified, the default port is 27017.)

* Register here: https://cloudinary.com/. 
  After registration go to https://cloudinary.com/console (Dashboard) -> account details.

* Add CloudinaryAccount secrets to Key Vault:
   * **CloudinaryAccount--Cloud** - Identifies cloud name.

   * **CloudinaryAccount--ApiKey** - Identifies API Key.

   * **CloudinaryAccount--ApiSecret** - Identifies API Secret.

* Tune Serilog Seq:
    * Install Seq from here: https://docs.datalust.co/docs.

    * Add secrets **Serilog--WriteTo--1--Args--serverUrl** and **Serilog--WriteTo--1--Args--apiKey** to Key Vault.

* Build solution and run.

&nbsp;
# Web Application Description

* After running web application you get to Sign In page where you need to click Sign In button and login using Azure Active Directory.

* After you are authenticated you get to Gallery page. 
   On Gallery Page you are able to:
   * Add new photos (max 5 at a time):
       After clicking Continue you get Additional Info Page where you can set name (required, no more than 25 symbols, not tags or scripts), description (no more than 500 symbols, not tags or scripts) and add selected photos to existing albums (using tags input)
       After clicking Continue these photos will be added to Gallery and Selected Albums.

   * Edit photo: 
       You should click on edit picture (pencil) under photo or click on photo image or photo name and then on popup click on the same edit picture.
       After that you can remove existing image and select new.
       After clicking continue you get Additional Info Page where can set name (required, no more than 25 symbols, not tags or scripts), description (no more than 500 symbols, not tags or scripts) and add selected photos to existing albums (using tags input).

   * Delete photo:
       You should click on trash picture under photo or click on photo image or photo name and then on popup click on the same trash picture.
       After clicking trash picture you need to confirm deleting and photo will be deleted from gallery.

   * View photo:
       Click on photo (image or name) and popup with photo info will appear. You can see photo description and albums where current photo was added.
       If you click on album - you will get album page.
       Also you can click on forward or back arrows to see next or previous photo in gallery. 
       If you click on forward arrow on last photo in gallery you will see info about first photo in gallery.
       If you click on back arrow on first photo in gallery you will see info about last photo in gallery.
   Also pagination was added to gallery page.

* If you click on header on Albums link you will get albums page.
   On Albums Page you are able to:
   * Add new album
       After clicking "Add new album" you can set album name (no more than 25 symbols, not tags or scripts) and description (no more than 500 symbols, not tags or scripts). After clicking continue it will be added.

   * Edit album: 
       You should click on edit picture (pencil) under album. After that in popup you can set name (no more than 25 symbols, not tags or scripts) and description (no more than 500 symbols, not tags or scripts. After clicking continue it will be edited.

   * Delete album:
       You should click on trash picture under album. After clicking this you need to confirm deleting and album will be deleted.

   * View album:
       If you click on cover picture or name of album you will get Album Page.

* On Album Page you are able to do the same things as on Gallery Page. But here are some additional features.
   * If you click on add new photos, select them then in tags input will be added current album (but you can delete this if you want).

   * After trying to delete photo you need to choose: from gallery (photo will deleted from gallery and from all albums) or this album (photo will be deleted only from current album). 

   * You also can edit or delete album in the same way as on Albums Page. After deleting album you will be redirected to Albums Page.

&nbsp;
# Contacts
* ##### skype: live:violettapidvolotska
* ##### email: violettapidvolotska@gmail.com

&nbsp;
#### All rights reserved.
