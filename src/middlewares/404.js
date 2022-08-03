import { JSON } from '../helpers/ContentType.js'
import HttpError from '../helpers/http/HttpError.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
import { NOT_FOUND } from '../helpers/http/HttpStatusCode.js'

const invalidRoute = () => {
    const { message, statusCode } = new HttpError('Invalid route', NOT_FOUND)
    return new HttpResponse(NOT_FOUND, { message, statusCode, ok: false }, JSON, {})
}

export default invalidRoute
export { invalidRoute }
