import jwt, { JwtPayload } from 'jsonwebtoken';
import { secretkey } from '..';
import { User } from '../model/user.model';

export const getUserIdFromToken = (req: any): string => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Authentication token is required');

    try {
        const decoded = jwt.verify(token, secretkey) as JwtPayload;
        return decoded.id;
    } catch (err) {
        throw new Error('Invalid token');
    }
};

export const getUserFromToken = async (req: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, secretkey) as JwtPayload;
        const user = await User.findById(decoded.id); // lấy toàn bộ user từ DB
        return user;
    } catch (err) {
        return null;
    }
};