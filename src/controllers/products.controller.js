import { JSON } from '../helpers/ContentType.js'
import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { INTERNAL_SERVER_ERROR, OK } from '../helpers/http/HttpStatusCode.js'
import limitData from '../helpers/limitData.js'

const getProducts = (productsRepository) => async (httpRequest) => {
    const { limit, sort } = httpRequest.query
    try {
        let products = await productsRepository.getAll()
        /*
         * by default if order is not specified, it will be ascending
         * products are already sorted by id, so we just need to reverse the array
         */
        if (sort === 'desc') products = products.reverse()
        products = limitData(products, limit)
        return new HttpResponse(OK, products, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const getProductById = (productsRepository) => async (httpRequest) => {
    const { id } = httpRequest.params
    try {
        const product = await productsRepository.getById(id)
        return new HttpResponse(OK, product, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const getProductsInCategories = (productsRepository) => async (httpRequest) => {
    try {
        const products = await productsRepository.getInCategories()
        return new HttpResponse(OK, products, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const getProductsByPrices = (productsRepository) => async (httpRequest) => {
    const { order } = httpRequest.query
    try {
        let products = await productsRepository.getAll()
        products = products
            .map((product) => {
                return { id: product.id, title: product.title, price: product.price }
            })
            .sort((a, b) => a.price - b.price)
        /*
         * by default if order is not specified, it will be ascending
         * products are already sorted by id, so we just need to reverse the array
         */
        if (order === 'desc') products = products.reverse()

        return new HttpResponse(OK, products, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const getMostExpensiveByCategory = (productsRepository) => async (httpRequest) => {
    try {
        const categories = await productsRepository.getInCategories()
        const mostExpensive = categories.map((category) => {
            const product = category.products.reduce((prev, curr) => {
                return prev.price > curr.price ? prev : curr
            })
            return {
                category: category.category,
                product
            }
        })
        return new HttpResponse(OK, mostExpensive, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const productsController = {
    getProducts,
    getProductById,
    getProductsInCategories,
    getProductsByPrices,
    getMostExpensiveByCategory
}
export default productsController
export {
    productsController,
    getProducts,
    getProductById,
    getProductsInCategories,
    getProductsByPrices,
    getMostExpensiveByCategory
}
