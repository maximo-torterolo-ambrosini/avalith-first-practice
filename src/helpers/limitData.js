const limitData = (data, limit) => {
    const limitRegex = /^\d+$/g
    return limitRegex.test(limit) ? data.slice(0, limit) : data
}

export default limitData
export { limitData }
