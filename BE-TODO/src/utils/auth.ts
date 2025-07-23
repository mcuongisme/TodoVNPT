import jwt, { JwtPayload } from 'jsonwebtoken';
import { secretkey } from '..';

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
