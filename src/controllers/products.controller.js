import { JSON } from '../helpers/ContentType.js'
import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { INTERNAL_SERVER_ERROR, OK } from '../helpers/http/HttpStatusCode.js'
import limitData from '../helpers/limitData.js'

class ProductsController {
    constructor(productsService) {
        this.productsService = productsService
    }

    getProducts() {
        return async (httpRequest) => {
            const { limit, sort } = httpRequest.query
            try {
                let products = await this.productsService.getAll()
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
    }
    getProductById() {
        return async (httpRequest) => {
            const { id } = httpRequest.params
            try {
                const product = await this.productsService.getById(id)
                return new HttpResponse(OK, product, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }

    getProductsInCategories() {
        return async (httpRequest) => {
            try {
                const products = await this.productsService.getInCategories()
                return new HttpResponse(OK, products, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
    getProductsByPrices() {
        return async (httpRequest) => {
            const { order } = httpRequest.query
            try {
                let products = await this.productsService.getProductsByPrices()
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
    }
    getMostExpensiveByCategory() {
        return async (httpRequest) => {
            try {
                const products = await this.productsService.getMostExpensiveByCategory()
                return new HttpResponse(OK, products, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
}
export default ProductsController
export { ProductsController }
