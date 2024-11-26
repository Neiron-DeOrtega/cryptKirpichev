import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export async function encryptPassword(password: string) { // Переиспользуемая функция запроса на хеширование пароля
    try {
        const response = await axios.post(
            'http://localhost/encrypt.php', 
            new URLSearchParams({ password })
        );
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data.encrypted;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw error;
    }
}

export async function hashPassword(req: Request, res: Response, next: NextFunction) { // Middleware для хеширования пароля по алгоритму STD_DES
    try {
        const password = req.body.newPassword ? req.body.newPassword : req.body.password;
        const encryptedPassword = await encryptPassword(password);

        if (req.body.newPassword) {
            req.body.newPassword = encryptedPassword;
        } else {
            req.body.password = encryptedPassword;
        }

        next();
    } catch (error) {
        res.status(500).json({ result: false, error: 'Error encrypting password' });
    }
}
