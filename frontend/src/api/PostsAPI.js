import * as BaseAPI from './BaseAPI';

/**
 * `GET /posts` | Get all of the posts. Useful for the main page when no category is selected.
 * @return an array of posts in the form {id:num, timestamp:millis, title:string, body:string, author:string, category:string, voteScore:num, deleted:boolean, commentCount:num}
 */
export const getPosts = (categoryPath) => BaseAPI.doGet(categoryPath ? `${categoryPath}/posts` : `posts`);

/**
 * `GET /posts/:id` | Get the details of a single post
 * @return a post in the form {id:num, timestamp:millis, title:string, body:string, author:string, category:string, voteScore:num, deleted:boolean, commentCount:num}
 */
export const getPost = (id) => BaseAPI.doGet(`posts/${id}`);

/**
 * `POST /posts/:id` | Used for voting on a post. |
 *     **option** - [String]: Either `"upVote"` or `"downVote"`.
 */
export const upVote = (postId) => vote(postId, 'upVote');
export const downVote = (postId) => vote(postId, 'downVote');
const vote = (postId, voteType) => BaseAPI.doPost(`posts/${postId}`, {option: voteType});

/**
 * `POST /posts` | Add a new post.
 *     **id** UUID should be fine, but any unique id will work <br>
 *     **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br>
 *     **title** - [String] <br>
 *     **body** - [String] <br>
 *     **author** - [String] <br>
 *     **category** -  Any valid category
 */
export const createPost = (post) => BaseAPI.doPost(`posts`, post);

/**
 * `PUT /posts/:id` | Edit the details of an existing post. |
 *     **title** - [String] <br>
 *     **body** - [String]
 */
export const editPost = (postId, post) => BaseAPI.doPut(`posts/${postId}`, post);

/**
 * `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'.
 */
export const deletePost = (postId) => BaseAPI.doDelete(`posts/${postId}`);
