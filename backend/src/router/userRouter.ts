const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
import verifyPassword from "../middleware/verifyPassword"
import { hashPassword } from "../middleware/hashPassword"
import tokenVerify from "../middleware/tokenVerify"
import adminVerify from "../middleware/adminVerify"

// Роутеры для обычных пользователей

userRouter.post('/register', hashPassword, userController.register)
userRouter.post('/login', verifyPassword, userController.login)
userRouter.post('/changepass', tokenVerify, verifyPassword, hashPassword, userController.changePass)
userRouter.get('/secured', tokenVerify, userController.secured)

module.exports = userRouter