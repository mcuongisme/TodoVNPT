import { User } from "../model/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secretkey } from "..";
import { Response } from 'express';


const generateTokens = (user: any) => {
    const access_token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '1d' });
    return { access_token };
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
        register: async (_: any, { email, password, firstName, lastName }: any, { res }: { res: Response }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword, firstName, lastName });
            await user.save();

            const { access_token } = generateTokens(user);


            return { user, access_token };
        },

        login: async (_: any, { email, password }: any, { res }: { res: Response }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Tài khoản hoặc mật khẩu không đúng');

            const { access_token } = generateTokens(user);

            return { user, access_token };
        },
        changePassword: async (_: any, { currentPassword, newPassword }: any, context: any) => {
            const token = context.req.headers.authorization?.split(' ')[1];
            if (!token) throw new Error("Authentication token is required");

            try {
                const decoded = jwt.verify(token, secretkey) as JwtPayload;
                const user = await User.findById(decoded.id);
                if (!user) throw new Error("User not found");

                const valid = await bcrypt.compare(currentPassword, user.password);
                if (!valid) throw new Error("Current password is incorrect");

                user.password = await bcrypt.hash(newPassword, 10);
                await user.save();

                const { access_token } = generateTokens(user);
                return { access_token };
            } catch (error) {
                throw new Error("Invalid token");
            }
        },
        changeInfo: async (_: any, { firstName, lastName }: any, context: any) => {
            const token = context.req.headers.authorization?.split(' ')[1];
            if (!token) throw new Error("Authentication token is required");

            try {
                const decoded = jwt.verify(token, secretkey) as JwtPayload;
                const user = await User.findById(decoded.id);
                if (!user) throw new Error("User not found");

                user.firstName = firstName;
                user.lastName = lastName;
                await user.save();
                return user;
            } catch (error) {
                throw new Error("Invalid token");
            }
        }

    }
}
