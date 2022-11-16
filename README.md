# Node Express API | Vue3 Basic Template
## Includes Element UI

## Summary

NVE Template is being produced in my spare time as a boilerplate template for
web-based apps. It uses Vue3 to produce single-page apps for the frontend and
Node.JS 16 + Express for the backend. The database choice currently targets 
MongoDB.

## Includes
- Built-in user management
- JWT support
- Reddis JWT caching

## Requirements
- API requires Reddis
- Node.js 16
- MongoDB

## Installation

- Install Reddis
- Install Node.JS
//todo

## API Info

### Endpoints

#### Create
**/createUser**
Creates a new user 

#### Delete
**/deleteUser** - requires authorization
Deletes a user

#### Read
**/login**
Autheticates a user, logs user into app

**/readUsers** - requires authorization
Returns all users

#### Update
**/updateUser** - requires authorization
Updates user record

## Notes

### Project Structure

This repostiory is divdied between two folders: App, API

The App folder contains an instance of Vue3.
The API folder contains an NodeJS v16 Express server with predefined API routes. 

### App Info

### Customizing App

Currently NVE-Template uses Element Plus
More information can be found here: [https://element-plus.org/en-US/]{https://element-plus.org/en-US/}

#### Making API calls

A single function in the Vue3 store handles making API calls. That function is called
performCrudOperation. 

Each .vue file should contain a method called performCrudOperation to handle dispatching the API call:

    performCrudOperation(payload) {
      if (this.$store.getters.getDebug) {
        console.log("payload: ", payload);
      }
      this.$store.dispatch("performCRUDOperation", payload);
    },


Other methods will call the method mentiond above like this:

      const payload = {
        action: "create",
        endpoint: "createUser",
        data: {
            test: "data"
        },
      };
      this.performCrudOperation(payload);

The backend API has four routes:
- Create : Creates new entries in the DB
- Delete : Deletes entries from the DB
- Read : Read/Pull data from the DB
- Update : Update existing data in the DB

The action key in payload (payload.action ) defines the API route ( create , delete , read , update).
The endpoint key in payload (payload.endpoint ) defines the API endpoint. Read through the API code
to discover and reference endpoints. 

When the API responds to API calls made in the App, the performCrudOperation passes that response to 
'syncStore'. The SyncStore method checks which endpoint referenced. Then the syncStore method calls
the appropriate setter and saves the response data to the Vue3 store. 
