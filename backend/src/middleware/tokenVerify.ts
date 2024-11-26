import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

const tokenVerify = async (req: Request, res: Response, next: NextFunction) => { // Middleware Верификация JWT токена
    try {
        const token = req.headers.authorization
        
        if (token) {
            let result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) 
            
            if (result.nickname) {
                req.body.nickname = result.nickname
                next()
            } else {
                res.status(400).send({result: false, message: 'token is not valid'})
            }
            
        } else {
            res.status(400).send({result: false, message: 'token doesnt exist'})
        }
        
    } catch (error) {
        res.status(401).send({error: error})
    }
}

export default tokenVerify