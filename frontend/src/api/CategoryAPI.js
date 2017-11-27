/** see this page for a little API overview. */
const api = 'http://localhost:3001';


// Dummy auth token; expand here for multi-user functionality
const token = 'dxmann73';

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};


/**
 * GET categories from server
 * @return an array of categories in the form of {name, path}
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
