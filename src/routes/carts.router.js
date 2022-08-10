import { Router as r } from 'express'
import CartsController from '../controllers/carts.controller.js'
import CartsRepository from '../repositories/carts.repository.js'
import UsersRepository from '../repositories/users.repository.js'
import usersModel from '../models/users.js'
import CartsService from '../service/carts.service.js'
import { carts as cartsModel } from '../models/carts.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
import isNumberId from '../middlewares/isNumberId.js'

const router = r()

// Model Injection
const usersRepository = new UsersRepository(usersModel)
const cartsRepository = new CartsRepository(cartsModel)

// Repository Injection
const cartsService = new CartsService(cartsRepository, usersRepository)

// Service Injection
const cartsController = new CartsController(cartsService)

router
    .get('/', handler(cartsController.getCarts()))
    .get('/bigcarts', handler(cartsController.getBiggerCarts()))
    .get('/:id', handler(isNumberId), handler(cartsController.getSingleCarts()))

export default router
export { router }
