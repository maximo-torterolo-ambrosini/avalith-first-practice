import { Router as r } from 'express'
import cartsController from '../controllers/carts.controller.js'
import CartsRepository from '../repositories/carts.repository.js'
import UsersRepository from '../repositories/users.repository.js'
import usersModel from '../models/users.js'
import { carts as cartsModel } from '../models/carts.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
import isNumberId from '../middlewares/isNumberId.js'

const router = r()

const usersRepository = new UsersRepository(usersModel)
const cartsRepository = new CartsRepository(cartsModel)

router
    .get('/', handler(cartsController.getCarts(cartsRepository)))
    .get('/bigcarts', handler(cartsController.getBiggerCarts(cartsRepository, usersRepository)))
    .get('/:id', isNumberId, handler(cartsController.getSingleCarts(cartsRepository)))

export default router
export { router }
