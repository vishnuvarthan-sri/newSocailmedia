# newSocailmedia
# Welcome to SocialPost

## Technologies Used
Backend Technology:
- Nodejs
- Expressjs
- Mongodb

Frontend Technology:
- ReactJs
- material-ui


> To run the server type **'node app.js'**
> To run the client type **'npm start'**


## Server
You can call the four endpoints provided, first two for signin and signup and other two for saving the photo to the database and another endpoint for retrieving the posted image.

#### Endpoints
``` /api/signin ```
This endpoint is used for the user to signin

``` /api/signup ```
This endpoint is used for the user to sigup if don't have an account

``` /api/page ```
This endpoint is used for posting the image and storing it in the Database.

```/api/image ```
This endpoint is used for retrieving the posted image.

>The response for this endpoint contains a arrayBuffer. One has to convert it into base64 string to render the image in the frontend.

### Files

| Files | Description |
| ----- | ----------- |
| app.js             | This file has required moduled imports, database import and routes import. |
| routes/Account.js  | Sets up mongo connection -Users                                            |
| routes/Page.js     | Sets up mongo connection -Post                                             |
| public             | Uploaded Images are stored here.                                           |
| config/.env        | Sets environment variable.                                                 |

```js 
//Model Structure
Schema(
  photo: {
  data: Buffer,
  contentType: String
  },
  text: String
)
```

## Client
Main layout uses material-ui.
Uses Redux method 

### Files


| Files | Description |
| ----- | ----------- |
| index.js                    | Rendering the main component using store and routes.              |
| config.js                   | This file contains the api_url for the actions                    |
|src/components/SignIn.jsx    | jsx code for signin component                                     |
|src/components/Signup.jsx    | jsx code for signup component                                     |
|src/components/page.jsx      | jsx code for the socialmedia page                                 |
|src/actions/user_action.js   | Api calls are called here                                         |
|src/actions/Type.js          | The types of api calls are enteres here                           |
|src/reducers/user_reducer.js | The reducer stores the instial state of the payload Got           |
|src/reducers/index.js        | All the reducers are combined and given a Key prop to be accessed |
## Screenshots
``` signup ```
http://prnt.sc/10wru13
-------------------------
``` signin ```
http://prnt.sc/10wrumt
-------------------------
``` Page  without image ```
http://prnt.sc/10wruux
``` Page  with image ```
http://prnt.sc/10wwuid
