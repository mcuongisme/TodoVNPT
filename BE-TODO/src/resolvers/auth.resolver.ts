import { User } from "../model/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secretkey, refreshSecretKey } from "..";
import { Response } from 'express';


const generateTokens = (user: any) => {
    const access_token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '15s' });
    const refresh_token = jwt.sign({ id: user._id }, refreshSecretKey, { expiresIn: '7d' });
    return { access_token, refresh_token };
};
export const resolversAuth = {
    Query: {
        getCurrentUser: async (_: any, __: any, context: any) => {
            const token = context.req.headers.authorization?.split(' ')[1];
            if (!token) throw new Error("Authentication token is required");

            try {
                const decoded = jwt.verify(token, secretkey) as JwtPayload;
                return await User.findById(decoded.id);
            } catch (error) {
                throw new Error("Invalid token");
            }
        }
    },
    Mutation: {
        register: async (_: any, { email, password, name }: any, { res }: { res: Response }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword, name });
            await user.save();

            const { access_token, refresh_token } = generateTokens(user);

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return { user, access_token, refresh_token };
        },

        login: async (_: any, { email, password }: any, { res }: { res: Response }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid credentials');

            const { access_token, refresh_token } = generateTokens(user);

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return { user, access_token, refresh_token };
        },

        refreshToken: async (_: any, __: any, context: any) => {
            const token = context.req.cookies?.refresh_token;
            if (!token) throw new Error('No refresh token');
            try {
                const decoded = jwt.verify(token, refreshSecretKey) as { id: string };
                const user = await User.findById(decoded.id);
                if (!user) throw new Error('User not found');

                const access_token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '15m' });
                return { access_token };
            } catch (err) {
                throw new Error('Invalid refresh token');
            }
        },

        logout: async (_: any, __: any, { res }: { res: Response }) => {
            res.clearCookie('refresh_token', { path: '/refresh_token' });
            return true;
        }


    }
}
