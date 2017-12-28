import * as BaseAPI from './BaseAPI';

/**
 * `GET /posts/:id/comments` | Get all the comments for a single post.
 * @return an array of comments in the form {id:num, timestamp:millis, title:string, body:string, author:string, category:string, voteScore:num, deleted:boolean, commentCount:num}
 */
export const getComments = (postId) => BaseAPI.doGet(`posts/${postId}/comments`);

/**
 * `GET /comments/:id` | Get the details for a single comment.
 * @return a comment in the form {
 *     id:string,
 *     parentId: string,
 *     timestamp:millis,
 *     body:string,
 *     author:string,
 *     voteScore:num,
 *     deleted:boolean,
 *     parentDeleted:boolean
 *     }
 */
export const getComment = (id) => BaseAPI.doGet(`comments/${id}`);

/**
 * POST /comments` | Add a comment to a post.
 *     **id** - Any unique ID.
 *     **timestamp** - Unix Timestamp
 *     **body** - [String]
 *     **author** - [String]
 *     **parentId** - Should match a post id in the database.
 */
export const createComment = (comment) => BaseAPI.doPost(`comments`, comment);

/**
 * `POST /comments/:id` | Used for voting on a comment.
 *     **option** - [String]: Either `"upVote"` or `"downVote"`.
 */
export const upVote = (id) => vote(id, 'upVote');
export const downVote = (id) => vote(id, 'downVote');
const vote = (id, voteType) => BaseAPI.doPost(`comments/${id}`, {option: voteType});

/**
 * `PUT /comments/:id` | Edit the details of an existing comment.
 *     **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br>
 *     **body** - [String]
 */
export const editComment = (id, comment) => BaseAPI.doPut(`comments/${id}`, comment);

/**
 * `DELETE /comments/:id` | Sets a comment's deleted flag to `true`.
 */
export const deleteComment = (id) => BaseAPI.doDelete(`comments/${id}`);
