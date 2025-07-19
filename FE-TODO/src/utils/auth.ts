import { client } from "../apollo/client";
import { ROUTES } from "../routes/paths";

export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // ms
        return Date.now() >= exp;
    } catch {
        return true;
    }
};


export const logout = () => {
    localStorage.removeItem('access_token');
    client.clearStore();
    window.location.href = ROUTES.ACCOUNT.LOGIN;
};