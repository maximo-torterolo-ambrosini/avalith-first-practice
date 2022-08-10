import { JSON } from '../helpers/ContentType.js'
import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { INTERNAL_SERVER_ERROR, OK } from '../helpers/http/HttpStatusCode.js'
import limitData from '../helpers/limitData.js'

class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService
    }
    getCarts() {
        return async (httpRequest) => {
            const { limit, sort } = httpRequest.query
            try {
                let carts = await this.cartsService.getAll()
                /*
                 * by default if order is not specified, it will be ascending
                 * carts are already sorted by id, so we just need to reverse the array
                 */
                if (sort === 'desc') carts = carts.reverse()
                carts = limitData(carts, limit)
                return new HttpResponse(OK, carts, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
    getBiggerCarts() {
        return async (httpRequest) => {
            try {
                const biggerCarts = await this.cartsService.getBiggerCarts()
                return new HttpResponse(OK, biggerCarts, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
    getSingleCarts() {
        return async (httpRequest) => {
            const { id } = httpRequest.params
            try {
                const cart = await this.cartsService.getById(id)
                return new HttpResponse(OK, cart, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
}

export default CartsController
export { CartsController }
