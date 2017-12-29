# Readable APP

This is a simple reddit clone, based on the starter project for the final assessment project for Udacity's Redux course.

This repository includes 
* a simple backend API Server in the `api-server` subdir
* the frontend which contains the actual app (created using create-react-app) in the `frontend` subdir

## Known issues / quirks
* various UX/ Styling issues; App needs more polish overall
  * No bootstrap, not even reset scripts
  * This is totally intended, as this is a POC for React/Redux, not proper UX 
* Editing / deleting is inconsistent: Separate views for posts, inline for comments
  * This is due to the spec requiring a separate view to edit/delete posts
  * Also, I thought it made sense to have both variants, to make sure the shared components work in both scenarios
  * Thirdly, see the UX part above
* User feedback does linger on top of the page, even after changing views
  * From experience, this is very hard to get right in a generic way
  * Just left it as-is, see UX remarks. Might put a timeout to it later on

## Features
Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. 
Users will also be able to edit and delete posts and comments.

## Start developing / using the App

To get started:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and start the app
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
