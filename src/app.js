import Express from 'express'
import logger from './middlewares/logger.js'
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartsRouter from './routes/carts.router.js'
import invalidRoute from './middlewares/404.js'
import handler from './helpers/callbackHandler.js'
const app = Express()

const PORT = process.env.PORT || 3000

// format json responses with indentation
app.set('json spaces', 2)

// middlewares
app.use(handler(logger))

// routes
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/carts', cartsRouter)

// Invalid route handler
app.use(handler(invalidRoute))

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default server
export { server }
