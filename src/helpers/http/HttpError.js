/**
 * @class HttpError
 * @description HttpError exception class
 */
export default class HttpError extends Error {
    /**
     *
     * @param {string} message
     * @param {number} statusCode
     */
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}
export { HttpError }
