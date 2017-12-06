/** see http://localhost:3001 or the README.md in the api-server folder for a complete overview.
 * `POST /posts` | Add a new post.
 *     **id** UUID should be fine, but any unique id will work <br>
 *     **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br>
 *     **title** - [String] <br>
 *     **body** - [String] <br>
 *     **author** - [String] <br>
 *     **category** -  Any valid category
 * `GET /posts/:id` | Get the details of a single post
 * `PUT /posts/:id` | Edit the details of an existing post. |
 *     **title** - [String] <br>
 *     **body** - [String]
 * `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'.
 */
const api = 'http://localhost:3001';

// Dummy auth token; expand here for multi-user functionality
const token = 'dxmann73';

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

/**
 * `GET /posts` | Get all of the posts. Useful for the main page when no category is selected.
 * @return an array of posts in the form {id:num, timestamp:millis, title:string, body:string, author:string, category:string, voteScore:num, deleted:boolean, commentCount:num}
 */
export const getPosts = (categoryPath) =>
    fetch(categoryPath ? `${api}/${categoryPath}/posts` : `${api}/posts`, {headers})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log('PostsAPI::getPosts: ', data);
            return data;
        });

/**
 * `POST /posts/:id` | Used for voting on a post. |
 *     **option** - [String]: Either `"upVote"` or `"downVote"`.
 */
export const upVote = (postId) => vote(postId, 'upVote');
export const downVote = (postId) => vote(postId, 'downVote');
const vote = (postId, voteType) =>
    fetch(`${api}/posts/${postId}`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({option: voteType}),
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log('PostsAPI::vote', data);
            return data;
        });
