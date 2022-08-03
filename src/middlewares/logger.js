const logger = (httpRequest) => {
    console.log(`[${new Date().toLocaleString()}] [${httpRequest.method}] at ${httpRequest.url}`)
    return { callNext: true }
}

export default logger
export { logger }
