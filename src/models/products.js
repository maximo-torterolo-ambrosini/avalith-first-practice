const BASE_URL = 'https://fakestoreapi.com/products'
/**
 * @object products
 * @description This model is used to get products
 *
 */
const products = {
    /**
     * @async
     * @returns {Promise[]}
     * @description This method is used to get all the products
     */
    getAll: async function () {
        const response = await fetch(BASE_URL)
        return await response.json()
    },
    /**
     * @async
     * @returns {Promise}
     * @description This method is used to get a single product
     * @param {number} id
     */
    getById: async function (id) {
        const response = await fetch(BASE_URL + '/' + id)
        return await response.json()
    },
    /**
     * @async
     * @returns {Promise[]}
     * @description This method is used to get all the categories
     */
    getCategories: async function () {
        const response = await fetch(BASE_URL + '/categories')
        return await response.json()
    },
    /**
     * @async
     * @returns {Promise[]}
     * @description This method is used to get all the products from an specific category
     * @param {string} category
     */
    getByCategory: async function (category) {
        const response = await fetch(BASE_URL + '/category/' + category)
        return await response.json()
    },
    /**
     * @async
     * @returns {Promise[]}
     * @description This method is used to get all the products separated by categories
     */

    getInCategories: async function () {
        const categories = await this.getCategories()
        const products = await Promise.all(
            categories.map(async (category) => {
                return { category, products: await this.getByCategory(category) }
            })
        )
        return products
    }
}

export default products
export { products }
