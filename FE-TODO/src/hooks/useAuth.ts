import { useMutation, useQuery } from "@apollo/client";
import { CHANGE_INFO_MUTATION, CHANGE_PASSWORD_MUTATION, REGISTER_EMPLOYEE_MUTATION } from "../graphql/mutations/authMutations";
import { GET_CURRENT_USER } from "../graphql/queries/userQueries";

export const useGetCurrentUser = () => {
    const { data } = useQuery(GET_CURRENT_USER);
    return {
        user: data?.getCurrentUser || null,

    };
}


export const useChangePassword = () => {
    const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION);

    const handleChangePassword = async (currentPassword: string, newPassword: string) => {
        try {
            const { data } = await changePassword({
                variables: { currentPassword, newPassword },
            });
            console.log('Đổi mật khẩu thành công:', data);
            return data;
        } catch (err) {
            console.error('Lỗi đổi mật khẩu:', err);
            throw err;
        }
    };

    return { handleChangePassword, loading, error };
}
export const useChangeInfo = () => {
    const [changeInfo, { loading, error }] = useMutation(CHANGE_INFO_MUTATION);

    const handleChangeInfo = async (firstName: string, lastName: string) => {
        try {
            const { data } = await changeInfo({
                variables: { firstName, lastName },
            });
            console.log('Cập nhật thông tin thành công:', data);
            return data;
        } catch (err) {
            console.error('Lỗi cập nhật thông tin:', err);
            throw err;
        }
    };

    return { handleChangeInfo, loading, error };
}

export const useRegisterEmployee = () => {
    const [registerEmployee, { loading, error }] = useMutation(REGISTER_EMPLOYEE_MUTATION);

    const handleRegisterEmployee = async (
        email: string,
        password: string,
        firstName?: string,
        lastName?: string,
        role: string = "staff",
        avatar?: string
    ) => {
        try {
            const { data } = await registerEmployee({
                variables: { email, password, firstName, lastName, role, avatar },
            });
            console.log("Đăng ký nhân viên thành công:", data);
            return data;
        } catch (err) {
            console.error("Lỗi đăng ký nhân viên:", err);
            throw err;
        }
    };

    return { handleRegisterEmployee, loading, error };
};