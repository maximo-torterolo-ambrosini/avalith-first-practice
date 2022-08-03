import HttpError from '../helpers/http/HttpError.js'
import { BAD_REQUEST } from '../helpers/http/HttpStatusCode.js'
import HttpResponse from '../helpers/http/HttpResponse.js'
const isNumberId = (httpRequest) => {
    const hasCharacters = /[a-zA-Z]+/g
    const { id } = httpRequest.params
    if (!hasCharacters.test(id)) {
        return { callNext: true }
    } else {
        const { message: error, statusCode } = new HttpError(
            'Id must be a positive number',
            BAD_REQUEST
        )
        return new HttpResponse(statusCode, { error, statusCode, ok: false })
    }
}

export default isNumberId
export { isNumberId }
