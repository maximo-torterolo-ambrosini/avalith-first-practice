import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { JSON } from '../helpers/ContentType.js'
import { INTERNAL_SERVER_ERROR, OK } from '../helpers/http/HttpStatusCode.js'
import limitData from '../helpers/limitData.js'

class UserController {
    constructor(usersService) {
        this.usersService = usersService
    }
    getUsers() {
        return async (httpRequest) => {
            const { limit, sort } = httpRequest.query
            try {
                let users = await this.usersService.getAll()
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
    }
    getUser() {
        return async (httpRequest) => {
            const { id } = httpRequest.params
            try {
                const user = await this.usersService.getById(id)
                return new HttpResponse(OK, user, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
    getFirstsUsers() {
        return async (httpRequest) => {
            try {
                const users = await this.usersService.getFirsts()
                return new HttpResponse(OK, users, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, INTERNAL_SERVER_ERROR)
            }
        }
    }
}
export default UserController
export { UserController }
