/** see http://localhost:3001 or the README.md in the api-server folder for a complete overview. */
const api = 'http://localhost:3001';


// Dummy auth token; expand here for multi-user functionality
const token = 'dxmann73';

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};


/**
 * GET categories from the server
 * @return an array of categories in the form {name, path}
 */
export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log('CategoryAPI::getCategories: ', data);
            return data;
        });
