const express = require('express')
const adminRouter = express.Router()
const userController = require('../controller/userController')

adminRouter.get('/', userController.secured)
adminRouter.post('/resetpass', userController.resetPass)

module.exports = adminRouter