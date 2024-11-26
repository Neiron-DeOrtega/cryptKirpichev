import {Request, Response} from 'express'
import { User } from '../entity/User'
import { AppDataSource } from '../data-source'
import { PasswordHistory } from '../entity/PasswordHistory'
import { encryptPassword } from '../middleware/hashPassword'
const jwt = require('jsonwebtoken')
const md5 = require('md5')

class UserController {
    async register(req: Request, res: Response) {
        try {
            const user = new User()

            const {nickname, password, email} = req.body

            user.nickname = nickname
            user.password = password
            user.email = email
            user.passwordChangedAt = new Date()

            await AppDataSource.manager.save(user)

            const accessToken = jwt.sign({nickname}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1h'}) 
            const refreshToken = jwt.sign({nickname}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '30d'}) 

            res.status(201).send({result: true, accessToken, refreshToken})
        } catch (error) {
            console.log(error)
            res.status(400).send({result: false, error})
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { nickname } = req.body
            const accessToken = jwt.sign({nickname: req.body.nickname}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '15m'})
            const refreshToken = jwt.sign({nickname: req.body.nickname}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '30d'})

            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({ where: { nickname }})

            if (user.isPasswordExpired()) {
                res.status(410).send({result: false, message: 'your account blocked'})
            }
            
            res.status(200).send({daysUntilExpired: user.daysUntilPasswordExpires(), result: true, accessToken, refreshToken})

        } catch (error) {
            console.log(error)
            res.status(400).send({result: false, error})
        }
    }

    async changePass(req: Request, res: Response) {
        try {
            const { nickname, password, newPassword } = req.body

            console.log(req.body)

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { nickname } })

            user.password = newPassword

            const userId = user.id

            await AppDataSource.manager.save(user)

            const passwordRepository = AppDataSource.getRepository(PasswordHistory);

            const newPasswordEntry = passwordRepository.create({
                user: { id: userId }, 
                password: password,
                passwordChangedAt: new Date(),
            });
            await passwordRepository.save(newPasswordEntry);
        
            const passwordList = await passwordRepository.find({
                where: { user: { id: userId } },
                order: { passwordChangedAt: "ASC" },
            });
        
            if (passwordList.length > 9) {
                const passwordsToDelete = passwordList.slice(0, passwordList.length - 9)
                await passwordRepository.remove(passwordsToDelete)
            }

            res.status(200).send({result: true})

        } catch (error) {
            console.log(error)
            res.status(400).send({result: false, error})
        }
    }

    async secured(req: Request, res: Response) {
        try {
            res.status(200).send({result: true, nickname: req.body.nickname})
        } catch (error) {
            console.log(error)
            res.status(400).send({result: false, error})
        }
    }

    async resetPass(req: Request, res: Response) {
        try {
            const timelyPassword = md5((new Date()) + req.body.user).slice(0, 12) + '0$$$'

            const hashedTimelyPassword = await encryptPassword(timelyPassword)

            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({where: {nickname: req.body.user}})
            user.password = hashedTimelyPassword

            await AppDataSource.manager.save(user)

            console.log(hashedTimelyPassword)
            res.status(200).send({password: timelyPassword})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()
