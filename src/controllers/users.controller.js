import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { JSON } from '../helpers/ContentType.js'
import { INTERNAL_SERVER_ERROR, OK } from '../helpers/http/HttpStatusCode.js'
import limitData from '../helpers/limitData.js'

const getUsers = (usersRepository) => async (httpRequest) => {
    const { limit, sort } = httpRequest.query
    try {
        let users = await usersRepository.getAll()
        /*
         * by default if order is not specified, it will be ascending
         * users are already sorted by id, so we just need to reverse the array
         */
        if (sort === 'desc') users = users.reverse()
        users = limitData(users, limit)
        return new HttpResponse(OK, users, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}
const getUser = (usersRepository) => async (httpRequest) => {
    const { id } = httpRequest.params
    try {
        const user = await usersRepository.getById(id)
        return new HttpResponse(OK, user, JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}
const getFirstsUsers = (usersRepository) => async (httpRequest) => {
    try {
        const users = await usersRepository.getAll()
        return new HttpResponse(OK, users.slice(0, 3), JSON, {})
    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
    }
}

const userController = {
    getUsers,
    getUser,
    getFirstsUsers
}
export default userController
