import { Router as r } from 'express'
import productsController from '../controllers/products.controller.js'
import ProductsRepository from '../repositories/products.repository.js'
import { products as productsModel } from '../models/products.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
import isNumberId from '../middlewares/isNumberId.js'
const router = r()

const productsRepository = new ProductsRepository(productsModel)

router
    .get('/', handler(productsController.getProducts(productsRepository)))
    .get('/categories', handler(productsController.getProductsInCategories(productsRepository)))
    .get('/prices', handler(productsController.getProductsByPrices(productsRepository)))
    .get('/expensive', handler(productsController.getMostExpensiveByCategory(productsRepository)))
    .get('/:id', isNumberId, handler(productsController.getProductById(productsRepository)))

export default router
export { router }
