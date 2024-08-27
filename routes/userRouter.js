import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser, getUserId} from '../controller/userController.js'
import { checkUser } from '../middleware/authenticate.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserId, getUser)

userRouter.post('/login', checkUser, loginUser)
userRouter.post('/register', insertUser)

userRouter.patch('/update/:id', updateUser)
userRouter.delete('/delete/:id', deleteUser)

export default userRouter