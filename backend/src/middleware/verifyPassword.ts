import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import axios from 'axios'
const jwt = require('jsonwebtoken')

async function verifyPassword(req: Request, res: Response, next: NextFunction) { // Верификация пароля 
    try {
        const { nickname, password } = req.body;

        console.log(req.body)

        if (!nickname || !password) {
            return res.status(400).json({ result: false, error: 'Nickname and password are required' });
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { nickname } });

        if (!user) {
            return res.status(404).json({ result: false, error: 'User not found' });
        }

        const response = await axios.post(
            'http://localhost/encrypt.php',
            new URLSearchParams({ password, hash: user.password })
        );

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        if (response.data.valid) {
            req.body.password = response.data.password
            next();
        } else {
            return res.status(401).json({ result: false, error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error decrypting password:', error);
        res.status(500).json({ result: false, error: 'Failed to verify password' });
    }
}

export default verifyPassword;
