import { AppDataSource } from "./data-source"
import adminVerify from "./middleware/adminVerify"
import tokenVerify from "./middleware/tokenVerify"
const express = require('express')
const app = express()
const port = 5001
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
app.use(express.json())
app.use(cors())

AppDataSource.initialize().then(async () => { // Инициализация подключения к БД
    console.log('database connected')
}).catch(error => console.log(error))

app.use('/', userRouter) // Роутер 1
app.use('/admin', tokenVerify, adminVerify, adminRouter) // Роутер 2

app.listen(port, () => {
    console.log(`CryptKirpichev listening on port ${port}`)
  })

