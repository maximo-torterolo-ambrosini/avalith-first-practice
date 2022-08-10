import { Router as r } from 'express'
import UsersRepository from '../repositories/users.repository.js'
import usersModel from '../models/users.js'
import UserController from '../controllers/users.controller.js'
import UsersService from '../service/users.service.js'
import isNumberId from '../middlewares/isNumberId.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
const router = r()

// Model Injection
const usersRepository = new UsersRepository(usersModel)

// Repository Injection
const usersService = new UsersService(usersRepository)

// Service Injection
const userController = new UserController(usersService)

router
    .get('/', handler(userController.getUsers()))
    .get('/firsts', handler(userController.getFirstsUsers()))
    .get('/:id', handler(isNumberId), handler(userController.getUser()))

export default router
export { router }
