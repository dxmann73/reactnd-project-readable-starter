/**
 * This is s thin wrapper around the fetch API, mainly to
 * - streamline the code (i.e. not having fetch, api root and auth concerns all over the place
 * - to provide some centralized error handling
 *
 * About using fetch see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 */

/**
 * apiRoot is where our API server lives. At the root, it has some kind of WSDL, which is nice. :-)
 * Refer to the README.md in the api-server folder for a complete overview.
 */
const apiRoot = 'http://localhost:3001';

/** Dummy auth token; expand here for multi-user functionality */
const token = 'dxmann73';
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

/**
 * Execute a GET request against the API server
 * @return the JSON representation of the response body
 */
export const doGet = (path) =>
    fetch(`${apiRoot}/${path}`, {headers})
        .then(extractJson)
        .catch(handleAndRethrowError);

/**
 * Execute a POST request against the API server, using the given object as request body
 * @return the JSON representation of the response body
 */
export const doPost = (path, requestPayload) =>
    fetch(`${apiRoot}/${path}`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload),
        })
        .then(extractJson)
        .catch(handleAndRethrowError);

/**
 * Execute a PUT request against the API server, using the given object as request body
 * @return the JSON representation of the response body
 */
export const doPut = (path, requestPayload) =>
    fetch(`${apiRoot}/${path}`,
        {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload),
        })
        .then(extractJson)
        .catch(handleAndRethrowError);

/**
 * Execute a DELETE request against the API server
 * @return the JSON representation of the response body
 */
export const doDelete = (path) =>
    fetch(`${apiRoot}/${path}`,
        {
            method: 'DELETE',
            headers,
        })
        .then(throwIfStatusNotOk)
        .catch(handleAndRethrowError);

/**
 * Internal methods
 */
const handleAndRethrowError = (error) => {
    const msg = error.message || error;
    throw new Error(msg);// maybe add URL later
};

const extractJson = (response) => {
    throwIfStatusNotOk(response);
    // return body, making sure we have JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    throw new TypeError('The server did not return a valid response');
};

const throwIfStatusNotOk = (response) => {
    if (!response.ok) {
        console.log('BaseAPI::doGet response not OK', response);
        throw new Error(`${response.status} ${response.statusText}: ${response.url}`);
    }
};
