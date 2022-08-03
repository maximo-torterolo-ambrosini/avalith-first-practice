const BASE_URL = 'https://fakestoreapi.com/users'

const users = {
    /*
     * @async
     * @returns {Promise[]}
     * @description This method is used to get all the users
     */
    getAll: async function () {
        const response = await fetch(BASE_URL)
        return await response.json()
    },
    /*
     * @async
     * @returns {Promise}
     * @description This method is used to get a single user
     * @param {number} id
     */
    getById: async function (id) {
        const response = await fetch(BASE_URL + '/' + id)
        return await response.json()
    }
}
export default users
export { users }
