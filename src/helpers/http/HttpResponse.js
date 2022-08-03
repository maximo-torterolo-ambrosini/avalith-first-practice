import ContentType from '../ContentType.js'
import HttpStatusCode from './HttpStatusCode.js'
import HttpError from './HttpError.js'

// schema to validate httpResponse object properties
const schema = {
    statusCode: (value) => Object.values(HttpStatusCode).indexOf(parseInt(value)) !== -1,
    contentType: (value) => Object.values(ContentType).indexOf(value) !== -1,
    callNext: (value) => typeof value === 'boolean'
}
/**
 * @param {HttpResponse} httpResponse
 * @throws { HttpError} - HttpResponse object is not valid
 * @returns {undefined} - if httpResponse object is valid
 */
const validateHttpResponse = (httpResponse) => {
    const errors = []
    /*
    for in loop to iterate over all properties keys of httpResponse object
    and validate each property value against schema
    */
    for (const key in schema) {
        if (!schema[key](httpResponse[key])) {
            errors.push(`${key} is invalid "${httpResponse[key]}"`)
        }
    }
    if (errors.length > 0)
        throw new HttpError(errors.join(', '), HttpStatusCode.INTERNAL_SERVER_ERROR)
}
/**
 * @class HttpResponse
 * @description HttpResponse class to abstract response object Utilizing adapter pattern
 */
export default class HttpResponse {
    /**
     *
     * @param {number} statusCode - status code of response
     * @param {string} body - body of response
     * @param {string} contentType - content type of response
     * @param {object} headers - headers of response
     * @param {boolean} callNext - flag to call next middleware
     */
    constructor(statusCode, body, contentType, headers, callNext = false) {
        this.statusCode = statusCode
        this.body = body
        this.contentType = contentType
        this.headers = headers
        this.callNext = callNext

        // if something do not match schema, throw exception
        validateHttpResponse(this)
    }
}
export { HttpResponse }
