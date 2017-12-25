import * as BaseAPI from './BaseAPI';

/**
 * GET categories from the server
 * @return an array of categories in the form {name, path}
 */
export const getCategories = () => BaseAPI.doGet(`categories`);
