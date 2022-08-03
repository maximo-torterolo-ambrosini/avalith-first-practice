import HttpRequest from './http/HttpRequest.js'

/**
 * @description creates a valid callback for express utilizing adapter pattern
 * @param {function} controller - callback function to handle request
 * @returns {function} - callback function to handle request
 */
const callbackHandler =
    (controller) =>
    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {undefined}
     * @throws {HttpError} - if controller throws HttpError
     */
    async (req, res, next) => {
        const httpRequest = Object.freeze(new HttpRequest(req))
        try {
            const httpResponse = await controller(httpRequest)
            if (httpResponse.callNext) next()
            else {
                res.set(httpResponse.headers)
                res.type(httpResponse.contentType)
                res.status(httpResponse.statusCode).send(httpResponse.body)
            }
        } catch (e) {
            const { statusCode, message: error } = e
            res.status(statusCode).send({ error, statusCode, ok: false })
        }
    }
export default callbackHandler
export { callbackHandler }
