import { Router as r } from 'express'
import UsersRepository from '../repositories/users.repository.js'
import usersModel from '../models/users.js'
import userController from '../controllers/users.controller.js'
import isNumberId from '../middlewares/isNumberId.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
const router = r()

const usersRepository = new UsersRepository(usersModel)

router
    .get('/', handler(userController.getUsers(usersRepository)))
    .get('/firsts', handler(userController.getFirstsUsers(usersRepository)))
    .get('/:id', isNumberId, handler(userController.getUser(usersRepository)))

export default router
export { router }
