const BASE_URL = 'https://fakestoreapi.com/carts'

/**
 *
 * @object carts
 * @description This model is used to get carts
 */
const carts = {
    /**
     * @async
     * @returns {Promise[]}
     * @description This method is used to get all the carts
     */
    getAll: async function () {
        const response = await fetch(BASE_URL)
        return await response.json()
    },
    /**
     * @async
     * @returns {Promise}
     * @description This method is used to get a single cart
     * @param {number} id
     */
    getById: async function (id) {
        const response = await fetch(BASE_URL + '/' + id)
        return await response.json()
    }
}
export default carts
export { carts }
