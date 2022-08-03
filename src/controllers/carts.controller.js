import { JSON } from '../helpers/ContentType.js'
import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { INTERNAL_SERVER_ERROR, OK } from '../helpers/http/HttpStatusCode.js'
import limitData from '../helpers/limitData.js'

const getCarts = (cartsRepository) => async (httpRequest) => {
    const { limit, sort } = httpRequest.query
    try {
        let carts = await cartsRepository.getAll()
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

const getSingleCarts = (cartsRepository) => async (httpRequest) => {
    const { id } = httpRequest.params
    try {
        const cart = await cartsRepository.getById(id)
        return new HttpResponse(OK, cart, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const getBiggerCarts = (cartsRepository, usersRepository) => async (httpRequest) => {
    const CART_SIZE = 3
    try {
        const carts = await cartsRepository.getAll()
        const biggerCarts = await Promise.all(
            carts
                .filter((cart) => cart.products.length >= CART_SIZE)
                .map(async ({ userId, ...rest }) => {
                    const { username } = await usersRepository.getById(userId)

                    return { username, ...rest }
                })
        )

        return new HttpResponse(OK, biggerCarts, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const cartsController = {
    getCarts,
    getSingleCarts,
    getBiggerCarts
}
export default cartsController
export { cartsController }
