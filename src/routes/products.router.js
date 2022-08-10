import { Router as r } from 'express'
import ProductsController from '../controllers/products.controller.js'
import ProductsRepository from '../repositories/products.repository.js'
import ProductsService from '../service/products.service.js'
import { products as productsModel } from '../models/products.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
import isNumberId from '../middlewares/isNumberId.js'
const router = r()

// Model Injection
const productsRepository = new ProductsRepository(productsModel)

// Repository Injection
const productsService = new ProductsService(productsRepository)

// Service Injection
const productsController = new ProductsController(productsService)

router
    .get('/', handler(productsController.getProducts()))
    .get('/categories', handler(productsController.getProductsInCategories()))
    .get('/prices', handler(productsController.getProductsByPrices()))
    .get('/expensive', handler(productsController.getMostExpensiveByCategory()))
    .get('/:id', handler(isNumberId), handler(productsController.getProductById()))

export default router
export { router }
