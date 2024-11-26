import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const adminVerify = async (req: Request, res: Response, next: NextFunction) => { // Middleware для верификации Админ прав
    try {
        const { nickname } = req.body

        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where: { nickname }})

        if (user.isAdmin) {
            next()
        } else {
            res.status(400).send({result: false, message: 'Access denied'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export default adminVerify