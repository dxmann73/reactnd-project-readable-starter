/** see this page for a little API overview. */
const api = 'http://localhost:3001';


// Dummy auth token; expand here for multi-user functionality
const token = 'dxmann73';

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};


/**
 * GET posts for a given category from the server
 * @return an array of posts in the form {id:num, timestamp:millis, title:string, body:string, author:string, category:string, voteScore:num, deleted:boolean, commentCount:num}
 */
export const getPosts = (category) =>
    fetch(category ? `${api}/${category}/posts` : `${api}/posts`, {headers})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log('PostsAPI::getPosts: ', data);
            return data;
        });
