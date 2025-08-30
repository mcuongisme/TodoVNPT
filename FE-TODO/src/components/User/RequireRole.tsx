import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/paths";

interface RequireRoleProps {
    allowedRoles: string[];
    user: { role: string } | null;
}

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, user }) => {
    if (!user) {
        return <Navigate to={ROUTES.ACCOUNT.LOGIN} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <>
            <h1>Lỗi 403</h1>
        </>
    }

    return <Outlet />; // render tiếp route con
};

export default RequireRole;
